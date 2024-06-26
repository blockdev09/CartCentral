import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../firebase";
// import {toast} from 'react-toastify'
import toast from "react-hot-toast";
import { useLoginMutation } from "../redux/api/userapi";
const Login = () => {
  const [gender, setgender] = useState("");
  const [date, setDate] = useState("");

  const [login] = useLoginMutation();
  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const res = await login({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        gender,
        role: "user",
        dob: date,
        _id: user.uid,
      });
      if ("data" in res) {
        toast.success(res.data.message);
      } else {
        const error = res.error;
        const message = error.data.message;
        toast.error(message);
      }
    } catch (error) {
      toast.error("Sign-in failed!");
    }
  };
  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>

        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setgender(e.target.value)}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label>Date of birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <p>Already Signed in Once</p>
          <button onClick={loginHandler}>
            <FaGoogle />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
