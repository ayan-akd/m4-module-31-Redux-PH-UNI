import { TQueryParams, TSemester } from "@/types";
import { TAcademicSemester } from "@/types/academicManagement.type";
import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import CreateAcademicSemesterModal from "@/components/modal/CreateAcademicSemesterModal";
import EditAcademicSemesterModal from "@/components/modal/EditAcademicSemesterModal";
import { alertModal } from "@/components/modal/alertModal";
import { toast } from "sonner";
import { academicManagementHooks } from "@/hooks/academicManagementHooks";
import { useGetAllRegisteredSemesterQuery } from "@/redux/features/admin/Course Management/courseManagement.api";

export type TSemesterTableData = Pick<
  TAcademicSemester,
  "_id" | "name" | "year" | "startMonth" | "endMonth"
>;

export default function RegisteredSemesters() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState<TSemesterTableData>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {  useDeleteAcademicSemesterMutation } =
    academicManagementHooks;
  const { data: semesterData, isFetching } = useGetAllRegisteredSemesterQuery(undefined);
  const [deleteAcademicSemester] = useDeleteAcademicSemesterMutation();

  const tableData = semesterData?.data?.map((semester: TSemester) => ({
    key: semester._id,
    name: `${semester?.academicSemester?.name} ${semester?.academicSemester?.year}`,
    startDate: semester.startDate,
    endDate: semester.endDate,
    status: semester.status,
  }));

  const showAddModal = () => {
    setIsModalOpen(true);
  };
  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting Academic Semester....");
    try {
      const res = await deleteAcademicSemester(id);
      if (res.data) {
        toast.success("Academic Semester Deleted Successfully", {
          id: toastId,
        });
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

  const columns: TableColumnsType<TSemesterTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
     
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Actions",
      render: (record) => {
        const showEditModal = (record: TSemesterTableData) => () => {
          setIsEditModalOpen(true);
          setRecord(record);
        };
        return (
          <div className="flex gap-2">
            <Button onClick={showEditModal(record)} type="primary">
              Edit
            </Button>
            <Button
              type="primary"
              danger
              onClick={() =>
                alertModal(
                  "Are you sure you want to delete this semester ?",
                  `${record.name}  ${record.year} semester will be deleted`,
                  () => handleDelete(record.key)
                )
              }
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];


  return (
    <div>
      <h1 className="text-center mb-5 text-xl font-bold">Academic Semester</h1>
      <div className="flex justify-end mb-5">
        <Button onClick={showAddModal} type="primary">
          Add Semester
        </Button>
      </div>
      <Table<TSemesterTableData>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        showSorterTooltip={{ target: "sorter-icon" }}
        style={{ overflow: "scroll" }}
      />
      {isModalOpen ? (
        <CreateAcademicSemesterModal
          showModal={true}
          setIsModalOpen={setIsModalOpen}
        ></CreateAcademicSemesterModal>
      ) : (
        ""
      )}
      {isEditModalOpen && record ? (
        <EditAcademicSemesterModal
          record={record}
          showModal={true}
          setIsModalOpen={setIsEditModalOpen}
        ></EditAcademicSemesterModal>
      ) : (
        ""
      )}
    </div>
  );
}
