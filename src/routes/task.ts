import express, { Router } from "express";
// controllers
import { createTask, updateTask, deleteTask, readTask, fetchTasks } from '../controllers/task';

const router: Router = express.Router();
router
  .post('/create', createTask)
  .post('/update', updateTask)
  .delete('/delete', deleteTask)
  .get('/:id', readTask)
  .get('/', fetchTasks);
  
export default router;
