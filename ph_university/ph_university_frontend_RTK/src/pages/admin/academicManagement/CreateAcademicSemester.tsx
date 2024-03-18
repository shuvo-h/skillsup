/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions } from "../../../constants/global";
import { semesterOptions } from "../../../constants/semester";
import { academicSemesterApi } from "../../../redux/features/admin/academicManagement.api";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { TRes, apiResponseHandler } from "../../../utilities/errorHandler";

const CreateAcademicSemester = () => {
  const [addAcademicSemesterMutation, { data, error, isLoading }] =
    academicSemesterApi.useAddAcademicSemestersMutation();
  console.log({ data, error, isLoading });

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.info("Creating academic semester..", {
      duration: 2000,
    });
    try {
      const name = semesterOptions[Number(data.name) - 1].label;
      const semesterData = {
        name,
        code: data.name,
        year: data.year,
        startMonth: data.startMonth,
        endMonth: data.endMonth,
      };

      const result = await addAcademicSemesterMutation(semesterData);
      const formattedResult = apiResponseHandler(result as TRes, { toastId });
      console.log(formattedResult);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message, { duration: 2000, id: toastId });
    }
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
    value: String(currentYear + number),
    label: String(currentYear + number),
  }));

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect label="Name" name="name" options={semesterOptions} />
          <PHSelect label="Year" name="year" options={yearOptions} />
          <PHSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect label="End Month" name="endMonth" options={monthOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
