class notes {
	constructor(title, description) {
		this.id = crypto.randomUUID();
		this.title = title;
		this.description = description;
	}
}

class task extends notes {
	constructor(title, description, dueDate, priority) {
		super(title, description);
		this.dueDate = dueDate;
		this.priority = priority;
		this.isCompleted = false;
	}
	toggleStatus() {
		this.isCompleted = !this.isCompleted;
	}
}

function toDoController() {
	const toDoArray = [];

	const getToDoArray = () => toDoArray;

	const addTask = (object) => {
		toDoArray.push(object);
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
			toDoArray.splice(index, 1);
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

	const toggleCompleteStatus = (id) => {
		let index = obj.findTask(id);

		if (index || index === 0) {
			obj.getToDoArray()[index].toggleStatus();
		}
	};

	return {
		...obj,
		toggleCompleteStatus,
	};
}

function notesController() {
	return {
		...toDoController(),
	};
}

export { taskController, notesController, task, notes };
