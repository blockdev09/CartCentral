import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/dashboard/`,
  }),
  
  endpoints: (builder) => ({
    stats: builder.query({
      query: (id) => `stats?id=${id}`,
      keepUnusedDataFor: 0,
     
    }),
    pie: builder.query({
      query: (id) => `pieChart?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    line: builder.query({
      query: (id) => `lineChart?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    bar: builder.query({
      query: (id) => `barChart?id=${id}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useStatsQuery, usePieQuery, useLineQuery, useBarQuery } =
  dashboardApi;
