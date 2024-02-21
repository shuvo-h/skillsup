import { FieldValues } from "react-hook-form";
import { facultyCourseApi } from "../../redux/features/faculty/facultyCourses.api";
import PHForm from "../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../components/form/PHSelect";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
    const navigate = useNavigate();
  const { data:facultyCoursesData } = facultyCourseApi.useGetAllFacultyCoursesQuery(undefined);
    console.log(facultyCoursesData);
    const semesterOptions = facultyCoursesData?.data?.map(item=>({
        label: `${item.academicSemester?.name}-${item.academicSemester?.year}`,
        value: item.semesterRegistration?._id,
    }))
    
    const courseOptions = facultyCoursesData?.data?.map(item=>({
        label: item.course?.title,
        value: item.course?._id,
    }))

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    // delete this when backend API is ready
    if (!data.semesterRegistration) {
        data = {
            semesterRegistration:'sample-id-123',
            course:'sample-course-id-123',
        }
    }
    navigate(`/faculty/courses/${data?.semesterRegistration}/${data?.course}`)
    /*
        const toastId = toast.loading("changing password");
        try {
          console.log(data);
    
          const response = await changePasswordMutation(data).unwrap(); // unwrap means only return the response data, not all a=object
          if (!response?.data?.success) {
            dispatch(logout());
          }
          toast.success("password changed successfull", {
            id: toastId,
            duration: 2000,
          });
          console.log(response);
    
          navigate(`/login`);
        } catch (error: any) {
          console.log(error);
          toast.error(error?.data?.message || "something went wrong", {
            id: toastId,
            duration: 2000,
          });
        }
        */
  };

  return (
    <div>
      MyCourses
      <div>
        <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
        //   resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect 
                name="semesterRegistration" 
                label="Semester" 
                options={semesterOptions} 
            />
          <PHSelect 
                name="course" 
                label="Course" 
                options={courseOptions} 
            />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
      </div>
    </div>
  );
};

export default MyCourses;
