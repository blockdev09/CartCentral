import React, { useEffect, useState } from "react";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaGamepad,
  FaStopwatch,
} from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import {
  RiCoupon3Fill,
  RiDashboardFill,
  RiShoppingBag3Fill,
} from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { AiFillFileText } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
const AdminSidebar = () => {
  const today = new Date();
  const location = useLocation();
  const [showModalWindow, setShowModalWindow] = useState(false);

  const [onPhoneScreen, setOnPhoneScreen] = useState(window.innerWidth < 1100);
  useEffect(() => {
    const handleResize = () => {
      setOnPhoneScreen(window.innerWidth < 1100);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleclose = () => {
    setShowModalWindow(false);
  };
  return (
    <>
      {onPhoneScreen && (
        <button id="hamburger" onClick={() => setShowModalWindow(true)}>
          <HiMenuAlt2 />
        </button>
      )}
      <aside
        style={
          onPhoneScreen
            ? {
                width: "20rem",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: showModalWindow ? "0" : "-20rem",
                transition: "all 0.5s",
              }
            : {}
        }
      >
        <h2>Logo.</h2>
        <FirstDiv location={location} />
        <SecondDIv location={location} />
        <ThirdDiv
          location={location}
          onPhoneScreen={onPhoneScreen}
          handleclose={handleclose}
        />
      </aside>
    </>
  );
};

const FirstDiv = ({ location }) => {
  return (
    <div>
      <h5>Dashboard</h5>
      <ul>
        <Li
          url="/admin/dashboard"
          text="Dashboard"
          location={location}
          Icon={RiDashboardFill}
        />
        <Li
          url="/admin/product"
          text="Product"
          location={location}
          Icon={RiShoppingBag3Fill}
        />
        <Li
          url="/admin/customer"
          text="Customer"
          location={location}
          Icon={IoIosPeople}
        />
        <Li
          url="/admin/transaction"
          text="Transaction"
          location={location}
          Icon={AiFillFileText}
        />
      </ul>
    </div>
  );
};

const SecondDIv = ({ location }) => {
  return (
    <div>
      <h5>Charts</h5>
      <ul>
        <Li
          url="/admin/chart/bar"
          text="Bar"
          location={location}
          Icon={FaChartBar}
        />
        <Li
          url="/admin/chart/pie"
          text="Pie"
          location={location}
          Icon={FaChartPie}
        />
        <Li
          url="/admin/chart/line"
          text="Line"
          location={location}
          Icon={FaChartLine}
        />
      </ul>
    </div>
  );
};

const ThirdDiv = ({ location, onPhoneScreen, handleclose }) => {
  return (
    <div>
      <h5>Apps</h5>
      <ul>
        {/* <Li
          url="/admin/app/stopwatch"
          text="Stopwatch"
          location={location}
          Icon={FaStopwatch}
        /> */}
        <Li
          url="/admin/app/coupon"
          text="Coupon"
          location={location}
          Icon={RiCoupon3Fill}
        />
        {/* <Li
          url="/admin/app/toss"
          text="Toss"
          location={location}
          Icon={FaGamepad}
        /> */}
      </ul>
      {onPhoneScreen && (
        <button id="close-sidebar" onClick={handleclose}>
          Close
        </button>
      )}
    </div>
  );
};
const Li = ({ url, text, location, Icon }) => {
  return (
    <li
      style={{
        backgroundColor: location.pathname.includes(url)
          ? "rgba(0,115,255,0.1)"
          : "white",
      }}
    >
      <Link
        to={url}
        style={{
          color: location.pathname.includes(url) ? "rgb(0,115,255)" : "black",
        }}
      >
        <Icon />
        {text}
      </Link>
    </li>
  );
};
export default AdminSidebar;
