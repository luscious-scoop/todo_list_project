import "./style.css";

import { toDoController, notes, task } from "./task.js";

const obj = toDoController();

obj.addTask(new task("washing clothes", "none", "67", "low"));

obj.addTask(new task("reading", "none", "67", "low"));

obj.addTask(new task("cooking", "none", "67", "low"));

obj.addTask(new task("study", "none", "67", "low"));
console.log(obj.getToDoArray());

let list = obj.getToDoArray();

let id = list[1].id;

obj.toggleCompleteStatus(id);
console.log(obj.getToDoArray());
