import React from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
const CartItem = ({
  cartitems,
  handleincrease,
  handledecrease,
  handleremove,
}) => {
  return (
    <div className="cart-item">
      <img src={`${server}/${cartitems.photo}`} alt="image" />
      <article>
        <Link to={`/product/${cartitems.productId}`}>{cartitems.name}</Link>
        <span>{cartitems.price}</span>
      </article>
      <div>
        <button onClick={() => handledecrease(cartitems)}>-</button>
        <p>{cartitems.quantity}</p>
        <button onClick={() => handleincrease(cartitems)}>+</button>
      </div>
      <button onClick={() => handleremove(cartitems.productId)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
