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
}
