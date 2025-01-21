import PHForm from "@/components/form/PHForm";
import PHSelect from "@/components/form/PHSelect";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "@/schemas/academicManagement.schema";
import { toast } from "sonner";
import { TResponse } from "@/types/global";
import {
  academicSemesterOptions,
  monthOptions,
  yearOptions,
} from "@/constants/AcademicManagementConstants";
import { academicManagementHooks } from "@/hooks/academicManagementHooks";

export default function CreateAcademicSemester({
  setIsModalOpen,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
}) {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { useAddAcademicSemesterMutation } = academicManagementHooks;
  const [addAcademicSemester] = useAddAcademicSemesterMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Academic Semester....");
    const name = academicSemesterOptions[Number(data.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = (await addAcademicSemester(semesterData)) as TResponse<any>;
      if (res.data) {
        toast.success("Academic Semester Created Successfully", {
          id: toastId,
        });
        handleOk();
      }
      if (res.error) {
        toast.dismiss(toastId);
      }
    } catch (err) {
      toast.error("Something went wrong", {
        id: toastId,
      });
      console.log(err);
    }
  };

  return (
    <Flex align="center">
      <Col span={24}>
        <h1 className="text-center font-bold mb-5 text-xl">
          Create New Semester
        </h1>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect
            label="Select Semester"
            name="name"
            options={academicSemesterOptions}
          />
          <PHSelect label="Select Year" name="year" options={yearOptions} />
          <PHSelect
            label="Select Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect
            label="Select End Month"
            name="endMonth"
            options={monthOptions}
          />
          <div className="flex justify-center gap-2">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={handleCancel} type="primary" danger>
              Cancel
            </Button>
          </div>
        </PHForm>
      </Col>
    </Flex>
  );
}
