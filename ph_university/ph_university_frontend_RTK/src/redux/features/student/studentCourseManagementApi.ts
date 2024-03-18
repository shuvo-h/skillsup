/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParams, TResponseRedux } from "../../../types";
import { TOfferedCourse } from "../../../types/studentCourse.type";
import { baseAPI } from "../../api/baseAPI";

export const studentCourseApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, String(item.value));
          });
        }
        // params.append('name','Fall')
        return {
          url: `/offered-courses/my-offered-courses`,
          method: "GET",
          params,
        };
      },
      providesTags:['offeredCourse'],

      transformResponse: (res: TResponseRedux<TOfferedCourse[]>) => {
        return {
          data: res.data,
          meta: res.meta,
        };
      },
    }),

    getAllEnrolledCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, String(item.value));
          });
        }
        // this API is not created in backend, create this
        return {
          url: `/enrolled-courses/my-enrolled-courses`,
          method: "GET",
          params,
        };
      },
      providesTags:['offeredCourse'],

      transformResponse: (res: TResponseRedux<any>) => {
        return {
          data: res.data,
          meta: res.meta,
        };
      },
    }),

    enrolCourse: builder.mutation({
      query: (bodyData) => {
        return {
          url: "/enrolled-courses/create-enrolled-course",
          method: "POST",
          body: { ...bodyData },
        };
      },
      invalidatesTags:['offeredCourse']
    }),


  }),
});
