import React, { useState, useCallback, useEffect } from "react";
// import AdminSidebar from "../components/AdminSidebar";
// import TableHOC from "../components/TableHOC";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { FaTrash } from "react-icons/fa";
import TableHOC from "../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import {
  useAllusersQuery,
  useDeleteUsersMutation,
} from "../../redux/api/userapi";
import toast from "react-hot-toast";

import { server } from "../../redux/store";
import { toastResponse } from "../../utils/feature";
const columns = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { isLoading, isError, data, error } = useAllusersQuery(user.user._id);
  const [deleteuser] = useDeleteUsersMutation();
  // console.log(user.user._id);
  // console.log(data?.data?.allUser._id);
  const [rows, setRows] = useState([]);
  const deletehandler = async (userId) => {
    const res = await deleteuser({ userId, adminUserId: user.user._id });
    toastResponse(res, null, "");
  };
  if (isError) {
    const err = error;
    toast.error(err.data.message);
  }
  useEffect(() => {
    if (data) {
      setRows(
        data?.data?.allUser?.map((i) => ({
          avatar: <img style={{ borderRadius: "50%" }} src={i.photo} />,
          name: i.name,
          gender: i.gender,
          email: i.email,
          role: i.role,
          action: (
            <button onClick={() => deletehandler(i._id)}>
              <FaTrash />
            </button>
          ),
        }))
      );
    }
  }, [data]);
  const table = useCallback(
    TableHOC(
      columns,
      rows,
      "dashboard-product-box",
      "Customers",
      rows.length > 6
    )()
  );
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main>{table}</main>
    </div>
  );
};

export default Customers;
