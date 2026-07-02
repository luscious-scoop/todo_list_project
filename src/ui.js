import { taskController, task, notes, notesController } from "./task.js";

export function screenController() {
	const mainDiv = document.querySelector("main");
	const toDo = taskController();
	const notes = notesController();
	const homeBtn = document.querySelector(".home");
	const notesBtn = document.querySelector("notes");
	const completedBtn = document.querySelector("completed");
	const dialog = document.querySelector("dialog");
	const form = document.querySelector("form");
	const closeBtn = document.querySelector(".close-btn");
	const addBtn = document.querySelector(".add-btn");

	const createTaskForm = () => {
		form.textContent = "";

		const formFirstChild = document.createElement("div");

		const titleInput = document.createElement("input");
		titleInput.type = "text";
		titleInput.placeholder = "Title: Pay bills";

		const descriptionInput = document.createElement("textarea");
		descriptionInput.rows = "10";
		descriptionInput.cols = "100";
		descriptionInput.style.resize = "none";
		descriptionInput.placeholder =
			"Details: e.g internet, phone , electricity.";

		formFirstChild.appendChild(titleInput);
		formFirstChild.appendChild(descriptionInput);

		const formSecondChild = document.createElement("div");

		const dateDiv = document.createElement("div");

		const dateHeader = document.createElement("h2");
		dateHeader.textContent = "Due Date : ";

		const dateInput = document.createElement("input");
		dateInput.type = "date";

		dateDiv.appendChild(dateHeader);
		dateDiv.appendChild(dateInput);

		formSecondChild.appendChild(dateDiv);

		const priorityDiv = document.createElement("div");
		const priorityHeading = document.createElement("h2");
		priorityHeading.textContent = "Priority : ";

		const priorityButtonsDiv = document.createElement("div");
		const lowPriorityButton = document.createElement("button");
		const mediumPriorityButton = document.createElement("button");
		const highPriorityButton = document.createElement("button");

		lowPriorityButton.textContent = "Low";
		mediumPriorityButton.textContent = "Medium";
		highPriorityButton.textContent = "High";

		priorityButtonsDiv.appendChild(lowPriorityButton);
		priorityButtonsDiv.appendChild(mediumPriorityButton);
		priorityButtonsDiv.appendChild(highPriorityButton);

		priorityDiv.appendChild(priorityHeading);
		priorityDiv.appendChild(priorityButtonsDiv);

		formSecondChild.appendChild(priorityDiv);

		const formThirdChild = document.createElement("div");

		const addToDoBtn = document.createElement("button");
		addToDoBtn.textContent = "Add To Do";
		addToDoBtn.classList.add("create-todo-btn");
		formThirdChild.appendChild(addToDoBtn);

		form.appendChild(formFirstChild);
		form.appendChild(formSecondChild);
		form.appendChild(formThirdChild);
	};

	createTaskForm();
	const showForm = () => {
		dialog.showModal();
	};
	const closeForm = () => {
		dialog.close();
		form.reset();
	};
	addBtn.addEventListener("click", showForm);
	closeBtn.addEventListener("click", closeForm);

	const createToDo = () => {
		const title = document.querySelector('input[type="text"]').value;
		const description = document.querySelector("textarea").value;
		const dueDate = document.querySelector('input[type="date"]').value;
		const priority = "Low";
		toDo.addTask(new task(title, description, dueDate, priority));
		displayToDo();
	};

	const createToDoHTML = () => {
		const toDoDiv = document.createElement("div");
		toDoDiv.classList.add("to-do");

		const toDoDivFirstChild = document.createElement("div");

		const isCompletedBtn = document.createElement("button");
		isCompletedBtn.textContent = "X";

		const titleHeading = document.createElement("h2");

		toDoDivFirstChild.appendChild(isCompletedBtn);
		toDoDivFirstChild.appendChild(titleHeading);

		const toDoDivSecondChild = document.createElement("div");

		const date = document.createElement("div");

		const detailsBtn = document.createElement("button");
		detailsBtn.textContent = "details";
		detailsBtn.classList.add("detail-btn");

		const editBtn = document.createElement("button");
		editBtn.textContent = "edit";
		const deleteBtn = document.createElement("button");
		deleteBtn.classList.add("delete-btn");
		deleteBtn.textContent = "delete";

		toDoDivSecondChild.appendChild(date);
		toDoDivSecondChild.appendChild(detailsBtn);
		toDoDivSecondChild.appendChild(editBtn);
		toDoDivSecondChild.appendChild(deleteBtn);

		toDoDiv.appendChild(toDoDivFirstChild);
		toDoDiv.appendChild(toDoDivSecondChild);

		mainDiv.appendChild(toDoDiv);

		return [titleHeading, date, deleteBtn, detailsBtn, editBtn];
	};

	const displayToDo = () => {
		mainDiv.textContent = "";

		toDo.getToDoArray().forEach((task) => {
			const [titleHeading, date, deleteBtn, detailsBtn, editBtn] =
				createToDoHTML();
			titleHeading.textContent = `${task.title}`;
			deleteBtn.dataset.id = `${task.id}`;
			editBtn.dataset.id = `${task.id}`;
			detailsBtn.dataset.id = `${task.id}`;
			date.textContent = `${task.dueDate}`;
		});

		deleteTaskEvent();
		showDescriptionEvent();
	};
	const createToDoBtn = document.querySelector(".create-todo-btn");
	createToDoBtn.addEventListener("click", (e) => {
		e.preventDefault();
		createToDo();
		dialog.close();
		form.reset();
	});

	const deleteTask = (id) => {
		toDo.removeTask(id);
		displayToDo();
	};

	const deleteTaskEvent = () => {
		const deleteBtns = document.querySelectorAll(".delete-btn");

		deleteBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				deleteTask(btn.dataset.id);
				console.log("hy");
			});
		});
	};

	const createDescriptionDialog = (id) => {
		let index = findDescription(id);
		let object = toDo.getToDoArray()[index];

		const descriptionDialog = document.createElement("dialog");
		descriptionDialog.classList.add("description-dialog");
		descriptionDialog.textContent = "";

		const closeBtnDiv = document.createElement("div");
		const closeBtn = document.createElement("button");
		closeBtn.classList.add("desc-close");
		closeBtn.dataset.id = `${object.id}`;
		closeBtn.textContent = "X";
		closeBtnDiv.appendChild(closeBtn);
		descriptionDialog.appendChild(closeBtnDiv);

		const titleDiv = document.createElement("div");

		const titleHeading = document.createElement("p");
		titleHeading.textContent = "Title: ";
		const titleValue = document.createElement("p");
		titleValue.textContent = `${object.title}`;

		titleDiv.appendChild(titleHeading);
		titleDiv.appendChild(titleValue);

		const descriptionDiv = document.createElement("div");

		const descriptionHeading = document.createElement("p");
		descriptionHeading.textContent = "Description: ";
		const descriptionValue = document.createElement("p");
		descriptionValue.textContent = `${object.description}`;

		descriptionDiv.appendChild(descriptionHeading);
		descriptionDiv.appendChild(descriptionValue);

		const dateDiv = document.createElement("div");

		const dateHeading = document.createElement("p");
		dateHeading.textContent = "DueDate: ";

		const dateValue = document.createElement("p");
		dateValue.textContent = `${object.dueDate}`;

		dateDiv.appendChild(dateHeading);
		dateDiv.appendChild(dateValue);

		const priorityDiv = document.createElement("div");

		const priorityHeading = document.createElement("p");
		priorityHeading.textContent = "Priority: ";
		const priorityValue = document.createElement("p");
		priorityValue.textContent = `${object.priority}`;

		priorityDiv.appendChild(priorityHeading);
		priorityDiv.appendChild(priorityValue);

		descriptionDialog.appendChild(titleDiv);
		descriptionDialog.appendChild(descriptionDiv);
		descriptionDialog.appendChild(dateDiv);
		descriptionDialog.appendChild(priorityDiv);

		document.querySelector("body").appendChild(descriptionDialog);

		closeDescriptionEvent();
	};

	const findDescription = (id) => {
		let index = toDo.findTask(id);
		if (index || index === 0) {
			return index;
		} else {
			return;
		}
	};
	const showDescriptionEvent = () => {
		const detailsBtns = document.querySelectorAll(".detail-btn");

		detailsBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				createDescriptionDialog(btn.dataset.id);
				document.querySelector(".description-dialog").showModal();
			});
		});
	};

	const closeDescriptionEvent = () => {
		const closeBtn = document.querySelector(".desc-close");
		const dialog = document.querySelector("dialog.description-dialog");

		closeBtn.addEventListener("click", () => {
			dialog.close();
		});
	};
}
