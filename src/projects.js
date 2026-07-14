import { taskController, task } from "./task.js";
import { screenController } from "./ui.js";
import {
	setLocalStorageItem,
	getLocalStorageItem,
	projectsRawDataController,
} from "./localstorage.js";

export function projectController() {
	let defaultProject = taskController();
	let rawDataController = projectsRawDataController();

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
		rawDataController.AddRawDataArray(name);
	};

	const getProject = (name) => {
		let project;
		for (const key in getAllProjects()) {
			if (key === name) {
				project = getAllProjects()[key];
				let array = rawDataController.getRawDataArray(name);
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
				rawDataController.deleteArray(name);
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
