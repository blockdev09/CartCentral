import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/users/`,
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
    deleteUsers: builder.mutation({
      query: ({ userId, adminUserId }) => ({
        url: `${userId}?id=${adminUserId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    allusers: builder.query({
      query: (id) => `all?id=${id}`,
      providesTags: ["users"],
    }),
  }),
});

export const getUser = async (id) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/users/${id}`
    );
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const { useLoginMutation, useDeleteUsersMutation, useAllusersQuery } =
  userAPI;
