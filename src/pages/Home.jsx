// import React from "react";
// import { toast } from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { SkeletonLoader } from "../components/Loader";
// import Productcard from "../components/Productcard";
// import { useLatestProductQuery } from "../redux/api/productapi";
// import { addtoCart } from "../redux/reducer/cartReducer";
// import coverimage1 from "../assets/images/shoes.png";
// import coverimage2 from '../assets/images/cover.jpg'
// import {Slider} from '6pp';
// import {TbTruckDelivery} from 'react-icons/tb';
// import {LuShieldCheck} from 'react-icons/lu'
// import {motion} from 'framer-motion'
// import {FaAnglesDown,FaHeadset} from 'react-icons/fa6'
// import video from '../assets/videos/cover.mp4'

// const banners = [
//   coverimage1,
//   coverimage2
// ]
// const Home = () => {
//   const dispatch = useDispatch();
//   const { data, isLoading, isError } = useLatestProductQuery();

//   const a = data?.data;

//   const b = a?.latestProducts;

//   if (isError) {
//     toast.error("Cannot fetch the products");
//   }
//   const addtoCartHandler = (CartItem) => {
//     if (CartItem.stock < 1) {
//       return toast.error("Out of Stock");
//     }
//     dispatch(addtoCart(CartItem));
//     toast.success("Added to the cart Successfully!");
//   };
//   return (
//     <div className="home">
//       <section>
//       </section>
//       <h1>
//         Latest Products
//         <Link to="/search" className="findmore">
//           More...
//         </Link>
//       </h1>
//       <main>
//         {isLoading ? (
//           <SkeletonLoader width="40vw" />
//         ) : (
//           b?.map((i) => (
//             <Productcard
//               productId={i._id}
//               name={i.name}
//               price={i.price}
//               stock={i.stock}
//               handler={addtoCartHandler}
//               photo={i.photo}
//             />
//           ))
//         )}
//       </main>
//     </div>
//   );
// };

// export default Home;
import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SkeletonLoader } from "../components/Loader";
import Productcard from "../components/Productcard";
import { useLatestProductQuery } from "../redux/api/productapi";
import { addtoCart } from "../redux/reducer/cartReducer";
import coverimage1 from "../assets/images/virat.jpg";
import coverimage2 from "../assets/images/boat.jpg";
import coverimage3 from '../assets/images/watch.jpg'
import coverimage4 from '../assets/images/oneplus.jpg'
import coverimage5 from '../assets/images/fossil.jpg'
import { Slider } from "6pp";
import { TbTruckDelivery } from "react-icons/tb";
import { LuShieldCheck } from "react-icons/lu";
import { motion } from "framer-motion";
import { FaAnglesDown, FaHeadset } from "react-icons/fa6";
import video from "../assets/videos/cover.mp4";

const banners = [coverimage2,coverimage1,coverimage3,coverimage4,coverimage5];

const categories = [
  "Electronics",
  "Mobiles",
  "Laptops",
  "Books",
  "Fashion",
  "Appliances",
  "Furniture",
  "Home Decor",
  "Grocery",
  "Beauty",
  "Toys",
  "Fitness",
];
const Home = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useLatestProductQuery();

  const a = data?.data;

  const b = a?.latestProducts;

  if (isError) {
    toast.error("Cannot fetch the products");
  }
  const addtoCartHandler = (CartItem) => {
    if (CartItem.stock < 1) {
      return toast.error("Out of Stock");
    }
    dispatch(addtoCart(CartItem));
    toast.success("Added to the cart Successfully!");
  };
  const coverMessage = "Fashion is something that comes from within you.".split(
    " "
  );
  return (
    <>
      <article className="videoContainer">
        <div className="video"></div>
        <video autoPlay loop muted src={video} />
        <div className="video-content">
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Fashion
          </motion.h2>
          {coverMessage.map((el, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: i / 10,
              }}
            >
              {el}{" "}
            </motion.span>
          ))}
        </div>
        <motion.span
          animate={{
            y: [0, 10, 0],
            transition: {
              duration: 1,
              repeat: Infinity,
            },
          }}
        >
          <p>To Discover your perfect style, Scroll Down</p>
          {/* <FaAnglesDown /> */}
        </motion.span>
      </article>
      <div className="home">
        <section></section>
        <div>
          <aside>
            <h1>CATEGORIES</h1>
            <ul>
              {categories.map((i) => (
                <li>
                  <Link to={`/search?category=${i.toLowerCase()}`}>{i}</Link>
                </li>
              ))}
            </ul>
          </aside>
          <Slider
            autoplay
            autoplayDuration={3000}
            showNav={false}
            images={banners}
            className="a"
          />
        </div>
        <h1>
          Latest Products
          <Link to="/search" className="findmore">
            More...
          </Link>
        </h1>
        <main>
          {isLoading ? (
            <SkeletonLoader width="40vw" />
          ) : (
            b?.map((i) => (
              <Productcard
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addtoCartHandler}
                photo={i.photo}
              />
            ))
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
