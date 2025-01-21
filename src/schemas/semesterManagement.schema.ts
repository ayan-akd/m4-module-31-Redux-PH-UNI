import { z } from "zod";

export const semesterRegistrationSchema = z.object({
    name: z.string({ required_error: "Please select a semester" }),
    status: z.string({ required_error: "Please select a status" }),
    startDate: z.string({ required_error: "Start date is required" }),
    endDate: z.string({ required_error: "End date is required" }),
    minCredit: z.number({ 
      required_error: "Minimum credit is required",
      invalid_type_error: "Minimum credit must be a number"
    }).min(1, "Minimum credit must be at least 1"),
    maxCredit: z.number({
      required_error: "Maximum credit is required",
      invalid_type_error: "Maximum credit must be a number"
    }).min(1, "Maximum credit must be at least 1")
  }).refine((data) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    return endDate > startDate;
  }, {
    message: "End date must be after start date",
    path: ["endDate"]
  });