import {
	setLocalStorageItem,
	getLocalStorageItem,
	projectsRawDataController,
} from "./localstorage.js";

class notes {
	constructor(title, description) {
		this.id = crypto.randomUUID();
		this.title = title;
		this.description = description;
	}
}

class task extends notes {
	constructor(title, description, dueDate, priority, isCompleted = false) {
		super(title, description);
		this.dueDate = dueDate;
		this.priority = priority;
		this.isCompleted = isCompleted;
	}
	toggleStatus() {
		this.isCompleted = !this.isCompleted;
	}
}

function toDoController() {
	const toDoArray = [];
	let rawDataController = projectsRawDataController();

	const getToDoArray = () => toDoArray;

	const addTask = (key, object) => {
		getToDoArray().push(object);
		console.log(key);
		rawDataController.addObject(key, object);
	};

	const printToDoList = () => {
		toDoArray.forEach((task) => {
			console.log(task);
		});
	};
	const findTask = (id) => {
		const index = getToDoArray().findIndex((task) => task.id === id);
		if (index !== -1) {
			return index;
		}
		return false;
	};
	const removeTask = (key, id) => {
		let index = findTask(id);

		console.log("I am here");
		if (index || index === 0) {
			getToDoArray().splice(index, 1);
			rawDataController.removeObject(key, index);
		} else {
			console.log("not found");
		}
		console.log(toDoArray);
	};

	return {
		getToDoArray,
		addTask,
		removeTask,
		printToDoList,
		findTask,
	};
}

function taskController() {
	let obj = toDoController();
	let rawDataController = projectsRawDataController();

	const toggleCompleteStatus = (key, id) => {
		let index = obj.findTask(id);

		if (index || index === 0) {
			obj.getToDoArray()[index].toggleStatus();
			let status = obj.getToDoArray()[index].isCompleted;
			rawDataController.toggleDataStatus(key, index, status);
			return obj.getToDoArray()[index].isCompleted;
		} else {
			console.log("here");
		}
	};

	const editTask = (
		key,
		index,
		title = null,
		description = null,
		dueDate = null,
		priority = null,
	) => {
		if (index || index === 0) {
			obj.getToDoArray()[index].title =
				title !== null ? title : obj.getToDoArray()[index].title;
			obj.getToDoArray()[index].description =
				description !== null
					? description
					: obj.getToDoArray()[index].description;
			obj.getToDoArray()[index].dueDate =
				dueDate !== null ? dueDate : obj.getToDoArray()[index].dueDate;
			obj.getToDoArray()[index].priority =
				priority !== null
					? priority
					: obj.getToDoArray()[index].priority;

			rawDataController.editObject(key, index, {
				title: obj.getToDoArray()[index].title,
				description: obj.getToDoArray()[index].description,
				dueDate: obj.getToDoArray()[index].dueDate,
				priority: obj.getToDoArray()[index].priority,
			});

			console.log(obj);
		} else {
			console.log("Not found");
			return;
		}
	};

	return {
		...obj,
		toggleCompleteStatus,
		editTask,
	};
}

function notesController() {
	const editNote = (id, title = null, description = null) => {
		let index = obj.findTask(id);

		if (index || index === 0) {
			obj.getToDoArray()[index].title =
				title !== null ? title : obj.getToDoArray()[index].title;
			obj.getToDoArray()[index].description =
				description !== null
					? description
					: obj.getToDoArray()[index].description;
		} else {
			console.log("Not found");
			return;
		}
	};
	return {
		...toDoController(),
		editNote,
	};
}

export { taskController, notesController, task, notes };
