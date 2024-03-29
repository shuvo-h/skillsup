import { TQueryParams, TResponseRedux } from "../../../types";
import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "../../../types/academicManagement.type";
import { baseAPI } from "../../api/baseAPI";

type TSemesterCreate = {
  name: string;
  code: string;
  year: string;
  startMonth: string;
  endMonth: string;
};
export const academicSemesterApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, String(item.value));
          });
        }
        // params.append('name','Fall')
        return {
          url: "/academic-semesters",
          method: "GET",
          params,
        };
      },

      transformResponse: (res: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: res.data,
          meta: res.meta,
        };
      },
    }),
    addAcademicSemesters: builder.mutation<
      TResponseRedux<TAcademicSemester>,
      TSemesterCreate
    >({
      query: (bodyData) => {
        return {
          url: "/academic-semesters/create-academic-semester",
          method: "POST",
          body: { ...bodyData },
        };
      },
    }),

    getAcademicFaculties: builder.query({
      query: () => {
        return { url: '/academic-faculties', method: 'GET' };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getAcademicDepartments: builder.query({
      query: () => {
        return { url: "/academic-departments", method: "GET" };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});
