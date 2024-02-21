import { TQueryParams, TResponseRedux, TSemester } from "../../../types";
import { baseAPI } from "../../api/baseAPI";

export const courseManagementAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({

    getAllRegisteredSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, String(item.value));
          });
        }
        // params.append('name','Fall')
        return {
          url: "/semester-registrations",
          method: "GET",
          params,
        };
      },
      providesTags: ["semester"],
      transformResponse: (res: TResponseRedux<TSemester[]>) => {
        return {
          data: res.data,
          meta: res.meta,
        };
      },
    }),

    addRegisterSemesters: builder.mutation({
      query: (bodyData) => {
        return {
          url: "/semester-registrations/create-semester-registration",
          method: "POST",
          body: { ...bodyData },
        };
      },
      invalidatesTags: ["semester"],
    }),
    updateRegisterSemesters: builder.mutation({
      query: (dataInfo) => {
        return {
          url: `/semester-registrations/${dataInfo._id}`,
          method: "PATCH",
          body: { ...dataInfo.data },
        };
      },
      invalidatesTags: ["semester"],
    }),

    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, String(item.value));
          });
        }
        // params.append('name','Fall')
        return {
          url: "/courses",
          method: "GET",
          params,
        };
      },
      providesTags: ["courses"],
      transformResponse: (res: TResponseRedux<any>) => {
        return {
          data: res.data,
          meta: res.meta,
        };
      },
    }),

    addCourse: builder.mutation({
      query: (bodyData) => {
        return {
          url: "/courses/create-course",
          method: "POST",
          body: { ...bodyData },
        };
      },
      invalidatesTags: ["courses"],
    }),

    addFaculties: builder.mutation({
      query: (dataInfo) => {
        return {
          url: `/courses/${dataInfo.courseId}/assign-faculties`,
          method: "PUT",
          body: { ...dataInfo.data },
        };
      },
      invalidatesTags: ["courses"],
    }),

    getCourseFaculties: builder.query({
      query: (courseId) => {
        return {
          url: `/courses/${courseId}/get-faculties`,
          method: "GET",
        };
      },
      providesTags: ["courses"],
      transformResponse: (res: TResponseRedux<any>) => {
        return {
          data: res.data,
          meta: res.meta,
        };
      },
    }),

    addOfferedCourse: builder.mutation({
      query: (bodyData) => {
        return {
          url: "/offered-courses/create-offered-course",
          method: "POST",
          body: { ...bodyData },
        };
      },
      invalidatesTags: ["courses"],
    }),


  }),

});
