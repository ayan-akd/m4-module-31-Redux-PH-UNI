import PHForm from "@/components/form/PHForm";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { academicFacultySchema } from "@/schemas/academicManagement.schema";
import { toast } from "sonner";
import { TResponse } from "@/types/global";
import { academicManagementHooks } from "@/hooks/academicManagementHooks";
import PHInput from "../form/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CreateAcademicFaculty({
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
  const { useAddAcademicFacultyMutation } = academicManagementHooks;
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Academic Faculty....");
    const facultyData = {
      name: data.name,
    };
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = (await addAcademicFaculty(facultyData)) as TResponse<any>;
      if (res.data) {
        toast.success("Academic Faculty Created Successfully", {
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
          Create New Faculty
        </h1>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <PHInput name="name" type="text" label="Faculty Name" />
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
