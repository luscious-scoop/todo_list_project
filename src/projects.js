import { taskController, task } from "./task.js";

export function projectController() {
	const projects = {};

	const createProject = (name) => {
		projects[name] = name;
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
		createProject,
		getAllProjects,
		getProject,
	};
}
