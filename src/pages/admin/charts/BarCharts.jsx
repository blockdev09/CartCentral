import React from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import moment from "moment";
import { BarChart } from "../../../components/admin/Charts";
import { useSelector } from "react-redux";
import { useBarQuery } from "../../../redux/api/Dashboardapi";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BarCharts = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { isLoading, isError, error, data } = useBarQuery(user.user._id);
  // console.log(data)
  const barStats = data?.charts;
  // console.log(barStats)
  const a = barStats?.orders;
  const b = barStats?.product;
  const c = barStats?.users;
  console.log(a);
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
        <section>
          <BarChart
            data_1={b}
            data_2={c}
            title_1="Products"
            title_2="Users"
            bgColor_1={`hsl(260,50%,30%)`}
            bgColor_2={`hsl(360,90%,90%)`}
          />
          <h2>TOP SELLING PRODUCTS & TOP CUSTOMERS</h2>
        </section>
        <section>
          <BarChart
            horizontal={true}
            data_1={b}
            data_2={[]}
            title_1="Products"
            title_2=""
            bgColor_1={`hsl(180,40%,50%)`}
            bgColor_2=""
            labels={months}
          />
          <h2>Orders throughout the year</h2>
        </section>
      </main>
    </div>
  );
};

export default BarCharts;
