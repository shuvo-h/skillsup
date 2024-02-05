import type { TableColumnsType, TableProps } from "antd";
import { Table } from "antd";
import { useState } from "react";
import { academicSemesterApi } from "../../../redux/features/admin/academicManagement.api";
import { TQueryParams } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagement.type";

type TTableDataType = Pick<
  TAcademicSemester,
  "name" | "startMonth" | "endMonth" | "year"
>;

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = academicSemesterApi.useGetAllSemestersQuery(params);
  // console.log(semesterData);
  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      key: _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );

  const columns: TableColumnsType<TTableDataType> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      //   onFilter: (value: string, record) => record.name.indexOf(value) === 0,
      //   sorter: (a, b) => a.name.length - b.name.length,
      //   sortDirections: ['descend'],
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
        {
          text: "2028",
          value: "2028",
        },
      ],
      //   defaultSortOrder: 'descend',
      //   sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Start Date",
      dataIndex: "startMonth",
      //   filters: [
      //     {
      //       text: 'London',
      //       value: 'London',
      //     },
      //     {
      //       text: 'New York',
      //       value: 'New York',
      //     },
      //   ],
      //   onFilter: (value: string, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "End Date",
      dataIndex: "endMonth",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => {
        return (
          <>
            <button>Update</button>
            <button>Delete</button>
          </>
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
    <div>
      AcademicSemester
      <Table
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        loading={isLoading || isFetching}
      />
    </div>
  );
};

export default AcademicSemester;
