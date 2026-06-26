import "./style.css";

import { toDoController } from "./task.js";

const obj = toDoController();

obj.addTask("washing clothes", "none", "67", "low");

obj.addTask("reading", "none", "67", "low");

obj.addTask("cooking", "none", "67", "low");

obj.addTask("study", "none", "67", "low");
console.log(obj.getToDoArray());

let list = obj.getToDoArray();

let id = list[1].id;

obj.toggleCompleteStatus(id);
console.log(obj.getToDoArray());
