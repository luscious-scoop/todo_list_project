import { taskController, task } from "./task.js";
import { screenController } from "./ui.js";

export function projectController() {
	const projects = {};

	const addProject = (name) => {
		projects[name] = taskController();
	};
	const getAllProjects = () => projects;

	const getProject = (name) => {
		let project;
		for (const key in getAllProjects()) {
			if (key === name) {
				project = getAllProjects()[key];
				return project;
			}
		}
	};

	const deleteProject = (name) => {
		for (const key in getAllProjects()) {
			if (key === name) {
				delete getAllProjects()[name];
			}
		}
	};
	return {
		deleteProject,
		addProject,
		getAllProjects,
		getProject,
	};
}
