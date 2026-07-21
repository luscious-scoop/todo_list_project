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

		let projects = getAllProjects();

		for (let key in projects) {
			if (key === data) {
				isDuplicate = true;
			}
		}

		return isDuplicate;
	};

	const addProject = (name) => {
		if (checkProjectDuplicates(name)) {
			alert("This Project Exists");
			return;
		}
		getAllProjects()[name] = taskController();

		getProjectsData()[name] = name;
		setLocalStorageItem("projectsData", getProjectsData());
		rawDataController.addRawData(name);
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
		delete getAllProjects()[name];
		delete getProjectsData()[name];
		setLocalStorageItem("projectsData", getProjectsData());
		rawDataController.deleteArray(name);
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
