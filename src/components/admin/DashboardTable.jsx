import React, { useEffect, useState } from "react";
import TableHOC from "./TableHOC";
import { useStatsQuery } from "../../redux/api/Dashboardapi";
import { useSelector } from "react-redux";
const columns = [
  {
    Header: "Id",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  // {
  //   Header: "Amount",
  //   accessor: "amount",
  // },
  {
    Header: "Status",
    accessor: "status",
  },
];
const DashboardTable = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { isLoading, data, isError, error } = useStatsQuery(user.user._id);
  const [rows, setRows] = useState([]);
  const stats = data?.stats;
  console.log(stats)
  useEffect(() => {
    if (data) {
      setRows(
        stats?.modifiedlatestTransactions?.map((i) => ({
          _id: i._id,
          quantity: i.quantity,
          discount: i.discount,
          // amount: i.amount,
          status: i.status,
        }))
      );
    }
  }, [data]);
  // console.log(data)
  return TableHOC(columns, rows, "transactionBox", "Top Transactions")();
};

export default DashboardTable;
