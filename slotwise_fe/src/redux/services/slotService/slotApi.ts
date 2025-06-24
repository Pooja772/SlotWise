import { apiSlice } from "@/redux/services/baseApi";
import { apiRoutes } from "@/web/config/apiRoutes";

export const slotApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlots: builder.query({
      query: ({ params }: any) => ({
        url: apiRoutes.SLOTS,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetAllSlotsQuery } = slotApi;
