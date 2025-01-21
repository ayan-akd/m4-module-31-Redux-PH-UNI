import { Modal } from "antd";
import EditAcademicDepartment from "../academicManagementComponents/EditAcademicDepartment";
import { TAcademicDepartmentTableData } from "@/pages/admin/academicManagement/AcademicDepartment";

export default function EditAcademicDepartmentModal({
  record,
  showModal,
  setIsModalOpen,
}: {
  record: TAcademicDepartmentTableData;
  showModal: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}) {
  return (
    <div>
      <Modal open={showModal} footer={null} closable={false}>
        <EditAcademicDepartment
          record={record}
          setIsModalOpen={setIsModalOpen}
        ></EditAcademicDepartment>
      </Modal>
    </div>
  );
}
