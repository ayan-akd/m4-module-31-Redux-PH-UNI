import { alertModal } from "@/components/modal/alertModal";
import CreateAcademicDepartmentModal from "@/components/modal/CreateAcademicDepartmentModal";
import EditAcademicDepartmentModal from "@/components/modal/EditAcademicDepartmentModal";
import { academicManagementHooks } from "@/hooks/academicManagementHooks";
import { TQueryParams } from "@/types";
import { TAcademicDepartment } from "@/types/academicManagement.type";
import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { toast } from "sonner";

export type TAcademicDepartmentTableData = Pick<
  TAcademicDepartment,
  "_id" | "name" | "academicFaculty"
>;

export default function AcademicDepartment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState<TAcademicDepartmentTableData>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [params, setParams] = useState<TQueryParams[]>([]);
  const {
    useGetAllAcademicDepartmentQuery,
    useDeleteAcademicDepartmentMutation,
  } = academicManagementHooks;
  const [deleteAcademicDepartment] = useDeleteAcademicDepartmentMutation();
  const { data: academicDepartmentData, isFetching } =
    useGetAllAcademicDepartmentQuery(params);
  const tableData = academicDepartmentData?.data?.map(
    (department: TAcademicDepartment) => ({
      key: department._id,
      _id: department._id,
      name: department.name,
      academicFaculty: department.academicFaculty.name,
    })
  );

  const showAddModal = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting Academic Department....");
    try {
      const res = await deleteAcademicDepartment(id);
      if (res.data) {
        toast.success("Academic Department Deleted Successfully", {
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

  const columns: TableColumnsType<TAcademicDepartmentTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      onCell: () => ({
        style: {
          fontSize: "1rem",
          fontWeight: "bold",
        },
      }),
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
      showSorterTooltip: { target: "full-header" },
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
        const showEditModal = (record: TAcademicDepartmentTableData) => () => {
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
  const onChange: TableProps<TAcademicDepartmentTableData>["onChange"] = (
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
      <h1 className="text-center mb-5 text-xl font-bold">
        Academic Departments
      </h1>
      <div className="flex justify-end mb-5">
        <Button onClick={showAddModal} type="primary">
          Add Academic Department
        </Button>
      </div>
      <Table<TAcademicDepartmentTableData>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        style={{ overflow: "scroll" }}
      />
      {isModalOpen ? (
        <CreateAcademicDepartmentModal
          showModal={true}
          setIsModalOpen={setIsModalOpen}
        ></CreateAcademicDepartmentModal>
      ) : (
        ""
      )}
      {isEditModalOpen && record ? (
        <EditAcademicDepartmentModal
          record={record}
          showModal={true}
          setIsModalOpen={setIsEditModalOpen}
        ></EditAcademicDepartmentModal>
      ) : (
        ""
      )}
    </div>
  );
}
