/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Col, Row } from "antd";
import { toast } from "sonner";
import { studentCourseApi } from "../../redux/features/student/studentCourseManagementApi";
import { apiResponseHandler } from "../../utilities/errorHandler";

type TCourse = {
  [index: string]: any;
};
const OfferedCourse = () => {
  const { data: offeredCourseData } =
    studentCourseApi.useGetAllOfferedCoursesQuery(undefined);
  const [enrolCourseMutation] = studentCourseApi.useEnrolCourseMutation();
  console.log(offeredCourseData);
  const singleObject = offeredCourseData?.data?.reduce((acc: TCourse, item) => {
    const key = item?.course?.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      _id: item?._id,
      section: item?.section,
      startTime: item?.startTime,
      endTime: item?.endTime,
      days: item?.days,
    });
    return acc;
  }, {});
  const modifiedData = Object.values(singleObject ? singleObject : {});
  const handleEnroll = async (courseId: string) => {
    const toastId = toast.loading("Enrolling course...");
    try {
      const result = await enrolCourseMutation({ offeredCourse: courseId });
      // show toast message
      apiResponseHandler(result as any, { toastId });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  if (!modifiedData.length) {
    return <p style={{textAlign:"center"}}>&lt;-- No available offered course --&gt;</p>
  }
  return (
    <>
      <h1>Offered Course List</h1>
      <Row gutter={[0, 20]}>
        {modifiedData.map((item) => {
          return (
            <Col span={24} style={{ borderTop: "solid #d4d4d4 2px" }}>
              <div style={{ padding: "10px" }}>
                <h2>{item?.courseTitle}</h2>
              </div>
              {item.sections?.map((section: Record<string, any>) => {
                return (
                  <Row
                    justify={"space-between"}
                    align={"middle"}
                    style={{ borderTop: "solid #d4d4d4 2px" }}
                  >
                    <Col span={5}>Section: {section?.section}</Col>
                    <Col span={5}>
                      Days:{" "}
                      {section?.days?.map((day: string) => (
                        <span>{day}</span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section?.startTime}</Col>
                    <Col span={5}>End Time: {section?.endTime}</Col>
                    <Button onClick={() => handleEnroll(section._id)}>
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default OfferedCourse;
