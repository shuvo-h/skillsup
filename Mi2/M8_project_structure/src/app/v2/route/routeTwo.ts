import express from 'express';

export const RouterVersionTwo = express.Router();

const secondRouterList = [
    {path:"",route:""},
];

secondRouterList.forEach(el =>{
    RouterVersionTwo.use(el.path,el.route);
})