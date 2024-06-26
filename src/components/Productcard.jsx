import React from "react";
import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";

const Productcard = ({ productId, photo, name, price, stock, handler }) => {
  return (
    <div className="productcard">
      <img src={`${import.meta.env.VITE_SERVER}/${photo}`} alt="image" />
      <p>{name}</p>
      <span>Rs{price}</span>
      <div>
        <button
          onClick={() =>
            handler({ productId, photo, name, price, stock, quantity: 1 })
          }
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Productcard;
