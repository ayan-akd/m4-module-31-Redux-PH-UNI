/* eslint-disable @typescript-eslint/no-explicit-any */
import { TResponse, TSemester } from "@/types";
import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import { useState } from "react";
import CreateAcademicSemesterModal from "@/components/modal/CreateAcademicSemesterModal";
import { alertModal } from "@/components/modal/alertModal";
import { toast } from "sonner";
import { academicManagementHooks } from "@/hooks/academicManagementHooks";
import {
  useGetAllRegisteredSemesterQuery,
  useUpdateRegisterSemesterMutation,
} from "@/redux/features/admin/Course Management/courseManagement.api";
import moment from "moment";

type TSemesterTableData = Pick<TSemester, "startDate" | "endDate" | "status">;

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];
export default function RegisteredSemesters() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [semesterId, setSemesterId] = useState("");
  const { useDeleteAcademicSemesterMutation } = academicManagementHooks;
  const { data: semesterData, isFetching } =
    useGetAllRegisteredSemesterQuery(undefined);
  const [updateSemesterStatus] = useUpdateRegisterSemesterMutation();
  const [deleteAcademicSemester] = useDeleteAcademicSemesterMutation();

  const tableData = semesterData?.data?.map((semester: TSemester) => ({
    key: semester._id,
    name: `${semester?.academicSemester?.name} ${semester?.academicSemester?.year}`,
    startDate: moment(new Date(semester.startDate)).format("Do MMMM, YYYY"),
    endDate: moment(new Date(semester.endDate)).format("Do MMMM, YYYY"),
    status: semester.status,
  }));

  const handleStatusUpdate = async (value: any) => {
    const toastId = toast.loading("Updating Semester Status....");
    const updateData = {
      id: semesterId,
      data: {
        status: value.key,
      },
    };
    try {
      const res = await updateSemesterStatus(updateData) as TResponse<any>;
      if (res.data) {
        toast.success("Semester Status Updated Successfully", {
          id: toastId,
        });
      }
      if (res.error) {
        toast.error(res.error.data.message, {
          id: toastId,
        });
      }
    } catch (err) {
      toast.error("Something went wrong", {
        id: toastId,
      });
      console.log(err);
    }
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

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
      render: (record) => {
        let color;
        if (record === "UPCOMING") {
          color = "blue";
        } else if (record === "ONGOING") {
          color = "green";
        } else {
          color = "red";
        }

        return <Tag color={color}>{record}</Tag>;
      },
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
        return (
          <div className="flex gap-2">
            <Dropdown menu={menuProps} trigger={["click"]}>
              <Button type="primary" onClick={() => setSemesterId(record.key)}>
                Update
              </Button>
            </Dropdown>
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
    </div>
  );
}
