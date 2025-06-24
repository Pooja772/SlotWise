import { apiSlice } from "@/redux/services/baseApi";
import { apiRoutes } from "@/web/config/apiRoutes";

export const bookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBooking: builder.mutation<any, any>({
      query: (payload) => ({
        url: apiRoutes.BOOKING,
        method: "POST",
        body: payload,
      }),
    }),
    
    getAllBooking: builder.query({
      query: ({ params }) => ({
        url: apiRoutes.BOOKINGS,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useAddBookingMutation, useGetAllBookingQuery } = bookingApi;
