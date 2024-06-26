import React, { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TableHOC from "../../components/admin/TableHOC";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useAllProductsQuery } from "../../redux/api/productapi";
import toast from "react-hot-toast";
import { server } from "../../redux/store";
const columns = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Product = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { isLoading, isError, error, data } = useAllProductsQuery(
    user.user._id
  );
  // console.log(data?.data?.Products)
  const [rows, setRows] = useState([]);
  if (isError) {
    const err = error;
    toast.error(err.data.message);
  }
  useEffect(() => {
    if (data)
      setRows(
        data?.data?.Products?.map((i) => ({
          photo: <img src={`${server}/${i.photo}`} />,
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);

  const table = useCallback(
    TableHOC(
      columns,
      rows,
      "dashboard-product-box",
      "Products",
      rows?.length > 6
    )()
  );
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main>{table}</main>
      <Link to="/admin/product/new" className="create-button">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Product;
