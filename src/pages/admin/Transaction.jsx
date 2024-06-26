import React, { useState, useCallback, useEffect } from "react";
import TableHOC from "../../components/admin/TableHOC";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Link } from "react-router-dom";
import { useAllOrdersQuery } from "../../redux/api/orderapi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const columns = [
  {
    Header: "User",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
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

const Transaction = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { isLoading, data, isError, error } = useAllOrdersQuery(user.user._id);
  // console.log(useAllOrdersQuery(user.user._id))
  // console.log(data);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      setRows(
        data?.data?.orders?.map((i) => ({
          user: i.user.name,
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
  const table = useCallback(
    TableHOC(columns, rows, "dashboard-product-box", "Transactions", true)()
  );
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main>{table}</main>
    </div>
  );
};

export default Transaction;
