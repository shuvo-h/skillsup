/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Col, Flex } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";

import PHInput from "../../../components/form/PHInput";
import { courseManagementAPI } from "../../../redux/features/admin/courseManagement.api";
import { apiResponseHandler } from "../../../utilities/errorHandler";

const CreateCourse = () => {
  const [addCourseMutation] = courseManagementAPI.useAddCourseMutation();
  const { data: courses } = courseManagementAPI.useGetAllCoursesQuery([
    { name: "sort", value: "title" },
  ]);
  const preRequisiteCoursesOptions = courses?.data?.map((item:Record<string,string>) => ({
    value: item._id,
    label: `${item.title}`,
  }));

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.info("Creating academic semester..", {
      duration: 2000,
    });

    try {
      const courseData = {
        ...data,
        isDeleted: false,
        code: Number(data.code),
        credits: Number(data.credits),
        preRequisiteCourses: data.preRequisiteCourses?.map((item: string) => ({
          course: item,
          isDeleted: false,
        })),
      };

      const result = await addCourseMutation(courseData);
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
          <PHInput label="Title" name="title" />
          <PHInput label="Prefix" name="prefix" />
          <PHInput label="Code" name="code" />
          <PHInput label="Credits" name="credits" />
          <PHSelect
            name="preRequisiteCourses"
            label="Pre Requisite Courses"
            options={preRequisiteCoursesOptions}
            mode="multiple"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
