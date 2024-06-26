import React from "react";

import AdminSidebar from "../../../components/admin/AdminSidebar";

import {
  BarChart,
  DoughnotChart,
  PieCharts,
} from "../../../components/admin/Charts";
import { categories } from "../../../assets/data.json";
import { useSelector } from "react-redux";
import { usePieQuery } from "../../../redux/api/Dashboardapi";
const PieChart = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { isLoading, isError, data, error } = usePieQuery(user.user._id);
  const pieStats = data?.pie;
  console.log(pieStats);
  const a = pieStats?.orderFullFillmentRatio;
  const b = pieStats?.countArray;
  const c = pieStats?.stockAvailaibility;
  const d = pieStats?.revenueDistribution;
  const e = pieStats?.usersAgeGroup;
  const f = pieStats?.adminandUserCustomers;

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Pie and Doughnut Charts</h1>
        <section>
          <div>
            <PieCharts
              labels={["Processing", "Shipped", "Delivered"]}
              data={[a?.Processing, a?.Shipped, a?.Delivered]}
              backgroundColor={[
                `hsl(110,80%,80%)`,
                `hsl(110,80%,50%)`,
                `hsl(110,40%,50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2>Order Fullfillment Ratio</h2>
        </section>
        <section>
          <div>
            <DoughnotChart
              labels={b?.map((i) => Object.keys(i)[0])}
              data={b?.map((i) => Object.values(i)[0])}
              backgroundColor={b?.map(
                (i) =>
                  `hsl(${Object.values(i)[0] * 4},${Object.values(i)[0]}%,50%)`
              )}
              legends={false}
              offset={[0, 0, 0, 80]}
            />
          </div>
          <h2>Products Categories Ratio</h2>
        </section>
        <section>
          <div>
            <DoughnotChart
              labels={["InStock", "Out of Stock"]}
              data={[c?.Instock, c?.OutofStock]}
              backgroundColor={["hsl(269,80%,40%)", "rgb(53,162,255)"]}
              legends={false}
              offset={[0, 80]}
              cutout={"70%"}
            />
          </div>
          <h2>Stock Avalibility</h2>
        </section>
        <section>
          <div>
            <DoughnotChart
              labels={[
                "Marketing Cost",
                "Discount",
                "Burnt",
                "Production Cost",
                "Net Margin",
              ]}
              data={[
                d?.marketingCost,
                d?.discount,
                d?.burnt,
                d?.productionCost,
                d?.netMargin,
              ]}
              backgroundColor={[
                "hsl(110,80%,40%)",
                "hsl(19,80%,40%)",
                "hsl(69,80%,40%)",
                "hsl(300,80%,40%)",
                "rgb(53,162,255)",
              ]}
              legends={false}
              offset={[20, 30, 20, 30, 80]}
            />
          </div>
          <h2>Revenue Distrubtion</h2>
        </section>
        <section>
          <div>
            <PieCharts
              labels={["Teenager(Below 20)", "Adult(20-40)", "Older(above 40)"]}
              data={[e?.teenager, e?.Adult, e?.Older]}
              backgroundColor={[
                `hsl(10,${80}%,80%)`,
                `hsl(10,${80}%,50%)`,
                `hsl(10,${40}%,50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2>Users Age Group</h2>
        </section>
        <section>
          <div>
            <DoughnotChart
              labels={["Admin", "Customer"]}
              data={[f?.admin,f?.customer]}
              backgroundColor={["hsl(335,100%,38%)", "hsl(44,98%,50%)"]}
              offset={[0, 80]}
            />
          </div>
          <h2>Admin & Customers</h2>
        </section>
      </main>
    </div>
  );
};

export default PieChart;
