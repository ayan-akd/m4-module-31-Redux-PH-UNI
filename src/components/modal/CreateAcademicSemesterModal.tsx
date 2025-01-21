import CreateAcademicSemester from "../academicManagementComponents/CreateAcademicSemester";
import { Modal } from "antd";

export default function CreateAcademicSemesterModal({
  showModal,
  setIsModalOpen,
}: {
  showModal: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}) {
  return (
    <div>
      <Modal open={showModal} footer={null} closable={false}>
        <CreateAcademicSemester
          setIsModalOpen={setIsModalOpen}
        ></CreateAcademicSemester>
      </Modal>
    </div>
  );
}
