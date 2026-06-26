class toDoTask {
	constructor(title, description, dueDate, priority) {
		this.id = crypto.randomUUID();
		this.title = title;
		this.description = description;
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

	const addTask = (title, description, dueDate, priority) => {
		const toDo = new toDoTask(title, description, dueDate, priority);
		toDoArray.push(toDo);
	};

	const printToDoList = () => {
		toDoArray.forEach((task) => {
			console.log(task);
		});
	};

	const removeTask = (id) => {
		const index = toDoArray.findIndex((task) => task.id === id);

		console.log("I am here");
		if (index !== -1) {
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
	};
}

export { toDoController };
