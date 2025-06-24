import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
 
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_STAGING_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const loginData = (getState() as RootState).auth?.loginData;
      if (loginData?.token) {
        headers.set("Authorization", `Bearer ${loginData?.token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
 