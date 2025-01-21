import CreateAcademicFaculty from "../academicManagementComponents/CreateAcademicFaculty";
import { Modal } from "antd";

export default function CreateAcademicFacultyModal({
  showModal,
  setIsModalOpen,
}: {
  showModal: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}) {
  return (
    <div>
      <Modal open={showModal} footer={null} closable={false} centered>
        <CreateAcademicFaculty
          setIsModalOpen={setIsModalOpen}
        ></CreateAcademicFaculty>
      </Modal>
    </div>
  );
}
