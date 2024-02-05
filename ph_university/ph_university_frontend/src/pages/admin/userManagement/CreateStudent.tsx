import {  FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodOptions, genderOptions } from "../../../constants/global";
import PHDatePiker from "../../../components/form/PHDatePiker";
import { academicSemesterApi } from "../../../redux/features/admin/academicManagement.api";
import { userManagementAPI } from "../../../redux/features/admin/userManagement.api";
import PHFileInput from "../../../components/form/PHFileInput";


// only for development purpuse
const studentDefaultValue = {
    name: {
        firstName: "Arman",
        middleName: "Abhel",
        lastName: "Dole"
    },
    gender: "male",
    // dateOfBirth: "2000-01-01",
    bloodGroup: "A+",

    email: "student04@example.com",
    contactNo: "1234567894",
    emergencyContactNo: "9876543210",
    presentAddress: "Current Address",
    permanentAddress: "Permanent Address",
    
    guardian: {
        fatherName: "John Doe Sr.",
        fatherOccupation: "Engineer",
        fatherContactNo: "1111111111",
        motherName: "Jane Doe",
        motherOccupation: "Doctor",
        motherContactNo: "2222222222"
    },
    localGuardian: {
        name: "Local Guardian",
        occupation: "Business",
        contactNo: "3333333333",
        address: "Local Guardian Address"
    },

    admissionSemester: "",
    academicDepartment: ""
}
const CreateStudent = () => {
    const [addStudentMutation, {data,error}] = userManagementAPI.useAddStudentMutation();
    console.log({data,error});
    
    const {data:sData,isLoading:sIsLoading} = academicSemesterApi.useGetAllSemestersQuery(undefined);
    const {data:dData,isLoading:dIsLoading} = academicSemesterApi.useGetAcademicDepartmentsQuery(undefined,{skip:sIsLoading}); // department API will be called when semester quary loading stopped/finished to false
    
    
    const semesterOptions = sData?.data?.map(item=>({
        value: item._id,
        label: `${item.name}- ${item.year}`
    }))
    const departmentOptions  = dData?.data?.map(item=>({
        value: item._id,
        label: `${item.name}`
    }))
    
    
    const onSubmit:SubmitHandler<FieldValues> = async(data:FieldValues) =>{
        try {
            const studentData = {
                password: "student123",
                student: data,
            }
            const formData = new FormData();
            formData.append('data',JSON.stringify(studentData))
            formData.append('profile_img',data.profile_img)
            
            await addStudentMutation(formData);
            
        } catch (error) {
            console.log(error);
            
        }
        
    }

    return (
        <Row>
            <Col span={24}>
                <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValue}>
                    <Divider>Personal Info</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{span:12}} lg={{span:8}} >
                            <PHInput 
                                name="name.firstName"
                                label="First Name"
                                type="text"
                            />
                        </Col>
                        <Col span={24} md={{span:12}} lg={{span:8}}>
                            <PHInput 
                                name="name.middleName"
                                label="Middle Name"
                                type="text"
                            />
                        </Col>
                        <Col span={24} md={{span:12}} lg={{span:8}}>
                            <PHInput 
                                name="name.lastName"
                                label="Last Name"
                                type="text"
                            />
                        </Col>
                        <Col span={24} md={{span:12}} lg={{span:8}}>
                            <PHSelect 
                                name="gender"
                                label="Gender"
                                options={genderOptions}
                            />
                        </Col>
                        <Col span={24} md={{span:12}} lg={{span:8}}>
                            <PHDatePiker
                                name="dateOfBirth"
                                label="Date of Birth"
                            />
                        </Col>
                        <Col span={24} md={{span:12}} lg={{span:8}}>
                            <PHSelect 
                                name="bloodGroup"
                                label="Blood Group"
                                options={bloodOptions}
                            />
                        </Col>
                        <Col span={24} md={{span:12}} lg={{span:8}}>
                            <PHFileInput 
                                name="profile_img"
                                label='Picture'
                                accept="image/png, image/jpeg"
                            />
                        </Col>
                    </Row>

                    <Divider>Contact Info</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{span:12}} lg={{span:8}} >
                            <PHInput 
                                name="email"
                                label="Email"
                                type="text"
                            />
                        </Col>
                        <Col span={24} md={{span:12}} lg={{span:8}}>
                            <PHInput 
                                name="contactNo"
                                label="Contact No"
                                type="text"
                            />
                        </Col>
                        <Col span={24} md={{span:12}} lg={{span:8}}>
                            <PHInput 
                                name="emergencyContactNo"
                                label="Emergency Contact No"
                                type="text"
                            />
                        </Col>
                        <Col span={24} md={{span:12}} lg={{span:8}}>
                            <PHInput 
                                name="presentAddress"
                                label="Present's Address"
                                type="text"
                            />
                        </Col>
                        <Col span={24} md={{span:12}} lg={{span:8}}>
                            <PHInput 
                                name="permanentAddress"
                                label="Permanent Address"
                                type="text"
                            />
                        </Col>
                    </Row>

                    <Divider>Guardian Info</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{span:12}} lg={{span:8}} >
                            <PHInput 
                                name="guardian.fatherName"
                                label="Guardian's Father's Name"
                                type="text"
                            />
                        </Col>
                        <Col span={24} md={{span:12}} lg={{span:8}} >
                            <PHInput 
                                name="guardian.fatherOccupation"
                                label="Guardian's Father's Occupation"
                                type="text"
                            />
                        </Col>
                        <Col span={24} md={{span:12}} lg={{span:8}} >
                            <PHInput 
                                name="guardian.fatherContactNo"
                                label="Guardian's Father's ContactNo"
                                type="text"
                            />
                        </Col>
                        <Col span={24} md={{span:12}} lg={{span:8}} >
                            <PHInput 
                                name="guardian.motherName"
                                label="Guardian's Mother's Name"
                                type="text"
                            />
                        </Col>
                        <Col span={24} md={{span:12}} lg={{span:8}} >
                            <PHInput 
                                name="guardian.motherOccupation"
                                label="Guardian's Mother's Occupation"
                                type="text"
                            />
                        </Col>
                        <Col span={24} md={{span:12}} lg={{span:8}} >
                            <PHInput 
                                name="guardian.motherContactNo"
                                label="Guardian's Mother's ContactNo"
                                type="text"
                            />
                        </Col>
                        <Col span={24} md={{span:12}} lg={{span:8}} >
                            <PHInput 
                                name="localGuardian.name"
                                label="LocalGuardian's Name"
                                type="text"
                            />
                        </Col>
                        <Col span={24} md={{span:12}} lg={{span:8}} >
                            <PHInput 
                                name="localGuardian.occupation"
                                label="Local Guardian's Occupation"
                                type="text"
                                />
                        </Col>
                        <Col span={24} md={{span:12}} lg={{span:8}} >
                            <PHInput 
                                name="localGuardian.contactNo"
                                label="Local Guardian's contactNo"
                                type="text"
                            />
                        </Col>
                        <Col span={24} md={{span:12}} lg={{span:8}} >
                            <PHInput 
                                name="localGuardian.address"
                                label="Local Guardian's address"
                                type="text"
                            />
                        </Col>
                    </Row>

                    <Divider>Semester Info</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{span:12}} lg={{span:8}} >
                            <PHSelect 
                                name="admissionSemester"
                                label="Admission Semester"
                                options={semesterOptions}
                                disabled={sIsLoading}
                            />
                        </Col>
                        <Col span={24} md={{span:12}} lg={{span:8}} >
                            <PHSelect 
                                name="academicDepartment"
                                label="Academic Department"
                                options={departmentOptions}
                                disabled={dIsLoading}
                            />
                        </Col>
                    </Row>
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Row>
    );
};

export default CreateStudent;