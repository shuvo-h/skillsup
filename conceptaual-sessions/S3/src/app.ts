import express from 'express';
import cors from 'cors';
import { userRoutes } from './routes/user.route';

export const app = express();

// parsers
app.use(cors())
app.use(express.json())

// middlewares
app.use('/api/v1/users',userRoutes);

app.get('/',(req,res)=>{
    res.end("Ok Server")
})