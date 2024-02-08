import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues } from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import { academicSemesterApi } from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";

const OfferCourse = () => {
    const [facultyId,setFacultyId] = useState('');
    const {data:academicFaculties} = academicSemesterApi.useGetAcademicFacultiesQuery(undefined);
    const academicFacultiesOptions = academicFaculties?.data?.map(item=>({
        value: item._id,
        label: `${item.name}`,
      }))
      console.log({facultyId});
      
    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        
        /*
        const toastId = toast.info("Creating academic semester..", {
          duration: 2000,
        });
        try {
          
          const semesterData = {
            ...data,
            minCredit: Number(data.minCredit),
            maxCredit: Number(data.maxCredit),
          };
          console.log(semesterData);
          
          
          const result = await addRegisterSemesterMutation(semesterData);
          // show toast message
          apiResponseHandler(result as any, { toastId });
          
        } catch (error: any) {
          console.log(error);
          toast.error(error.message, { duration: 2000, id: toastId });
        }
        */
      };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelectWithWatch
            label="Academic Semester"
            name="academicSemester"
            options={academicFacultiesOptions}
            onValueChange={setFacultyId}
          />
          <PHInput
            label="Test"
            name="test"
            disabled={!facultyId}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
