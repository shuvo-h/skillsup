import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { UserModel } from "./user.model";

const findLastStudentId = async() =>{
    const lastStudent = await UserModel.findOne(
        {role: 'student'},
        {
            _id: 0,
            id: 1
        }
    ).sort({createdAt: -1}).lean();
    return lastStudent?.id ? lastStudent.id : undefined;
}


export const generateStudentId = async(payload:TAcademicSemester) =>{
    // first time '0000'
    // full id: 2023 02 0001
    let currentId = (0).toString(); //01
    const lastStudentId = await findLastStudentId();

    const lastStudentSemesterCode = lastStudentId?.substring(4,6); // 01
    const lastStudentYear= lastStudentId?.substring(0,4); // 2030
    const currentSemesterCode= payload.code;
    const currentYear = payload.year;

    if (lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear) {
        
        
        currentId = lastStudentId.substring(6)
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4,'0');
    
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    
    return incrementId;
}

