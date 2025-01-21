import PHForm from "@/components/form/PHForm";
import PHSelect from "@/components/form/PHSelect";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { academicManagementHooks } from "@/hooks/academicManagementHooks";
import { semesterStatusOptions } from "@/constants/CourseManagementConstants";
import PHDatePicker from "@/components/form/PHDatePicker";
import PHInput from "@/components/form/PHInput";
import { useAddRegisterSemesterMutation } from "@/redux/features/admin/Course Management/courseManagement.api";
import { TResponse } from "@/types";
import { toast } from "sonner";


export default function SemesterRegistration() {
    const [addSemester] = useAddRegisterSemesterMutation();
  const { useGetAllSemestersQuery } = academicManagementHooks;
  const { data: academicSemesterData } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemesterOptions = academicSemesterData?.data?.map(
    (semester: { _id: string; name: string; year: number }) => ({
      value: semester._id,
      label: `${semester.name} ${semester.year}`,
    })
  );
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Registering Semester....");
    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res = (await addSemester(semesterData)) as TResponse<any>;
        if (res.data) {
          toast.success("Academic Semester Created Successfully", {
            id: toastId,
          });
        }
        if (res.error) {
          toast.error(res.error.data.message, {
            id: toastId,
          });
        }
      } catch (err) {
        toast.error("Something went wrong", {
          id: toastId,
        });
        console.log(err);
      }
  };

  return (
    <Flex align="center" justify="center">
      <Col span={8}>
        <h1 className="text-center font-bold mb-5 text-xl">
          Semester Registration
        </h1>
        <PHForm
          onSubmit={onSubmit}
        //   resolver={zodResolver(semesterRegistrationSchema)}
        >
          <PHSelect
            label="Select Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <PHSelect
            label="Select Status"
            name="status"
            options={semesterStatusOptions}
          />
          <PHDatePicker label="Start Date" name="startDate" />
          <PHDatePicker label="End Date" name="endDate" />
          <PHInput label="Min Credit" name="minCredit" type="number" />
          <PHInput label="Max Credit" name="maxCredit" type="number" />
          <div className="flex justify-center gap-2">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </PHForm>
      </Col>
    </Flex>
  );
}
