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
		const index = toDoArray.findIndex((task) => task.id === id);
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

	const toggleCompleteStatus = (id) => {
		let index = findTask(id);

		if (index || index === 0) {
			toDoArray[index].toggleStatus();
		}
	};

	return {
		getToDoArray,
		addTask,
		removeTask,
		printToDoList,
		toggleCompleteStatus,
	};
}

export { toDoController, task, notes };
