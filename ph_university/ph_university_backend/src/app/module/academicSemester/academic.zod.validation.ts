import { z } from 'zod';
import {
  AcademicSemesterCodes,
  AcademicSemesterNames,
  MonthList,
} from './academicSemester.constant';
import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonths,
} from './academicSemester.interface';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterNames] as [
      string,
      ...TAcademicSemesterName[],
    ]),
    code: z.enum([...AcademicSemesterCodes] as [
      string,
      ...TAcademicSemesterCode[],
    ]),
    year: z.string(),
    startMonth: z.enum([...MonthList] as [string, ...TMonths[]]),
    endMonth: z.enum([...MonthList] as [string, ...TMonths[]]),
  }),
});
const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z
      .enum([...AcademicSemesterNames] as [string, ...string[]])
      .optional(),
    year: z.string().optional(),
    code: z
      .enum([...AcademicSemesterCodes] as [string, ...string[]])
      .optional(),
    startMonth: z.enum([...MonthList] as [string, ...string[]]).optional(),
    endMonth: z.enum([...MonthList] as [string, ...string[]]).optional(),
  }),
});

export const academicSemesterValidations = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};
