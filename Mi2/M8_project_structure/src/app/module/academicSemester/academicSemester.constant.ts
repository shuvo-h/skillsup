import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TAcademicSemesterNameCodeMapper,
  TMonths,
} from './academicSemester.interface';

export const MonthList: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const AcademicSemesterNames: TAcademicSemesterName[] = [
  'Autumn',
  'Summar',
  'Fall',
];
export const AcademicSemesterCodes: TAcademicSemesterCode[] = [
  '01',
  '02',
  '03',
];

export const AcademicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autumn: '01',
  Summar: '02',
  Fall: '03',
};
