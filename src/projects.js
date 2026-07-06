import { taskController, task } from "./task.js";
import { screenController } from "./ui.js";

export function projectController() {
	let defaultProject = taskController();

	const getDefaultProject = () => defaultProject;
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
				console.log(getAllProjects());
			}
		}
	};
	return {
		getDefaultProject,
		deleteProject,
		addProject,
		getAllProjects,
		getProject,
	};
}
