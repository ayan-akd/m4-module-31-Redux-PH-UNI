import { TQueryParams, TStudent } from "@/types";
import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { alertModal } from "@/components/modal/alertModal";
import { toast } from "sonner";
import { academicManagementHooks } from "@/hooks/academicManagementHooks";
import { useGetAllStudentsQuery } from "@/redux/features/admin/User Management/userManagement.api";
import { Link } from "react-router-dom";
import CreateStudentModal from "@/components/modal/CreateStudentModal";

export type TStudentTableData = Pick<TStudent, "fullName" | "id" | "email" | "contactNo">;

export default function StudentData() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState<TStudentTableData>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const { useDeleteAcademicSemesterMutation } = academicManagementHooks;
  const { data: studentsData, isFetching } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  const [deleteAcademicSemester] = useDeleteAcademicSemesterMutation();

  const metaData = studentsData?.meta;

  const tableData = studentsData?.data?.map((student: TStudent) => ({
    key: student._id,
    fullName: student.fullName,
    id: student.id,
    email: student.email,
    contactNo: student.contactNo,
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

  const columns: TableColumnsType<TStudentTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
      showSorterTooltip: { target: "full-header" },
    },

    {
      title: "Roll No.",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      dataIndex: "contactNo",
    },
    {
      title: "Actions",
      width: "1%",
      align: "center",
      render: (record) => {
        const showEditModal = (record: TStudentTableData) => () => {
          setIsEditModalOpen(true);
          setRecord(record);
        };
        return (
          <div className="flex gap-2">
            <Link to={`/admin/student-details/${record.key}`}>
            <Button type="primary">Details</Button>
            </Link>
            <Button onClick={showEditModal(record)} type="primary">
              Edit
            </Button>
            <Button
              type="primary"
              danger
              onClick={() =>
                alertModal(
                  "Are you sure you want to delete this student ?",
                  `${record.name} student will be deleted`,
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

  const onChange: TableProps<TStudentTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };

  return (
    <div>
      <h1 className="text-center mb-5 text-xl font-bold">Students</h1>
      <div className="flex justify-end mb-5">
        <Button onClick={showAddModal} type="primary">
          Add Student
        </Button>
      </div>
      <Table<TStudentTableData>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        style={{ overflow: "scroll" }}
        pagination={false}
      />
      <Pagination
        current={page}
        align="center"
        pageSize={metaData?.limit}
        total={metaData?.totalDocuments}
        onChange={(page) => setPage(page)}
      />
      {isModalOpen ? (
        <CreateStudentModal
          showModal={true}
          setIsModalOpen={setIsModalOpen}
        ></CreateStudentModal>
      ) : (
        ""
      )}
      {/* {isEditModalOpen && record ? (
        <EditAcademicSemesterModal
          record={record}
          showModal={true}
          setIsModalOpen={setIsEditModalOpen}
        ></EditAcademicSemesterModal>
      ) : (
        ""
      )} */}
    </div>
  );
}
