/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from 'react';
import { useParams } from 'react-router-dom';
import { facultyCourseApi } from '../../redux/features/faculty/facultyCourses.api';
import { Button, Modal, Table } from 'antd';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import PHForm from '../../components/form/PHForm';
import PHInput from '../../components/form/PHInput';
import { apiResponseHandler } from '../../utilities/errorHandler';

const MyStudents = () => {
    const {registerSemesterId,courseId} = useParams()
    console.log({registerSemesterId,courseId});
    const {data:facultyCoursesData} = facultyCourseApi.useGetAllFacultyCoursesQuery([
        {name:'semesterRegistration',value: registerSemesterId},
        {name:'course',value: courseId},
    ]);
    const tableData = facultyCoursesData?.data?.map(
        ({ _id, student, semesterRegistration,offeredCourse }:any) => ({
            _id,
            semesterRegistration: semesterRegistration?._id,
            student: student?._id,
            offeredCourse: offeredCourse?._id,
          key: _id,
          name: student.fullName,
          role: student.id,
        })
      );
    const columns = [
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Roll",
          dataIndex: "role",
        },
        {
          title: "Action",
          dataIndex: "action",
          render: (_cellData:any,rowData:any) => {
            return (
              <>
                <AddMarksModal studentInfo={rowData} />
              </>
            );
          },
        },
      ];
    return (
        <div>
            MyStudents
            <div>
            <Table
                columns={columns}
                dataSource={tableData}
                // onChange={onChange}
                // loading={isLoading || isFetching}
            />
            </div>
        </div>
    );
};


const AddMarksModal = ({studentInfo}:any) =>{
    const [isModalOpen,setIsModalOpen] = useState(false);
   const [addMarksMutation] = facultyCourseApi.useAddMarksMutation();
   
    const showModal = () =>{
        setIsModalOpen(true);
    }
    const handleOk = () =>{
        setIsModalOpen(false);
    }
    const handleCancel = () =>{
        setIsModalOpen(false);
    }
    const handleSubmit = async(data:FieldValues) =>{
        console.log(data);
        
        const toastId = toast.info("Adding marks...", {
            duration: 2000,
          });
          
          try {
            const marksData = {
                semesterRegistration: studentInfo.semesterRegistration,
                offeredCourse: studentInfo.offeredCourse,
                student:studentInfo.student,
                courseMarks:{
                    classTest1: Number(data.classTest1),
                    midTerm: Number(data.midTerm),
                    classTest2: Number(data.classTest2),
                    finalTerm: Number(data.finalTerm),
                },
            };
            console.log(marksData);
            
            const result = await addMarksMutation(marksData);
            // show toast message
            apiResponseHandler(result as any, { toastId });
            handleOk()
          } catch (error: any) {
            console.log(error);
            toast.error(error.message, { duration: 2000, id: toastId });
          }
            
    }
    return (
        <>
            <Button onClick={showModal} >Add Faculty</Button>
            <Modal 
                title='assign faculty'
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
            >
                <PHForm onSubmit={handleSubmit}>
                    <PHInput
                        name="classTest1"
                        label="Class Test 1"
                    />
                    <PHInput
                        name="classTest2"
                        label="Class Test 2"
                    />
                    <PHInput
                        name="midTerm"
                        label="Mid Term"
                    />
                    <PHInput
                        name="finalTerm"
                        label="Final Term"
                    />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Modal>
        </>
    )
}



export default MyStudents;


