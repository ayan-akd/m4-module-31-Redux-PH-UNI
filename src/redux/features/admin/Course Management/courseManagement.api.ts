import { baseApi } from "@/redux/api/baseApi";
import { TCourse, TQueryParams, TResponseRedux, TSemester } from "@/types";

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
    updateRegisterSemester: builder.mutation({
      query: (args) => ({
        url: `/semester-registration/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["registered-semester"],
    }),
    getAllCourses: builder.query({
      query: (args: TQueryParams[] | undefined) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/courses",
          method: "GET",
          params,
        };
      },
      providesTags: ["course"],
      transformResponse: (response: TResponseRedux<TCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),
    assignFaculties: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.courseId}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useAddRegisterSemesterMutation,
  useGetAllRegisteredSemesterQuery,
  useUpdateRegisterSemesterMutation,
  useGetAllCoursesQuery,
  useAddCourseMutation,
  useAssignFacultiesMutation,
} = courseManagementApi;
