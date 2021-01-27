const assert = require('assert');
const TaskManager = require('../js/taskManager');

describe("TaskManager", () => {
  describe(".addTask", () =>{
    it("should add a task", () =>{
      //setup
      const taskManager = new TaskManager();
      let len = taskManager.tasks.length;
      console.log(len);
      //exercise
      taskManager.addTask();
      console.log(taskManager.tasks.length);
      //Verify
      assert.strictEqual(len+1,taskManager.tasks.length);
    });
  });
  describe(".deleteTask", () =>{
    it("should delete a task", () =>{
      //setup
      const taskManager = new TaskManager(0);
      taskManager.tasks[0] = {id : 0,
      name: "Task-1",
      description: "task-description",
      assignedTo: "Ana",
      dueDate: "2021-01-20",
      status: "TODO",
      priority: "High" };
      let len = taskManager.tasks.length;
      console.log(len);
      const inputTaskId = Number(taskManager.currentId);
      //exercise
      taskManager.deleteTask(inputTaskId);
      console.log(taskManager.tasks.length);
      //verify
      assert.strictEqual(len-1,taskManager.tasks.length);
    });
  });
  describe(".getTaskById", () =>{
    it("get task by Id", () => {
      //setup
      const taskManager = new TaskManager(0);
      taskManager.tasks[0] = {id : 0,
      name: "Task-1",
      description: "task-description",
      assignedTo: "Ana",
      dueDate: "2021-01-20",
      status: "TODO",
      priority: "High" };
      const inputTaskId = Number(taskManager.currentId);
      //exercise
      const task = taskManager.getTaskById(inputTaskId);
      //verify
      assert.strictEqual(task.id,inputTaskId);
    });
  });
});