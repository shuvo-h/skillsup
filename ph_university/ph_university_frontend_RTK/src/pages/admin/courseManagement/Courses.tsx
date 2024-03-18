/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Table } from "antd";
import { courseManagementAPI } from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import { FieldValues } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import { userManagementAPI } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { apiResponseHandler } from "../../../utilities/errorHandler";





const Courses = () => {
    const {data:courses,isFetching,isLoading} = courseManagementAPI.useGetAllCoursesQuery(undefined)
    const tableData = courses?.data?.map(
        ({ _id, title, prefix, code }:{ _id:string, title:string, prefix:string, code:number }) => ({
            _id,
          key: _id,
          title,
          code : `${prefix}-${code}`
        })
      );

      const columns = [
        {
          title: "Title",
          dataIndex: "title",
        },
        {
          title: "Code",
          dataIndex: "code"
        },
        {
            title: "Action",
            dataIndex: "action",
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render: (_cellData:any,rowData:any) => {
              
              return (<AddFacultyModal facultyInfo={rowData} />);
            },
          },
        
      ];

      
    return (
        <div>
            Courses
            <Table
                columns={columns}
                dataSource={tableData}
                // onChange={onChange} 
                loading={isLoading || isFetching}
            />
        </div>
    );
};

const AddFacultyModal = ({facultyInfo}:any) =>{
    const {data:facultiesData} = userManagementAPI.useGetAllFacultiesQuery(undefined);
    
    const [addFacultiesMutation] = courseManagementAPI.useAddFacultiesMutation();
    const [isModalOpen,setIsModalOpen] = useState(false);

    const facultiesOptions = facultiesData?.data?.map(item=>({
        value: item._id,
        label: item.fullName,
    }))
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
        
        const toastId = toast.info("Adding faculties into course...", {
            duration: 2000,
          });
      
          try {
            const facultyData = {
              data,
              courseId: facultyInfo._id
            };
            console.log(facultyData);
            
            const result = await addFacultiesMutation(facultyData);
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
                    <PHSelect 
                        options={facultiesOptions} 
                        name="faculties"
                        label="Faculties"
                        mode="multiple"
                    />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Modal>
        </>
    )
}

export default Courses;