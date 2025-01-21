import CreateStudent from "@/components/userManagementComponents/CreateStudent";
import { Modal } from "antd";

export default function CreateStudentModal({
  showModal,
  setIsModalOpen,
}: {
  showModal: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}) {
  return (
    <div>
      <Modal
        open={showModal}
        footer={null}
        closable={false}
        width={{
          xs: "90%",
          sm: "85%",
          md: "80%",
          lg: "70%",
          xl: "60%",
          xxl: "50%",
        }}
        centered
      >
        <CreateStudent setIsModalOpen={setIsModalOpen}></CreateStudent>
      </Modal>
    </div>
  );
}
