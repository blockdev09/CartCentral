import React, { useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { useNewProductMutation } from "../../../redux/api/productapi";
import { useNavigate } from "react-router-dom";
import { toastResponse } from "../../../utils/feature";
const NewProduct = () => {
  const { user } = useSelector((state) => state.userReducer);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [PrevPhoto, setPrevPhoto] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");

  const changeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPrevPhoto(reader.result);
        setPhoto(file);
      };
    }
  };
  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!name || !category || !price || !photo) {
      return;
    }
    const formData = new FormData();

    formData.set("name", name);
    formData.set("photo", photo);
    formData.set("category", category);
    formData.set("stock", stock.toString());
    formData.set("price", price.toString());
    const res = await newProduct({ id: user.user._id, formData });
    toastResponse(res, navigate, "/admin/product");
  };
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={handlesubmit}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="stock"
                onChange={(e) => setStock(e.target.value)}
                value={stock}
              />
            </div>
            <div>
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              />
            </div>
            <div>
              <label>Photo</label>
              <input required type="file" onChange={changeImage} />
            </div>
            {PrevPhoto && <img src={PrevPhoto} alt="image " />}
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
