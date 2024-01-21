import { baseAPI } from "../../api/baseAPI";

export const academicSemesterApi = baseAPI.injectEndpoints({
    endpoints: (builder) =>({
        getAllSemesters: builder.query({
            query: () =>{
                return {
                    url: '/academic-semesters',
                    method: "GET",
                }
            },
        })
    })
})