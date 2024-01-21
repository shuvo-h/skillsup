import React from 'react';
import { academicSemesterApi } from '../../../redux/features/academicSemester/academicSemesterApi';

const AcademicSemester = () => {
    const {data:academicSemesters} = academicSemesterApi.useGetAllSemestersQuery(undefined);
    console.log(academicSemesters);
    
    return (
        <div>
            AcademicSemester
        </div>
    );
};

export default AcademicSemester;