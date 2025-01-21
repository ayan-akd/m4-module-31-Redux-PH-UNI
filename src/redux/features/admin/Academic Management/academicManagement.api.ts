import { baseApi } from "@/redux/api/baseApi";
import { academicSemesterEndpoints } from "./academicSemesterEndpoints";
import { academicFacultyEndpoints } from "./academicFacultyEndpoints";
import { academicDepartmentEndpoints } from "./academicDepartmentEndpoints";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ...academicSemesterEndpoints(builder),
    ...academicFacultyEndpoints(builder),
    ...academicDepartmentEndpoints(builder),
  }),
});


export const academicManagementApiInstance = academicManagementApi;