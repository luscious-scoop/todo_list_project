import { taskController, task } from "./task.js";

export function projectController() {
	const projects = {};

	const createProject = (name) => {
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
	return {
		createProject,
		getAllProjects,
		getProject,
	};
}
