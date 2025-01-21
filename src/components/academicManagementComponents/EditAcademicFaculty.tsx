import PHForm from "@/components/form/PHForm";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TResponse } from "@/types/global";
import { academicManagementHooks } from "@/hooks/academicManagementHooks";
import PHInput from "../form/PHInput";
import { TAcademicFacultyTableData } from "@/pages/admin/academicManagement/AcademicFaculty";

export default function EditAcademicFaculty({
  setIsModalOpen,
  record,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
  record: TAcademicFacultyTableData;
}) {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { useUpdateAcademicFacultyMutation } = academicManagementHooks;
  const [updateAcademicFaculty] = useUpdateAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating Academic Faculty....");
    const facultyData = {
      name: data.name,
    };
    try {
      const res = (await updateAcademicFaculty({
        id: record._id,
        data: facultyData,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      })) as TResponse<any>;
      if (res.data) {
        toast.success("Academic Faculty Updated Successfully", {
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
        <h1 className="text-center font-bold mb-5 text-xl">Update Faculty</h1>
        <PHForm
          onSubmit={onSubmit}
          defaultValues={{
            name: record.name,
          }}
        >
          <PHInput name="name" type="text" label="Faculty Name" />
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
