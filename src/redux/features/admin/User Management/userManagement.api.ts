import { baseApi } from "@/redux/api/baseApi";
import { TQueryParams, TResponseRedux, TStudent } from "@/types";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
       query: (args: TQueryParams[] | undefined) => {
         const params = new URLSearchParams();
         if (args) {
           args.forEach((item: TQueryParams) => {
             params.append(item.name, item.value as string);
           });
         }
         return {
           url: "/students",
           method: "GET",
           params,
         };
       },
       providesTags: ["student"],
       transformResponse: (response: TResponseRedux<TStudent[]>) => {
         return {
           data: response.data,
           meta: response.meta, 
         };
       },
     }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["student"],
    }),
  }),
});

export const { useAddStudentMutation, useGetAllStudentsQuery } = userManagementApi;
