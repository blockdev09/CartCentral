import React, { useState } from "react";
import Productcard from "../components/Productcard";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productapi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addtoCart } from "../redux/reducer/cartReducer";
import { useParams, useSearchParams } from "react-router-dom";
const Search = () => {
  const { data, isError, error } = useCategoriesQuery("");
  const dispatch = useDispatch();
  const a = data?.data;
  const b = a?.categories;
  
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxprice] = useState(10000000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const addtoCartHandler = (CartItem) => {
    if (CartItem.stock < 1) {
      return toast.error("Out of Stock");
    }
    dispatch(addtoCart(CartItem));
    toast.success("Added to the cart Successfully!");
  };
  const isprevpage = page > 1;
  const isnextpage = page < 4;
  if (isError) {
    const err = error;
    toast.error(err.data.message);
  }

  const c = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });
  //  console.log(c)
  const d = c?.currentData;
  const e = d?.data;
  const f = e?.Products;
  // const z = f?.map((i)=>i.category)
  // console.log(f)
  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="ascending">Price (low to high)</option>
            <option value="descending">Price (High to low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price:{maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxprice(e.target.value)}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">ALL</option>
            {b?.map((i) => (
              <option value={i} key={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="search-product-list">
          {f?.map((i) => (
            <Productcard
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addtoCartHandler}
              photo={i.photo}
            />
          ))}
        </div>
        <article>
          <button
            disabled={!isprevpage}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span>
            {page} of {4}
          </span>
          <button
            disabled={!isnextpage}
            onClick={() => setPage((prev) => setPage(prev + 1))}
          >
            Next
          </button>
        </article>
      </main>
    </div>
  );
};

export default Search;
