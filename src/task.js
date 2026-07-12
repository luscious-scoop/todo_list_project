import { setLocalStorageItem, getLocalStorageItem } from "./localstorage.js";

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
	const data = getLocalStorageItem("data") || [];

	const getDataArray = () => data;

	const getToDoArray = () => toDoArray;

	const checkDataDuplicates = (data) => {
		let isDuplicate = false;
		getDataArray().forEach((item) => {
			if (item.title === data) {
				isDuplicate = true;
			}
		});

		return isDuplicate;
	};
	const addTask = (object) => {
		getToDoArray().push(object);
		if (checkDataDuplicates(object.title)) {
			return;
		}
		getDataArray().push({
			title: object.title,
			description: object.description,
			dueDate: object.dueDate,
			priority: object.priority,
			isCompleted: object.isCompleted,
		});
		setLocalStorageItem("data", getDataArray());
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
	const removeTask = (id) => {
		let index = findTask(id);

		console.log("I am here");
		if (index || index === 0) {
			getToDoArray().splice(index, 1);
			getDataArray().splice(index, 1);
			setLocalStorageItem("data", getDataArray());
		} else {
			console.log("not found");
		}
		console.log(toDoArray);
	};

	return {
		getDataArray,
		getToDoArray,
		addTask,
		removeTask,
		printToDoList,
		findTask,
	};
}

function taskController() {
	let obj = toDoController();

	const toggleCompleteStatus = (id) => {
		let index = obj.findTask(id);

		if (index || index === 0) {
			obj.getToDoArray()[index].toggleStatus();
			console.log(obj.getToDoArray()[index]);
			obj.getDataArray()[index].isCompleted =
				obj.getToDoArray()[index].isCompleted;
			setLocalStorageItem("data", obj.getDataArray());
			return obj.getToDoArray()[index].isCompleted;
		} else {
			console.log("here");
		}
	};

	const editTask = (
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

			obj.getDataArray()[index].title = obj.getToDoArray()[index].title;
			obj.getDataArray()[index].description =
				obj.getToDoArray()[index].description;
			obj.getDataArray()[index].dueDate =
				obj.getToDoArray()[index].dueDate;
			obj.getDataArray()[index].priority =
				obj.getToDoArray()[index].priority;
			setLocalStorageItem("data", obj.getDataArray());

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
