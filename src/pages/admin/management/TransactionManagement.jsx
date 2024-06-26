import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import {
  useDeleteOrderMutation,
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../../redux/api/orderapi";
import { server } from "../../../redux/store";
import { toastResponse } from "../../../utils/feature";

const staticData = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
  status: "",
  subtotal: 0,
  tax: 0,
  discount: 0,
  shippingCharges: 0,
  total: 0,
  orderItems: [],
  user: {
    name: "",
    _id: "",
  },
  _id: "",
};
const orderItems = [];
const TransactionManagement = () => {
  const { user } = useSelector((state) => state.userReducer);
  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useOrderDetailsQuery(params.id);
  // console.log(data?.order?._id);
  console.log(data);
  const {
    shippingInfo: { address, city, state, country, pinCode },
    user: { name },
    status,
    orderItems,
    tax,
    subtotal,
    discount,
    total,
    shippingCharges,
  } = data?.order || staticData;
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const handleupdate = async (e) => {
    e.preventDefault();
    const res = await updateOrder({
      userId: user?.user?._id,
      orderId: data?.order?._id,
    });

    toastResponse(res, navigate, "/admin/transaction");
  };
  const handledelete = async () => {
    const res = await deleteOrder({
      userId: user?.user?._id,
      orderId: data?.order?._id,
    });
    console.log(res);
    toastResponse(res, navigate, "/admin/transaction");
  };
  if (isError) {
    return <Navigate to={"/404"} />;
  }
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="product-management">
        <section
          style={{
            padding: "2rem ",
          }}
        >
          <h2>Order Items</h2>
          {data?.order?.orderItems?.map((i) => (
            <ProductCard
              name={i.name}
              photo={`${server}/${i.photo}`}
              productID={i.productID}
              _id={i._id}
              quantity={i.quantity}
              price={i.price}
            />
          ))}
        </section>
        <article className="shipping-info-card ">
          <button className="product-delete-button" onClick={handledelete}>
            <FaTrash />
          </button>
          <h1>Order Info</h1>
          <h5>User Info</h5>
          <p>Name : {name}</p>
          <p>
            Address : {`${address}, ${city}, ${state}, ${country}, ${pinCode}`}
          </p>
          <h5>Amount Info</h5>
          <p>Subtotal : {subtotal}</p>
          <p>Discount : {discount}</p>
          <p>ShippingCharges : {shippingCharges}</p>
          <p>Tax : {tax}</p>
          <p>total : {total}</p>
          <h5>Status Info</h5>
          <p>
            Status:{" "}
            <span
              className={
                status === "Delivered"
                  ? "purple"
                  : status === "Shipped"
                  ? "green"
                  : "red"
              }
            >
              {status}
            </span>
          </p>
          <button onClick={handleupdate} className="shipping-button">
            Process Order
          </button>
        </article>
      </main>
    </div>
  );
};

const ProductCard = ({ name, photo, price, quantity, _id }) => {
  return (
    <div className="transaction-product-card">
      <img src={photo} alt={name} />
      <Link to={`/product/${_id}`}>{name}</Link>
      <span>
        Rs{price} X {quantity} = Rs{price * quantity}{" "}
      </span>
    </div>
  );
};

export default TransactionManagement;
