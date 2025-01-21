import PHForm from "@/components/form/PHForm";
import PHSelect from "@/components/form/PHSelect";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TResponse } from "@/types/global";
import { TSemesterTableData } from "@/pages/admin/academicManagement/AcademicSemester";
import {
  academicSemesterOptions,
  monthOptions,
  yearOptions,
} from "@/constants/AcademicManagementConstants";
import { academicManagementHooks } from "@/hooks/academicManagementHooks";

export default function EditAcademicSemester({
  setIsModalOpen,
  record,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
  record: TSemesterTableData;
}) {
  let codeForRecord;
  if (record) {
    codeForRecord = academicSemesterOptions.find(
      (item) => item.label === record.name
    )?.value;
  }
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { useUpdateAcademicSemesterMutation } = academicManagementHooks;
  const [updateAcademicSemester] = useUpdateAcademicSemesterMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating Academic Semester....");
    const name = academicSemesterOptions[Number(data.name) - 1]?.label;
    const semesterData = {
      name: name ? name : record.name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      const res = (await updateAcademicSemester({
        id: record._id,
        data: semesterData,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      })) as TResponse<any>;
      if (res.data) {
        toast.success("Academic Semester Updated Successfully", {
          id: toastId,
        });
        handleOk();
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
    <Flex align="center">
      <Col span={24}>
        <h1 className="text-center font-bold mb-5 text-xl">Update Semester</h1>
        <PHForm
          onSubmit={onSubmit}
          defaultValues={{
            name: codeForRecord,
            year: record.year,
            startMonth: record.startMonth,
            endMonth: record.endMonth,
          }}
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
              Update
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
