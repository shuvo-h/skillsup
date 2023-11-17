import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoute } from './app/module/student/student.route';

export const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoute);

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});
