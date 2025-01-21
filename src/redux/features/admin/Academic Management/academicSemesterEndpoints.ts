/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParams, TResponseRedux } from "@/types";
import { TAcademicSemester } from "@/types/academicManagement.type";
import { EndpointBuilder } from "@reduxjs/toolkit/query";

export const academicSemesterEndpoints = (
  builder: EndpointBuilder<any, any, any>
) => ({
  getAllSemesters: builder.query({
    query: (args: TQueryParams[] | undefined) => {
      const params = new URLSearchParams();
      if (args) {
        args.forEach((item: TQueryParams) => {
          params.append(item.name, item.value as string);
        });
      }
      return {
        url: "/academic-semesters",
        method: "GET",
        params,
      };
    },
    providesTags: ["academic-semester"],
    transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
      return {
        data: response.data,
        meta: response.meta,
      };
    },
  }),
  addAcademicSemester: builder.mutation({
    query: (data) => ({
      url: "/academic-semesters/create-academic-semester",
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["academic-semester"],
  }),
  updateAcademicSemester: builder.mutation({
    query: ({ id, data }) => ({
      url: `/academic-semesters/${id}`,
      method: "PATCH",
      body: data,
    }),
    invalidatesTags: ["academic-semester"],
  }),
  deleteAcademicSemester: builder.mutation({
    query: (id) => ({
      url: `/academic-semesters/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["academic-semester"],
  }),
});
