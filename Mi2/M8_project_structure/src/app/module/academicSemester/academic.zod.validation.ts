import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterNames,
  MonthList,
} from './academicSemester.constant';
import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonths,
} from './academicSemester.interface';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemesterNames] as [
      string,
      ...TAcademicSemesterName[],
    ]),
    code: z.enum([...academicSemesterCodes] as [
      string,
      ...TAcademicSemesterCode[],
    ]),
    year: z.string(),
    startMonth: z.enum([...MonthList] as [string, ...TMonths[]]),
    endMonth: z.enum([...MonthList] as [string, ...TMonths[]]),
  }),
});

export const academicSemesterValidations = {
  createAcademicSemesterValidationSchema,
};
