import "./style.css";

import { taskController, notes, task, notesController } from "./task.js";

const obj = taskController();

obj.addTask(new task("washing clothes", "none", "67", "low"));

obj.addTask(new task("reading", "none", "67", "low"));

obj.addTask(new task("cooking", "none", "67", "low"));

obj.addTask(new task("study", "none", "67", "low"));
console.log(obj.getToDoArray());

let list = obj.getToDoArray();

let id = list[3].id;

obj.editTask(id, "movie night", "none ");
console.log(obj.getToDoArray());

let nt = notesController();

nt.addTask(new notes("hy", "by"));

console.log(nt.getToDoArray());
