/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Col, Flex } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import {  semesterStatusOptions } from "../../../constants/semester";
import { academicSemesterApi } from "../../../redux/features/admin/academicManagement.api";

import PHInput from "../../../components/form/PHInput";
import { courseManagementAPI } from "../../../redux/features/admin/courseManagement.api";
import { apiResponseHandler } from "../../../utilities/errorHandler";
import PHDatePiker from "../../../components/form/PHDatePiker";

const SemesterRegistration = () => {
  const [addRegisterSemesterMutation] = courseManagementAPI.useAddRegisterSemestersMutation()
  const {data:academicSemesters} = academicSemesterApi.useGetAllSemestersQuery([
    {name:'sort',value:"year"},
  ]);
  console.log({academicSemesters});
  const academicSemesterOptions = academicSemesters?.data?.map(item=>({
    value: item._id,
    label: `${item.name}-${item.year}`,
  }))

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    
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
  };

  

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
        >
          <PHSelect label="Academic Semester" name="academicSemester" options={academicSemesterOptions} />
          <PHSelect
            label="Status"
            name="status"
            options={semesterStatusOptions}
          />
          <PHDatePiker
            label="Start Month"
            name="startDate"
          />
          <PHDatePiker label="End Month" name="endDate"  />
          <PHInput label="Min Credit" name="minCredit"  />
          <PHInput label="Max Credit" name="maxCredit"  />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
