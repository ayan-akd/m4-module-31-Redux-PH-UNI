import { TQueryParams, TResponseRedux } from "@/types";
import { TAcademicDepartment } from "@/types/academicManagement.type";
import { EndpointBuilder } from "@reduxjs/toolkit/query";

export const academicDepartmentEndpoints = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  builder: EndpointBuilder<any, any, any>
) => ({
  getAllAcademicDepartment: builder.query({
    query: (args: TQueryParams[] | undefined) => {
      const params = new URLSearchParams();
      if (args) {
        args.forEach((item: TQueryParams) => {
          params.append(item.name, item.value as string);
        });
      }
      return {
        url: "/academic-departments",
        method: "GET",
        params,
      };
    },
    providesTags: ["academic-department"],
    transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
      return {
        data: response.data,
        meta: response.meta,
      };
    },
  }),
  addAcademicDepartment: builder.mutation({
    query: (data: TAcademicDepartment) => ({
      url: "/academic-departments/create-academic-department",
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["academic-department"],
  }),
  deleteAcademicDepartment: builder.mutation({
    query: (id: string) => ({
      url: `/academic-departments/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["academic-department"],
  }),
  updateAcademicDepartment: builder.mutation({
    query: ({ id, data }: { id: string; data: TAcademicDepartment }) => ({
      url: `/academic-departments/${id}`,
      method: "PATCH",
      body: data,
    }),
    invalidatesTags: ["academic-department"],
  })
});
