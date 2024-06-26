import React from "react";
import toast from "react-hot-toast";
import { BiMaleFemale } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { useSelector } from "react-redux";
import userImg from "../../assets/images/userpic.png";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { BarChart, DoughnotChart } from "../../components/admin/Charts";
import DashboardTable from "../../components/admin/DashboardTable";
import { useStatsQuery } from "../../redux/api/Dashboardapi";
import { getMonths } from "./charts/LineChart";
const {last6Months} = getMonths()
const Dashboard = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { isLoading, isError, error, data } = useStatsQuery(user.user._id);
  const stats = data?.stats;
  if (isError) {
    const err = error;
    toast.error(err.data.message);
  }
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="dashboard">
        <div className="bar">
          <BsSearch />
          <input type="text" placeholder="Search for data, users, docs" />
          <FaRegBell />
          <img src={user.user.photo || userImg} alt="image" />
        </div>
        <section className="widgetcontainer">
          <WidgetItems
            heading="Revenue"
            value={stats?.count?.revenue}
            percent={stats?.changedRevenue}
            color="rgb(0,115,255)"
            amount={true}
          />
          <WidgetItems
            heading="Users"
            value={stats?.count?.users}
            percent={stats?.userpercentage}
            color="rgb(0,198,202)"
          />
          <WidgetItems
            heading="Transactions"
            value={stats?.count?.orders}
            percent={stats?.orderpercentage}
            color="rgb(255,196,0)"
          />
          <WidgetItems
            heading="Products"
            value={stats?.count?.product}
            percent={stats?.productpercentage}
            color="rgb(75 0 255)"
          />
        </section>
        <section className="graphContainer">
          <div className="revenueChart">
            <h2>Revenue & Transactions</h2>
            <BarChart
              labels={last6Months}
              data_1={stats?.chart?.revenue}
              data_2={stats?.chart?.order}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="rgb(0,115,255)"
              bgColor_2="rgb(53,162,235,0.8)"
            />
          </div>
          <div className="dashboardCategories">
            <h2>Inventory</h2>
            <div>
              {stats?.categoryCountArray.map((i) => {
                const [heading, value] = Object.entries(i)[0];
                // console.log(a);
                return (
                  <CategoryItem
                    heading={heading}
                    value={value}
                    key={heading}
                    color={`hsl(${value * 4},${value}%,50%)`}
                  />
                );
              })}
            </div>
          </div>
        </section>
        <section className="transaction-container">
          <div className="genderChart">
            <h2>Gender Ratio</h2>
            <DoughnotChart
              labels={["Female", "Male"]}
              data={[stats?.ratio?.female,stats?.ratio?.male]}
              backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
              cutout={85}
            />
            <p>
              <BiMaleFemale />
            </p>
          </div>
          <DashboardTable />
        </section>
      </main>
    </div>
  );
};

const WidgetItems = ({ heading, value, percent, color, amount = false }) => {
  return (
    <article className="widget">
      <div className="widgetInfo">
        <p>{heading}</p>
        <h4>{amount ? `Rs ${value}` : value}</h4>
        {percent > 0 ? (
          <span className="green">
            <HiTrendingUp /> +{percent}%{" "}
          </span>
        ) : (
          <span className="red">
            <HiTrendingDown /> {percent}%{" "}
          </span>
        )}
      </div>
      <div
        className="widgetCircle"
        style={{
          background: `conic-gradient(${color} ${
            (Math.abs(percent) * 360) / 100
          }deg, rgb(255,255,255) 0)`,
        }}
      >
        <span color={color}>
          {percent > 0 && `${percent > 10000 ? 9999 : percent}%`}
          {percent < 0 && `${percent < -10000 ? -9999 : percent}%`}
        </span>
      </div>
    </article>
  );
};

const CategoryItem = ({ heading, value, color }) => {
  return (
    <div className="categoryItem">
      <h5>{heading}</h5>
      <div>
        <div
          style={{
            backgroundColor: color,
            width: `${value}%`,
          }}
        ></div>
      </div>
      <span>{value}%</span>
    </div>
  );
};

export default Dashboard;
