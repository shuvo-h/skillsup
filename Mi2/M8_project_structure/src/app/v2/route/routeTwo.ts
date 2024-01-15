import express from 'express';
import { todoRouter } from '../todo_app/todoRoute';

export const RouterVersionTwo = express.Router();

const secondRouterList = [
  { path: '/todos', route: todoRouter },
];

secondRouterList.forEach((el) => {
  RouterVersionTwo.use(el.path, el.route);
});
