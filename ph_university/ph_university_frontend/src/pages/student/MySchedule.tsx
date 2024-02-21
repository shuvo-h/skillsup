/* eslint-disable @typescript-eslint/no-explicit-any */

import { studentCourseApi } from '../../redux/features/student/studentCourseManagementApi';

const MySchedule = () => {
    const {data} = studentCourseApi.useGetAllEnrolledCoursesQuery(undefined)
    console.log(data);
    
    return (
        <div>
            MySchedule
            <div>
                {
                    data?.data?.map((item:any)=>{
                        return <div>
                            <div>{item?.course?.title}</div>
                            <div>{item?.offeredCourse?.section}</div>
                            <div>{item?.offeredCourse?.days?.map((day:string)=><span> {day} </span>)}</div>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default MySchedule;