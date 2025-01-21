import { baseApi } from "@/redux/api/baseApi";
import { TQueryParams, TResponseRedux, TSemester } from "@/types";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegisteredSemester: builder.query({
       query: (args: TQueryParams[] | undefined) => {
         const params = new URLSearchParams();
         if (args) {
           args.forEach((item: TQueryParams) => {
             params.append(item.name, item.value as string);
           });
         }
         return {
           url: "/semester-registration",
           method: "GET",
           params,
         };
       },
       providesTags: ["registered-semester"],
       transformResponse: (response: TResponseRedux<TSemester[]>) => {
         return {
           data: response.data,
           meta: response.meta, 
         };
       },
     }),
    addRegisterSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-registration/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["registered-semester"],
    }),
  }),
});

export const { useAddRegisterSemesterMutation, useGetAllRegisteredSemesterQuery } = courseManagementApi;
