import sequelize from '../util/database';
import { expect } from 'chai';
import { Task } from '../models/task.model';

sequelize.addModels(['Task']);

describe("Task", function() {

  test('should create a new Task', (done) => {
    const task: Task = new Task({ name: 'JEST Task 1', priority: 20 });
    task.save()
    .then((task: Task) => {
      expect(task.id).not.null;
      done();
    })
    .catch((err: Error) => {
      done(err);
    });
  });

  test('should update a new Task', (done) => {
    Task.findOne()
    .then((task: Task | null) => {
      expect(task!.id).not.null;
      task!.name = 'NEW TASK NAME';
      task!.priority = 33;
      return task!.save();
    })
    .then((task: Task) => {
      expect(task.id).not.null;
      done();
    })
    .catch((err: Error) => {
      done(err);
    });
  });

  test('should read a Task', (done) => {
    Task.findOne()
    .then((task: Task | null) => {
      expect(task!.id).not.null;
      done();
    })
    .catch((err: Error) => {
      done(err);
    });
  });

  test('should delete a Task', (done) => {
    Task.findOne()
    .then((task: Task | null) => {
      expect(task!.id).not.null;
      return task!.destroy();
    })
    .then(() => {
      done();
    })
    .catch((err: Error) => {
      done(err);
    });
  });

});