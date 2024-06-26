import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TableHOC from "../components/admin/TableHOC";
import { useMyOrdersQuery, useNewOrderMutation } from "../redux/api/orderapi";

const column = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Order = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { isLoading, isError, error, data } = useMyOrdersQuery(user.user._id);
  // console.log(user)

  console.log(data)
  // console.log(data?.data?.orders); 
  const [rows, setRows] = useState([]);
  if (isError) {
    const err = error;
    toast.error(err.data.message);
  }
  useEffect(() => {
    if (data) {
      setRows(
        data?.data?.orders?.map((i) => ({
          _id: i._id,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red"
                  : i.status === "Shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
          action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data]);
  const Table = TableHOC(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )();

  return (
    <div className="container">
      <h1>My Orders</h1>
      {Table}
    </div>
  );
};

export default Order;
