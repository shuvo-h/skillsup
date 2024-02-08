/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TableColumnsType } from "antd";
import { Dropdown, Table, Tag } from "antd";
import { courseManagementAPI } from "../../../redux/features/admin/courseManagement.api";
import moment from 'moment';
import { TSemester } from "../../../types";
import { useState } from "react";
import { apiResponseHandler } from "../../../utilities/errorHandler";

const statusItems = [
    {
        label: "Upcomming",
        key: "UPCOMMING",
    },
    {
        label: "Ongoing",
        key: "ONGOING",
    },
    {
        label: "Ended",
        key: "ENDED",
    },
]
type TTableDataType = Pick<
  TSemester,
   '_id'|"startDate" | "endDate" | "status"
>;



const RegisteredSemesters = () => {
//   const [params, setParams] = useState<TQueryParams[]>([]);
const [semesterId,setSemesterId] = useState('')
  const {data:semesterData,isLoading,isFetching} = courseManagementAPI.useGetAllRegisteredSemestersQuery(undefined)
  const [updateSemesterRegistrationMutation] = courseManagementAPI.useUpdateRegisterSemestersMutation();
  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
        _id,
      key: _id,
      name:`${academicSemester.name}-${academicSemester.year}`,
       startDate:moment(new Date(startDate)).format('MMMM'), 
       endDate:moment(new Date(endDate)).format('MMMM'), 
       status
    })
  );

  const handleStatusUpdate = async(data:any) =>{
      const updateData = {
          _id: semesterId,
          data:{status: data.key}
        }
    const result = await updateSemesterRegistrationMutation(updateData);
    apiResponseHandler(result as any)
  }

  const columns: TableColumnsType<TTableDataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render:(cellItem,_rowData) =>{
        let color = 'blue';
        cellItem === 'UPCOMMING'
        ? color = 'blue'
        : cellItem === 'ONGOING'
        ? color = 'green'
        : color = 'red'
        return <Tag style={{color}}>{cellItem}</Tag>
      }
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      dataIndex: "action",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (_cellData,rowData) => {
        
        return (
          <Dropdown 
            menu={{
                items: statusItems,
                onClick: handleStatusUpdate
            }}
            trigger={['click']}
            >
            <button onClick={()=>setSemesterId(rowData._id)}>Update</button>
          </Dropdown>
        );
      },
    },
  ];
/*
  const onChange: TableProps<TTableDataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];
      setParams(queryParams);
    }
  };
*/
console.log(semesterId);

  return (
    <div>
      AcademicSemester
      <Table
        columns={columns}
        dataSource={tableData}
        // onChange={onChange} 
        loading={isLoading || isFetching}
      />
    </div>
  );
};

export default RegisteredSemesters;
