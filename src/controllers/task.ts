import { Request, Response, NextFunction } from "express";
import i18n  from 'i18n';
import validator from 'validator';
// models
import { Task, InputCreate, InputUpdate, InputID } from '../models/task.model';
// helpers
import { ErrorHelper } from "../helpers/ErrorHelper";
import { ParamsDictionary } from "express-serve-static-core";

export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const { name, priority }: InputCreate = req.body;

    if(validator.isEmpty(name) || !validator.isLength(name, { min: 4, max: 255 })){
      throw new ErrorHelper(i18n.__('ERROR_500'), 500, [{ message: i18n.__('TASK_NAME_IS_INCORECT', { name: name }), field: 'name' }]);
    }

    if(validator.isEmpty(priority.toString()) || !validator.isNumeric(priority.toString()) || !validator.isInt(priority.toString(), { min: 0, max: 100 })){
      throw new ErrorHelper(i18n.__('ERROR_500'), 500, [{ message: i18n.__('TASK_PRIORITY_IS_INCORECT'), field: 'priority' }]);
    }

    const task: Task = new Task({ name: name, priority: priority });
    await task.save();
    
    res.status(201).json({
      message: i18n.__('TASK_SUCCESS_CREATED', { name: name }),
      name: name,
      priority: priority
    });
  }catch(err){
    next(err);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const { id, name, priority }: InputUpdate = req.body;

    if(validator.isEmpty(id.toString()) || !validator.isNumeric(id.toString())){
      throw new ErrorHelper(i18n.__('ERROR_500'), 500, [{ message: i18n.__('TASK_ID_IS_INVALID') }]);
    }

    if(validator.isEmpty(name) || !validator.isLength(name, { min: 4, max: 255 })){
      throw new ErrorHelper(i18n.__('ERROR_500'), 500, [{ message: i18n.__('TASK_NAME_IS_INCORECT', { name: name }), field: 'name' }]);
    }

    if(validator.isEmpty(priority.toString()) || !validator.isNumeric(priority.toString()) || !validator.isInt(priority.toString(), { min: 0, max: 100 })){
      throw new ErrorHelper(i18n.__('ERROR_500'), 500, [{ message: i18n.__('TASK_PRIORITY_IS_INCORECT'), field: 'priority' }]);
    }

    const updatedTask: [number, Task[]] = await Task.update({ name: name, priority: priority }, {where: {id: id}});

    if(!updatedTask[0]){
      throw new ErrorHelper(i18n.__('ERROR_500'), 500, [{ message: i18n.__('TASK_DOES_NOT_EXISTS') }]);
    }

    res.status(200).json({
      message: i18n.__('TASK_SUCCESS_UPDATED', { name: name }),
      id: id,
      name: name,
      priority: priority
    });
  }catch(err){
    next(err);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const { id }: InputID = req.body;

    if(validator.isEmpty(id.toString()) || !validator.isNumeric(id.toString())){
      throw new ErrorHelper(i18n.__('ERROR_500'), 500, [{ message: i18n.__('TASK_ID_IS_INVALID') }]);
    }

    const result: number = await Task.destroy({where: {id: id}});

    if(!result){
      throw new ErrorHelper(i18n.__('ERROR_500'), 500, [{ message: i18n.__('TASK_DOES_NOT_EXISTS') }]);
    }

    res.status(200).json({
      message: i18n.__('TASK_SUCCESS_DELETED'),
      status: true,
    });
  }catch(err){
    next(err);
  }
};

export const readTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const { id }: ParamsDictionary = req.params;

    if(validator.isEmpty(id.toString()) || !validator.isNumeric(id.toString())){
      throw new ErrorHelper(i18n.__('ERROR_500'), 500, [{ message: i18n.__('TASK_ID_IS_INVALID') }]);
    }

    const task: Task | null = await Task.findByPk(id);

    if(!task){
      throw new ErrorHelper(i18n.__('ERROR_500'), 500, [{ message: i18n.__('TASK_DOES_NOT_EXISTS') }]);
    }

    res.status(200).json({
      message: i18n.__('TASK_SUCCESS_READED', { name: task.name }),
      id: task.id,
      name: task.name,
      priority: task.priority
    });
  }catch(err){
    next(err);
  }
};

export const fetchTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const tasks: Task[] = await Task.findAll({ order: [['priority', 'DESC']], limit: 1 });

    res.status(200).json({
      message: i18n.__('TASK_SUCCESS_FETCHED'),
      data: tasks
    });
  }catch(err){
    next(err);
  }
};