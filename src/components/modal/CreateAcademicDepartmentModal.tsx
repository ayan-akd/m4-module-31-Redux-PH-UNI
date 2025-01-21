import CreateAcademicDepartment from "../academicManagementComponents/CreateAcademicDepartment";
import { Modal } from "antd";

export default function CreateAcademicDepartmentModal({
  showModal,
  setIsModalOpen,
}: {
  showModal: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}) {
  return (
    <div>
      <Modal open={showModal} footer={null} closable={false} centered>
        <CreateAcademicDepartment
          setIsModalOpen={setIsModalOpen}
        ></CreateAcademicDepartment>
      </Modal>
    </div>
  );
}
