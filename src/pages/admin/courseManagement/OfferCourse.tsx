import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import PHSelect from "@/components/form/PHSelect";
import { useGetAllFacultiesQuery } from "@/redux/features/admin/User Management/userManagement.api";
import { Button, Col, Flex } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

export default function OfferCourse() {
  const [id, setId] = useState("");
  const { data: academicFacultyData } = useGetAllFacultiesQuery(undefined);

  const academicFacultyOptions = academicFacultyData?.data?.map((faculty) => ({
    value: faculty._id,
    label: faculty.name.firstName,
  }));
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
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
          <PHSelect
            onValueChange={setId}
            label="Select Semester"
            name="academicSemester"
            options={academicFacultyOptions}
            watch={true}
          />
          <PHInput disabled={!id} name="test" label="test" type="text" />
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
