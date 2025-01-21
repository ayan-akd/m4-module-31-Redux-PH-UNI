import { TQueryParams } from "@/types";
import { TAcademicSemester } from "@/types/academicManagement.type";
import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import CreateAcademicSemesterModal from "@/components/modal/CreateAcademicSemesterModal";
import EditAcademicSemesterModal from "@/components/modal/EditAcademicSemesterModal";
import { alertModal } from "@/components/modal/alertModal";
import { toast } from "sonner";
import { academicManagementHooks } from "@/hooks/academicManagementHooks";

export type TSemesterTableData = Pick<
  TAcademicSemester,
  "_id" | "name" | "year" | "startMonth" | "endMonth"
>;

export default function AcademicSemester() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState<TSemesterTableData>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [params, setParams] = useState<TQueryParams[]>([]);
  const { useGetAllSemestersQuery, useDeleteAcademicSemesterMutation } =
    academicManagementHooks;
  const { data: semesterData, isFetching } = useGetAllSemestersQuery(params);
  const [deleteAcademicSemester] = useDeleteAcademicSemesterMutation();

  const tableData = semesterData?.data?.map((semester: TAcademicSemester) => ({
    key: semester._id,
    _id: semester._id,
    name: semester.name,
    year: semester.year,
    startMonth: semester.startMonth,
    endMonth: semester.endMonth,
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
      filters: [
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
        {
          text: "2027",
          value: "2027",
        },
        {
          text: "2028",
          value: "2028",
        },
        {
          text: "2029",
          value: "2029",
        },
      ],
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
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

  const onChange: TableProps<TSemesterTableData>["onChange"] = (
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
        onChange={onChange}
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
