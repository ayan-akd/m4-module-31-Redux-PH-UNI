import { z } from "zod";

const SemesterRegistrationStatus = ["UPCOMING", "ONGOING", "ENDED"];
export const semesterRegistrationSchema = z.object({
  academicSemester: z.string(),
  status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])]),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  minCredit: z.number(),
  maxCredit: z.number(),
});
