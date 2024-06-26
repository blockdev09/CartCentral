import { useEffect, useState } from "react";
import React from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productapi";
import { server } from "../../../redux/store";
import { toastResponse } from "../../../utils/feature";
import { FaTrash } from "react-icons/fa";
const ProductManagement = () => {
  const { user } = useSelector((state) => state.userReducer);
  const params = useParams();
  const navigate = useNavigate();
  const { data, isError } = useProductDetailsQuery(params.id);
  const { name, price, stock, category, photo } = data?.data?.singleproduct || {
    id: "",
    photo: "",
    name: "",
    category: "",
    price: 0,
    stock: 0,
  };

  const [updateName, setUpdateName] = useState(name);
  const [updateprice, setUpdatePrice] = useState(price);
  const [updatestock, setUpdateStock] = useState(stock);
  const [updatephoto, setUpdatePhoto] = useState("");
  const [updatecategory, setUpdateCategory] = useState(category);
  const [photoFile, setPhotoFile] = useState();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const changeImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUpdatePhoto(reader.result);
        setPhotoFile(file);
      };
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    if (updateName) {
      formdata.set("name", updateName);
    }
    if (updatestock !== undefined) {
      formdata.set("stock", updatestock.toString());
    }
    if (photoFile) {
      formdata.set("photo", photoFile);
    }
    if (updateprice) {
      formdata.set("price", updateprice.toString());
    }
    if (updatecategory) {
      formdata.set("category", updatecategory);
    }

    const res = await updateProduct({
      formdata,
      userId: user?.user?._id,
      productId: data?.data?.singleproduct?._id,
    });
    toastResponse(res, navigate, "/admin/product");
  };

  const handledelete = async (e) => {
    e.preventDefault();
    const res = await deleteProduct({
      userId: user.user._id,
      productId: data?.data?.singleproduct?._id,
    });
    toastResponse(res, navigate, "/admin/product");
  };

  useEffect(() => {
    if (data) {
      setUpdateName(data.data.singleproduct.name);
      setUpdateCategory(data.data.singleproduct.category);
      setUpdatePrice(data.data.singleproduct.price);
      setUpdateStock(data.data.singleproduct.stock);
    }
  }, [data]);

  if (isError) {
    return <Navigate to={"/404"} />;
  }
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="product-management">
        <section>
          <strong>ID - {data?.data?.singleproduct?._id}</strong>
          <img src={`${server}/${photo}`} alt="image" />
          <p>{name}</p>
          {stock > 0 ? (
            <span className="green">{stock} Available</span>
          ) : (
            <span className="red">Not Available</span>
          )}
          <h3>{price}/-</h3>
        </section>

        <article>
          <button className="delete-button" onClick={handledelete}>
            <FaTrash />
          </button>
          <form onSubmit={handlesubmit}>
            <h2>Manage</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="name"
                onChange={(e) => setUpdateName(e.target.value)}
                value={updateName}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="price"
                onChange={(e) => setUpdatePrice(e.target.value)}
                value={updateprice}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="stock"
                onChange={(e) => setUpdateStock(Number(e.target.value))}
                value={updatestock}
              />
            </div>
            <div>
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="Category"
                onChange={(e) => setUpdateCategory(Number(e.target.value))}
                value={updatecategory}
              />
            </div>
            <div>
              <label>Photo</label>
              <input required type="file" onChange={changeImage} />
            </div>
            {updatephoto && <img src={updatephoto} alt="image " />}
            <button type="submit">Update</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default ProductManagement;
