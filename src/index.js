import "./style.css";

import { taskController, notes, task, notesController } from "./task.js";
import { projectController } from "./projects.js";
import { screenController, projectsScreenController } from "./ui.js";

/* const obj = taskController();

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
 */
/* 
const projectObject = projectController();
projectObject.createProject("gym");
projectObject.createProject("office");
let gym = projectObject.getProject("gym");
let office = projectObject.getProject("office");

console.log(gym);

gym.addTask(new task("hy", "bye", "lol", "low"));
gym.addTask(new task("dil", "kehta", "hai", "chal"));
console.log(gym.getToDoArray());

office.addTask(new task("go at 9am", "lunch at 2am", "5pm break", "high"));
office.addTask(new task("work", "sleep", "eat", "medium"));
console.log(office.getToDoArray());
console.log(projectObject.getAllProjects());

projectObject.deleteProject("gym");
console.log(projectObject.getAllProjects());
 */

screenController();
projectsScreenController();
