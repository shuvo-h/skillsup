import express, { Request, Response } from 'express';

const app = express()


app.get('/', (req:Request, res:Response) => {
  res.send('Hello World! 22256565656jjkh')
})

export default app;