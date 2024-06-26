import React from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineCharts } from "../../../components/admin/Charts";
import { useSelector } from "react-redux";
import { useLineQuery } from "../../../redux/api/Dashboardapi";
import moment from "moment";
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
export const getMonths = () => {
  const currentDate = moment();

  currentDate.date(1);

  const last6Months = [];
  const last12Months = [];

  for (let i = 0; i < 6; i++) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMMM");
    last6Months.unshift(monthName);
  }

  for (let i = 0; i < 12; i++) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMMM");
    last12Months.unshift(monthName);
  }

  return {
    last12Months,
    last6Months,
  };
};
const { last12Months, last6Months } = getMonths();
const LineChart = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { isLoading, isError, error, data } = useLineQuery(user.user._id);
  // console.log(data)
  const lineStats = data?.charts;
  console.log(lineStats);
  const a = lineStats?.users;
  const b = lineStats?.product;
  const c = lineStats?.revenue;
  const d = lineStats?.discount;
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Line Charts</h1>
        <section>
          <LineCharts
            data={a}
            label="Users"
            borderColor="rgb(53,162,2550)"
            backgroundColor="rgba(53,162,255,0.5)"
            labels={last12Months}
          />
          <h2>Active Users</h2>
        </section>
        <section>
          <LineCharts
            data={b}
            //  data={[24000,14400,24100,34300,90000,20000,25600,44700,99000,14400,100000,120000]}
            label="Products"
            borderColor="hsl(269,80%,40%)"
            backgroundColor="hsla(269,80%,40%,0.4)"
            labels={last12Months}
          />
          <h2>Total Products</h2>
        </section>
        <section>
          <LineCharts
            data={c}
            borderColor="hsl(129,80%,40%)"
            backgroundColor="hsla(129,80%,40%,0.4)"
            labels={last12Months}
            label="Revenue"
          />
          <h2>Total Revenue</h2>
        </section>
        <section>
          <LineCharts
            data={d}
            borderColor="hsl(29,80%,40%)"
            backgroundColor="hsla( 29,80%,40%,0.4)"
            labels={last12Months}
            label="Discount"
          />
          <h2>Discount Alloted</h2>
        </section>
      </main>
    </div>
  );
};

export default LineChart;
