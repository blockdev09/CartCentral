import React, { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import {
  addtoCart,
  calculatePrice,
  discountApplied,
  removeCartItems,
} from "../redux/reducer/cartReducer";
import axios from "axios";
import { server } from "../redux/store";
const Cart = () => {
  const { cartitems, subtotal, tax, total, shippingCharges, discount } =
    useSelector((state) => state.cartReducer);

  // console.log("Cartitems:", cartitems);
  // console.log("subtoal:", subtotal);
  // console.log("total", total);
  // console.log("tax:", tax);
  // console.log("shippingCharges:", shippingCharges);
  // console.log("discount:", discount);
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState("");
  const [isvalidcouponcode, setIsValidCouponCode] = useState(false);

  const handleincrease = (CartItem) => {
    if (CartItem.quantity === CartItem.stock) {
      return;
    }
    dispatch(addtoCart({ ...CartItem, quantity: CartItem.quantity + 1 }));
  };

  const handledecrease = (CartItem) => {
    if (CartItem.quantity <= 1) {
      return;
    }
    dispatch(addtoCart({ ...CartItem, quantity: CartItem.quantity - 1 }));
  };

  const handleremove = (productId) => {
    dispatch(removeCartItems(productId));
  };

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartitems]);

  useEffect(() => {
    const { token, cancel } = axios.CancelToken.source();
    const timeoutId = setTimeout(() => {
      // const { token, cancel } = axios.CancelToken.source();
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken: token,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApplied(0));
          cancel();
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [couponCode]);
  return (
    <div className="cart">
      <main>
        {cartitems.length > 0 ? (
          cartitems.map((i) => (
            <CartItem
              handleincrease={handleincrease}
              handledecrease={handledecrease}
              handleremove={handleremove}
              cartitems={i}
            />
          ))
        ) : (
          <h1>No Items Added...</h1>
        )}
      </main>
      <aside>
        <p>Subtotal:Rs{subtotal}</p>
        <p>Shipping Charges: Rs{shippingCharges}</p>
        <p>Tax: Rs{tax}</p>
        <p>
          Discount: <em className="red">- Rs{discount}</em>
        </p>
        <p>
          <b>Total: Rs{total}</b>
        </p>
        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {couponCode &&
          (isvalidcouponcode ? (
            <span className="green">
              Rs{discount} of using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}
        {cartitems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
