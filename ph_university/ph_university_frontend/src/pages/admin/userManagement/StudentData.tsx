import type { TableColumnsType, TableProps } from "antd";
import { Pagination, Space, Table } from "antd";
import { useState } from "react";
import { TQueryParams, TStudent } from "../../../types";
import { userManagementAPI } from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";

type TTableDataType = Pick<  TStudent,  "_id" |"fullName" | "id" | "email" | "contactNo">;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState<number>(1);
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = userManagementAPI.useGetAllStudentsQuery([
    {name:"limit",value:5},
    {name:"page",value: page},
    {name:"sort",value:'id'},
    ...params
    ]);

  const tableData = studentData?.data?.map(
    ({ _id,id, fullName,email,contactNo  }) => ({
        _id,
      key: _id,
      id,
      fullName,
      email,
      contactNo,
    })
  );

  const columns: TableColumnsType<TTableDataType> = [
    {
      title: "Name",
      dataIndex: "fullName",
    },
    
    {
      title: "Role Number",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      dataIndex: "action",
      width:"1%",
      render: (_item,record) => {
        return (
          <Space>
            <Link to={`/admin/student-data/${record?._id}`}>
                <button>Details</button>
            </Link>
            <button>Update</button>
            <button>Block</button>
          </Space>
        );
      },
    },
  ];

  const onChange: TableProps<TTableDataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];
      filters.name?.forEach((item) => {
        queryParams.push({ name: "name", value: item });
      });
      filters.year?.forEach((item) => {
        queryParams.push({ name: "year", value: item });
      });
      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        loading={isLoading || isFetching}
        pagination={false}
      />
      <Pagination 
        total={studentData?.meta?.total}
        pageSize={studentData?.meta?.limit}
        current={page}
        onChange={(pageNumber)=>setPage(pageNumber)}
      />
    </>
  );
};

export default StudentData;
