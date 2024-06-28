import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import headerlogo from "../assets/images/CartCentral_transparent.png";

// import He  aderlogo from "./Headerlogo";
const Header = ({ user }) => {
  const [isopen, setisopen] = useState(false);
  const logouthandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign-out Successfull!");
      setisopen(false);
    } catch (error) {
      toast.error("Sign-out fail!");
    }
  };
  return (
    <nav className="header">
      {/* <Link to={'/'}><Headerlogo /></Link> */}
      <Link onClick={() => setisopen(false)} to={"/"}>
        <img src={headerlogo} alt="image" className="headerlogoo" />  
      </Link>
      <Link onClick={() => setisopen(false)} to={"/Search"}>
        <FaSearch />
      </Link>
      <Link onClick={() => setisopen(false)} to={"/cart"}>
        <FaShoppingBag />
      </Link>
      {user?.user?._id ? (
        <>
          <Link onClick={() => setisopen((isopen) => !isopen)}>
            <FaUser />
          </Link>
          <dialog open={isopen}>
            <div>
              {user.role === "admin" || (
                <Link to="/admin/dashboard">Admin</Link>
              )}
              <Link to="/orders">Orders</Link>
              <button onClick={logouthandler}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to={"/login"}>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
