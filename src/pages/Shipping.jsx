import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { server } from "../redux/store";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

const Shipping = () => {
  const { cartitems, total } = useSelector((state) => state.cartReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shippinginfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const changedHandler = (e) => {
    // setShippingInfo(e.target.value);
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // console.log(shippinginfo)
  const handlesubmit = async (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo(shippinginfo));
    try {
      const { data } = await axios.post(
        `${server}/api/v1/payment/create`,
        {
          amount: total,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      navigate("/pay", {
        state: data.clientSecret,
      });
      // console.log(data);
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong!");
    }
  };
  useEffect(() => {
    if (cartitems <= 0) {
      navigate("/cart");
    }
  }, [cartitems]);
  return (
    <div className="shipping">
      <button className="back-btn" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button>
      <form onSubmit={handlesubmit}>
        <h1>Shipping Address</h1>
        <input
          required
          type="text"
          placeholder="address"
          name="address"
          value={shippinginfo.address}
          onChange={changedHandler}
        />
        <input
          required
          type="text"
          placeholder="city"
          name="city"
          value={shippinginfo.city}
          onChange={changedHandler}
        />
        <input
          required
          type="any"
          placeholder="state"
          name="state"
          value={shippinginfo.state}
          onChange={changedHandler}
        />
        <select
          name="country"
          required
          value={shippinginfo.country}
          onChange={changedHandler}
        >
          <option value="">Choose Country</option>
          <option value="India">India</option>
        </select>
        <input
          required
          type="number"
          placeholder="PinCode"
          name="pinCode"
          value={shippinginfo.pinCode}
          onChange={changedHandler}
        />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Shipping;
