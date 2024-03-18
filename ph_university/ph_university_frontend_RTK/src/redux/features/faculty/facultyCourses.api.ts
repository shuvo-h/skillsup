/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParams, TResponseRedux } from "../../../types";
import { baseAPI } from "../../api/baseAPI";

export const facultyCourseApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacultyCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, String(item.value));
          });
        }
        // params.append('name','Fall')
        return {
          url: `/enrolled-courses`,
          method: "GET",
          params,
        };
      },
        //   providesTags:[''],

      transformResponse: (res: TResponseRedux<any>) => {
        return {
          data: res.data,
          meta: res.meta,
        };
      },
    }),

    

    
    addMarks: builder.mutation({
      query: (bodyData) => {
        return {
          url: "/enrolled-courses/update-enrolled-course-marks",
          method: "PATCH",
          body: { ...bodyData },
        };
      },
      // invalidatesTags:['']
    }),
    


  }),
});
