import PHForm from "@/components/form/PHForm";
import PHSelect from "@/components/form/PHSelect";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/admin/Course Management/courseManagement.api";
import { TResponse } from "@/types";
import { toast } from "sonner";
import SkeletonInput from "antd/es/skeleton/Input";
import PHInput from "@/components/form/PHInput";

export default function CreateCourse() {
  const [addCourse] = useAddCourseMutation();
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const coursesOption = courses?.data?.map((course) => ({
    value: course._id,
    label: `${course.title}`,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Registering Semester....");
    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data?.preRequisiteCourses
        ? data?.preRequisiteCourses?.map((item: string) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = (await addCourse(courseData)) as TResponse<any>;
      console.log(res);
      if (res.data) {
        toast.success("Academic Semester Created Successfully", {
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

  return (
    <Flex align="center" justify="center">
      <Col span={8}>
        <h1 className="text-center font-bold mb-5 text-xl">
          Semester Registration
        </h1>
        <PHForm
          onSubmit={onSubmit}
          //   resolver={zodResolver(semesterRegistrationSchema)}
        >
          <PHInput label="Title" name="title" type="text" />
          <PHInput label="Prefix" name="prefix" type="text" />
          <PHInput label="Code" name="code" type="number" />
          <PHInput label="Credit" name="credits" type="number" />
          {isFetching ? (
            <SkeletonInput active size="large" />
          ) : (
            <PHSelect
              mode="multiple"
              label="Prerequisite Courses"
              name="preRequisiteCourses"
              options={coursesOption}
            />
          )}
          <div className="flex justify-center gap-2">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </PHForm>
      </Col>
    </Flex>
  );
}
