import { alertModal } from "@/components/modal/alertModal";
import CreateAcademicFacultyModal from "@/components/modal/CreateAcademicFacultyModal";
import EditAcademicFacultyModal from "@/components/modal/EditAcademicFacultyModal";
import { academicManagementHooks } from "@/hooks/academicManagementHooks";
import { TQueryParams } from "@/types";
import { TAcademicFaculty } from "@/types/academicManagement.type";
import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { toast } from "sonner";

export type TAcademicFacultyTableData = Pick<TAcademicFaculty, "_id" | "name">;

export default function AcademicFaculty() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState<TAcademicFacultyTableData>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [params, setParams] = useState<TQueryParams[]>([]);
  const { useGetAllAcademicFacultyQuery, useDeleteAcademicFacultyMutation } =
    academicManagementHooks;
  const [deleteAcademicFaculty] = useDeleteAcademicFacultyMutation();
  const { data: academicFacultyData, isFetching } =
    useGetAllAcademicFacultyQuery(params);
  const tableData = academicFacultyData?.data?.map(
    (faculty: TAcademicFaculty) => ({
      key: faculty._id,
      _id: faculty._id,
      name: faculty.name,
    })
  );

  const showAddModal = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting Academic Faculty....");
    try {
      const res = await deleteAcademicFaculty(id);
      if (res.data) {
        toast.success("Academic Faculty Deleted Successfully", {
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

  const columns: TableColumnsType<TAcademicFacultyTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      align: "center",
      onCell: () => ({
        style: {
          fontSize: "1rem",
          fontWeight: "bold",
        },
      }),
    },

    {
      title: "Actions",
      align: "center",
      render: (record) => {
        const showEditModal = (record: TAcademicFacultyTableData) => () => {
          setIsEditModalOpen(true);
          setRecord(record);
        };
        return (
          <div className="flex justify-center gap-2">
            <Button onClick={showEditModal(record)} type="primary">
              Edit
            </Button>
            <Button
              type="primary"
              danger
              onClick={() =>
                alertModal(
                  "Are you sure you want to delete this Faculty ?",
                  `${record.name} faculty will be deleted`,
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
  const onChange: TableProps<TAcademicFacultyTableData>["onChange"] = (
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
      setParams(queryParams);
    }
  };
  return (
    <div>
      <h1 className="text-center mb-5 text-xl font-bold">Academic Faculties</h1>
      <div className="flex justify-end mb-5">
        <Button onClick={showAddModal} type="primary">
          Add Academic Faculty
        </Button>
      </div>
      <Table<TAcademicFacultyTableData>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        style={{ overflow: "scroll" }}
      />
      {isModalOpen ? (
        <CreateAcademicFacultyModal
          showModal={true}
          setIsModalOpen={setIsModalOpen}
        ></CreateAcademicFacultyModal>
      ) : (
        ""
      )}
      {isEditModalOpen && record ? (
        <EditAcademicFacultyModal
          record={record}
          showModal={true}
          setIsModalOpen={setIsEditModalOpen}
        ></EditAcademicFacultyModal>
      ) : (
        ""
      )}
    </div>
  );
}
