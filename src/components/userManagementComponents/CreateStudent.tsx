import React, { useState } from "react";
import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import PHSelect from "@/components/form/PHSelect";
import { Button, Col, Divider, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  bloodGroupOptions,
  genderOptions,
} from "../../constants/userManagementConstants";
import { academicManagementHooks } from "@/hooks/academicManagementHooks";
import SkeletonInput from "antd/es/skeleton/Input";
import PHDatePicker from "@/components/form/PHDatePicker";
import { useAddStudentMutation } from "@/redux/features/admin/User Management/userManagement.api";
import { toast } from "sonner";
import PHDragger from "@/components/form/PHDragger";

const steps = [
  "Personal Info",
  "Contact Info",
  "Guardian Info",
  "Local Guardian Info",
  "Academic Info",
];

export default function CreateStudent({
  setIsModalOpen,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [addStudent] = useAddStudentMutation();
  const { useGetAllSemestersQuery, useGetAllAcademicDepartmentQuery } =
    academicManagementHooks;
  const { data: semesterData, isFetching: sIsFetching } =
    useGetAllSemestersQuery(undefined);
  const academicSemesterOptions = semesterData?.data?.map(
    (semester: { _id: string; name: string; year: number }) => ({
      value: semester._id,
      label: `${semester.name} ${semester.year}`,
    })
  );
  const { data: academicDepartmentData, isFetching: dIsFetching } =
    useGetAllAcademicDepartmentQuery();
  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (department: { _id: string; name: string }) => ({
      label: department.name,
      value: department._id,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Adding Student....");
    const studentData = {
      password: "student123",
      student: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image.originFileObj);
    try {
      const res = await addStudent(formData);
      if (res.data) {
        toast.success("Student Added Successfully", { id: toastId });
        setIsModalOpen(false);
      } else {
        toast.dismiss(toastId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PHForm onSubmit={onSubmit}>
      <Row>
        <Col span={24}>
          {currentStep === 0 && (
            <>
              <Divider>Personal Info</Divider>
              <PHInput name="name.firstName" label="First Name" type="text" />
              <PHInput name="name.middleName" label="Middle Name" type="text" />
              <PHInput name="name.lastName" label="Last Name" type="text" />
              <PHSelect name="gender" label="Gender" options={genderOptions} />
              <PHDatePicker name="dateOfBirth" label="Date of Birth" />
              <PHSelect
                name="bloodGroup"
                label="Blood Group"
                options={bloodGroupOptions}
              />
              <PHDragger name="image" label="Profile Image" />
            </>
          )}

          {currentStep === 1 && (
            <>
              <Divider>Contact Info</Divider>
              <PHInput name="email" label="Email" type="email" />
              <PHInput name="contactNo" label="Contact No." type="text" />
              <PHInput
                name="emergencyContactNo"
                label="Emergency Contact No."
                type="text"
              />
              <PHInput
                name="presentAddress"
                label="Present Address"
                type="text"
              />
              <PHInput
                name="permanentAddress"
                label="Permanent Address"
                type="text"
              />
            </>
          )}

          {currentStep === 2 && (
            <>
              <Divider>Guardian Info</Divider>
              <PHInput
                name="guardian.fatherName"
                label="Father Name"
                type="text"
              />
              <PHInput
                name="guardian.fatherOccupation"
                label="Father Occupation"
                type="text"
              />
              <PHInput
                name="guardian.fatherContactNo"
                label="Father Contact No."
                type="text"
              />
              <PHInput
                name="guardian.motherName"
                label="Mother Name"
                type="text"
              />
              <PHInput
                name="guardian.motherOccupation"
                label="Mother Occupation"
                type="text"
              />
              <PHInput
                name="guardian.motherContactNo"
                label="Mother Contact No."
                type="text"
              />
            </>
          )}

          {currentStep === 3 && (
            <>
              <Divider>Local Guardian Info</Divider>
              <PHInput name="localGuardian.name" label="Name" type="text" />
              <PHInput
                name="localGuardian.occupation"
                label="Occupation"
                type="text"
              />
              <PHInput
                name="localGuardian.contactNo"
                label="Contact No."
                type="text"
              />
              <PHInput
                name="localGuardian.address"
                label="Address"
                type="text"
              />
            </>
          )}

          {currentStep === 4 && (
            <>
              <Divider>Academic Info</Divider>
              {sIsFetching ? (
                <SkeletonInput active size="large" />
              ) : (
                <PHSelect
                  name="admissionSemester"
                  label="Admission Semester"
                  options={academicSemesterOptions}
                />
              )}
              {dIsFetching ? (
                <SkeletonInput active size="large" />
              ) : (
                <PHSelect
                  name="academicDepartment"
                  label="Admission Department"
                  options={academicDepartmentOptions}
                />
              )}
            </>
          )}
        </Col>
      </Row>
      <div className="flex justify-center gap-2">
        {currentStep > 0 && (
          <Button type="primary" onClick={handlePrevious}>
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        )}
        <Button onClick={handleCancel} type="primary" danger>
          Cancel
        </Button>
      </div>
    </PHForm>
  );
}
