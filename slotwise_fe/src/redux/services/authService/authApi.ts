import { apiSlice } from "@/redux/services/baseApi";
import { apiRoutes } from "@/web/config/apiRoutes";
 
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (credentials) => ({
        url: apiRoutes.LOGIN,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
 
export const {
  useLoginMutation,
} = authApi;