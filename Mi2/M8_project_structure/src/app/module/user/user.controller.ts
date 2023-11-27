import { UserService } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
    try {
      const {password,student} = req.body;
  
      // zod validation
    //   const zodParsedData = studentZodValidationSchema.parse(student);
  
      //  joi validation
    //   const { value: joiStudent, error: joiErr } = studentJoiValidationSchema.validate(student);
  
    //   if (joiErr) {
    //     return res.status(500).json({
    //       success: false,
    //       message: 'something went wrong',
    //       error: joiErr.details,
    //       originalData: joiStudent,
    //     });
    //   }
  
      // const result = await studentService.createStudentIntoDB(joiStudent);
      const result = await UserService.createStudentIntoDB(password,student);
      res.status(200).json({
        success: true,
        message: 'Student is created',
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: (error as { message: string }).message || 'something went wrong',
        data: null,
        error,
      });
    }
  };
  
 