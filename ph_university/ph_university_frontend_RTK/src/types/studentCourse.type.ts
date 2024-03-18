
export type TOfferedCourse = {
    _id: string
    semesterRegistration: string
    academicSemester: string
    academicFaculty: string
    academicDepartment: string
    course: TCourse
    faculty: string
    maxCapacity: number
    section: number
    days: string[]
    startTime: string
    endTime: string
    createAt: string
    updatedAt: string
    enrolledCourses: any[]
    completedCourses: any[]
    completedCourseIds: any[]
    isPreRequisitesFulFilled: boolean
    isAlreadyEnrolled: boolean
}

export type TCourse = {
    _id: string
    title: string
    prefix: string
    code: string
    credits: string
    preRequisiteCourses: any[]
    isDeleted: boolean
}