/* eslint-disable no-unused-vars */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middlewares/globalErrhandler';
import { notFound } from './app/middlewares/notFound';
import { PrimaryRouter } from './app/route';

export const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', PrimaryRouter);

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});

app.get("/a",(req,res)=>{
  res.send("Hello Schedule");
})
// global error
app.use(globalErrorHandler);

// Not Found router
app.use(notFound);


