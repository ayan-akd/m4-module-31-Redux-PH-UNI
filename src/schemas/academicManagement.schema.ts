import { z } from "zod";

export const academicSemesterSchema = z.object({
    name: z.string({ required_error: "Semester Name is required" }),
    year: z.string({ required_error: "Semester Year is required" }),
    startMonth: z.string({ required_error: "Start Month is required" }),
    endMonth: z.string({ required_error: "End Month is required" }),
  });

  export const academicFacultySchema = z.object({
    name: z.string({ required_error: "Faculty Name is required" }),
  });

  export const academicDepartmentSchema = z.object({
    name: z.string({ required_error: "Department Name is required" }),
    academicFaculty: z.string({ required_error: "Faculty is required" }),
  });