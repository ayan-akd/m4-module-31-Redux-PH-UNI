import PHForm from "@/components/form/PHForm";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TResponse } from "@/types/global";
import { academicManagementHooks } from "@/hooks/academicManagementHooks";
import PHInput from "../form/PHInput";
import PHSelect from "../form/PHSelect";
import { TAcademicDepartmentTableData } from "@/pages/admin/academicManagement/AcademicDepartment";

export default function EditAcademicDepartment({
  setIsModalOpen,
  record,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
  record: TAcademicDepartmentTableData;
}) {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { useUpdateAcademicDepartmentMutation, useGetAllAcademicFacultyQuery } =
    academicManagementHooks;
  const [updateAcademicDepartment] = useUpdateAcademicDepartmentMutation();
  const { data: academicFacultyData, isFetching } =
    useGetAllAcademicFacultyQuery();
  const academicFacultyOptions = academicFacultyData?.data?.map(
    (faculty: { _id: string; name: string }) => ({
      label: faculty.name,
      value: faculty._id,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating Academic Department....");
    const departmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };
    try {
      const res = (await updateAcademicDepartment({
        id: record._id,
        data: departmentData,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      })) as TResponse<any>;
      if (res.data) {
        toast.success("Academic Department Updated Successfully", {
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
          Update Department
        </h1>
        <PHForm
          onSubmit={onSubmit}
          defaultValues={{
            name: record.name,
            academicFaculty: record.academicFaculty,
          }}
        >
          <PHInput name="name" type="text" label="Department Name" />
          {isFetching ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full mb-5 h-10 w-10 border-t-2 border-b-2 border-blue-900"></div>
            </div>
          ) : (
            <PHSelect
              label="Select Faculty"
              name="academicFaculty"
              options={academicFacultyOptions}
            />
          )}
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
