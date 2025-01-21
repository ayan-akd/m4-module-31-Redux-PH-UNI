/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParams, TResponseRedux } from "@/types";
import { TAcademicFaculty, TAcademicSemester } from "@/types/academicManagement.type";
import { EndpointBuilder } from "@reduxjs/toolkit/query";

export const academicFacultyEndpoints = (
  builder: EndpointBuilder<any, any, any>
) => ({
  getAllAcademicFaculty: builder.query({
    query: (args: TQueryParams[] | undefined) => {
      const params = new URLSearchParams();
      if (args) {
        args.forEach((item: TQueryParams) => {
          params.append(item.name, item.value as string);
        });
      }
      return {
        url: "/academic-faculties",
        method: "GET",
        params,
      };
    },
    providesTags: ["academic-faculty"],
    transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
      return {
        data: response.data,
        meta: response.meta,
      };
    },
  }),
  addAcademicFaculty: builder.mutation({
    query: (data: TAcademicFaculty) => ({
      url: "/academic-faculties/create-academic-faculty",
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["academic-faculty"],
  }),
  deleteAcademicFaculty: builder.mutation({
    query: (id: string) => ({
      url: `/academic-faculties/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["academic-faculty"],
  }),
  updateAcademicFaculty: builder.mutation({
    query: ({ id, data }: { id: string; data: TAcademicSemester }) => ({
      url: `/academic-faculties/${id}`,
      method: "PATCH",
      body: data,
    }),
    invalidatesTags: ["academic-faculty"],
  })
});
