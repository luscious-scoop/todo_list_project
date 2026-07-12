import { taskController, task } from "./task.js";
import { screenController } from "./ui.js";
import { setLocalStorageItem, getLocalStorageItem } from "./localstorage.js";

export function projectController() {
	let defaultProject = taskController();

	const getDefaultProject = () => defaultProject;
	const projects = {};
	const projectsData = getLocalStorageItem("projectsData") || {};
	const getProjectsData = () => projectsData;
	const getAllProjects = () => projects;

	const checkProjectDuplicates = (data) => {
		let isDuplicate = false;

		let projects = getProjectsData();

		for (let key in projects) {
			if (key === data) {
				isDuplicate = true;
			}
		}

		return isDuplicate;
	};

	const addProject = (name) => {
		getAllProjects()[name] = taskController();
		if (checkProjectDuplicates(name)) {
			return;
		}
		getProjectsData()[name] = name;
		setLocalStorageItem("projectsData", getProjectsData());
	};

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
				delete getProjectsData()[name];
				setLocalStorageItem("projectsData", getProjectsData());
				console.log(getAllProjects());
			}
		}
	};
	return {
		getProjectsData,
		getDefaultProject,
		deleteProject,
		addProject,
		getAllProjects,
		getProject,
	};
}
