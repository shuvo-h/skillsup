/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues } from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import { academicSemesterApi } from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import PHSelect from "../../../components/form/PHSelect";
import PHTimePicker from "../../../components/form/PHTimePicker";
import moment from "moment";
import { toast } from "sonner";
import { courseManagementAPI } from "../../../redux/features/admin/courseManagement.api";
import { weekDaysOptions } from "../../../constants/global";
import { apiResponseHandler } from "../../../utilities/errorHandler";

const OfferCourse = () => {
  const [addOfferedCourseMutation] = courseManagementAPI.useAddOfferedCourseMutation()
    const [courseId,setCourseId] = useState('');
   
    const {data:semesterRegistrationData} = courseManagementAPI.useGetAllRegisteredSemestersQuery([
      {name: "sort",value:"year"},
      {name: "status",value:"ONGOING"},
    ]);
    const {data:academicFacultyData} = academicSemesterApi.useGetAcademicFacultiesQuery(undefined);
    const {data:courseData} = courseManagementAPI.useGetAllCoursesQuery(undefined);
    const {data:facultiesData,isFetching:isFetchingFaculties} = courseManagementAPI.useGetCourseFacultiesQuery(courseId,{skip:!courseId});
    const {data:academicDepartmentData} = academicSemesterApi.useGetAcademicDepartmentsQuery(undefined);
    const academicFacultiesOptions = facultiesData?.data[0]?.faculties?.map((item:any)=>({
        value: item._id,
        label: `${item.fullName}`,
      }))
    const semesterRegistrationOptions = semesterRegistrationData?.data?.map(item=>({
        value: item._id,
        label: `${item.academicSemester.name}-${item.academicSemester.year}`,
      }))
      
      const academicFacultyOptions = academicFacultyData?.data?.map(item=>({
        value: item._id,
        label: item.name,
      }))
      const academicDepartmentOptions = academicDepartmentData?.data?.map(item=>({
        value: item._id,
        label: item.name,
      }))
      const courseOptions = courseData?.data?.map((item:any)=>({
        value: item._id,
        label: item.title,
      }))
      
    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        
        
        const toastId = toast.info("Creating academic semester..", {
          duration: 2000,
        });
        try {
          
          const offeredCourseData = {
            ...data,
            maxCapacity: Number(data.maxCapacity),
            section: Number(data.section),
            startTime: moment(new Date(data.startTime)).format('HH:mm'),
            endTime: moment(new Date(data.endTime)).format('HH:mm'),
          };
          
          
          const result = await addOfferedCourseMutation(offeredCourseData);
          // show toast message
          apiResponseHandler(result as any, { toastId });
          
          
        } catch (error: any) {
          console.log(error);
          toast.error(error.message, { duration: 2000, id: toastId });
        }
        
      };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          {/* <PHSelectWithWatch
            label="Academic Semester"
            name="academicSemester"
            options={academicFacultiesOptions}
            onValueChange={setFacultyId}
          /> */}
          <PHSelect 
            name="semesterRegistration"
            label="Semester Registration"
            options={semesterRegistrationOptions}
          />
          <PHSelect 
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultyOptions}
          />
          <PHSelect 
            name="academicDepartment"
            label="Academic Department"
            options={academicDepartmentOptions}
          />
          <PHSelectWithWatch 
            name="course"
            label="Course"
            options={courseOptions}
            onValueChange={setCourseId}
          />
          <PHSelect 
            name="faculty"
            label="Faculty"
            options={academicFacultiesOptions}
            disabled={!courseId || isFetchingFaculties}
          />
          <PHInput
            label="Section"
            name="section"
            type="number"
          />
          <PHInput
            label="Max Capacity"
            name="maxCapacity"
            type="number"
          />
          <PHSelect
            label="days"
            name="days"
            mode="multiple"
            options={weekDaysOptions}
          />
          <PHTimePicker
            label="startTime"
            name="startTime"
          />
          <PHTimePicker
            label="endTime"
            name="endTime"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
