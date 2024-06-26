import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Loader from "./components/Loader";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExists } from "./redux/reducer/userReducer";
import { auth } from "./firebase.js";
import { getUser } from "./redux/api/userapi.js";
import ProtectRoute from "./components/ProtectRoute.jsx";
const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const Orders = lazy(() => import("./pages/Order"));
const OrderDetails = lazy(() => import("./pages/OrderDetails.jsx"));
const NotFound = lazy(() => import("./components/NotFound.jsx"));
const Checkout = lazy(() => import("./pages/Checkout.jsx"));
////// ADMIN  ROUTES IMPORTING
const Dashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
// const Product = lazy(() => import("./pages/admin/Product.jsx"));
const Product = lazy(() => import("./pages/admin/Product.jsx"));
const Customers = lazy(() => import("./pages/admin/Customers.jsx"));
const Transaction = lazy(() => import("./pages/admin/Transaction.jsx"));
const Barchart = lazy(() => import("./pages/admin/charts/BarCharts.jsx"));
const Piechart = lazy(() => import("./pages/admin/charts/PieChart.jsx"));
const Linechart = lazy(() => import("./pages/admin/charts/LineChart.jsx"));
const Coupon = lazy(() => import("./pages/admin/apps/Coupon.jsx"));
const Stopwatch = lazy(() => import("./pages/admin/apps/Stopwatch.jsx"));
const Toss = lazy(() => import("./pages/admin/apps/Toss.jsx"));
const NewProduct = lazy(() =>
  import("./pages/admin/management/NewProduct.jsx")
);
const ProductManagement = lazy(() =>
  import("./pages/admin/management/ProductManagement.jsx")
);
const TransactionManagement = lazy(() =>
  import("./pages/admin/management/TransactionManagement.jsx")
);
const App = () => {
  const dispatched = useDispatch();
  const { user, loading } = useSelector((state) => state.userReducer);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        dispatched(userExist(data));
      } else {
        dispatched(userNotExists());
      }
    });
  }, []);

  // return signOut(auth).then((c)=>console.log("DONE"))

  return loading ? (
    <Loader />
  ) : (
    <BrowserRouter>
      <Header user={user} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          {/* Not Logged in ROute */}
          <Route
            path="/login"
            element={
              <ProtectRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectRoute>
            }
          />
          <Route
            element={<ProtectRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/pay" element={<Checkout />} />
          </Route>
          {/* {ADMIN PROTECTED ROUTES} */}
          <Route
            element={
              <ProtectRoute
                isAuthenticated={true}
                adminOnly={true}
                Admin={user?.role === "admin" ? false : true}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Product user={user} />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            {/* Charts */}
            <Route path="/admin/chart/bar" element={<Barchart />} />
            <Route path="/admin/chart/pie" element={<Piechart />} />
            <Route path="/admin/chart/line" element={<Linechart />} />
            {/* Apps */}
            <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/toss" element={<Toss />} />

            {/* Management */}
            <Route path="/admin/product/new" element={<NewProduct />} />

            <Route path="/admin/product/:id" element={<ProductManagement />} />

            <Route
              path="/admin/transaction/:id"
              element={<TransactionManagement />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
