import { taskController, task, notes, notesController } from "./task.js";

export function screenController() {
	const mainDiv = document.querySelector("main");
	const toDo = taskController();

	const homeBtn = document.querySelector(".home");

	const dialog = document.querySelector(".main-dialog");

	const closeBtn = document.querySelector(".close-btn");
	const addBtn = document.querySelector(".add-btn");

	const createTaskForm = (
		title = "",
		description = "",
		dueDate = "2026-07-03",
		priority = "",
		addBtnDisplay = "Block",
		editBtnDisplay = "none",
	) => {
		dialog.removeChild(document.querySelector("form"));
		const form = document.createElement("form");

		const formFirstChild = document.createElement("div");

		const titleInput = document.createElement("input");
		titleInput.type = "text";
		titleInput.placeholder = "Title: Pay bills";
		titleInput.value = title;

		const descriptionInput = document.createElement("textarea");
		descriptionInput.rows = "10";
		descriptionInput.cols = "100";
		descriptionInput.style.resize = "none";
		descriptionInput.placeholder =
			"Details: e.g internet, phone , electricity.";

		descriptionInput.value = description;

		formFirstChild.appendChild(titleInput);
		formFirstChild.appendChild(descriptionInput);

		const formSecondChild = document.createElement("div");

		const dateDiv = document.createElement("div");

		const dateHeader = document.createElement("h2");
		dateHeader.textContent = "Due Date : ";

		const dateInput = document.createElement("input");
		dateInput.type = "date";
		dateInput.value = dueDate;

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

		if (priority === "High") {
			highPriorityButton.classList.add("selected");
		} else if (priority === "Medium") {
			mediumPriorityButton.classList.add("selected");
		} else {
			lowPriorityButton.classList.add("selected");
		}

		lowPriorityButton.type = "button";
		mediumPriorityButton.type = "button";
		highPriorityButton.type = "button";

		priorityButtonsDiv.appendChild(lowPriorityButton);
		priorityButtonsDiv.appendChild(mediumPriorityButton);
		priorityButtonsDiv.appendChild(highPriorityButton);
		priorityDiv.classList.add("priority-btns");

		priorityDiv.appendChild(priorityHeading);
		priorityDiv.appendChild(priorityButtonsDiv);

		formSecondChild.appendChild(priorityDiv);

		const formThirdChild = document.createElement("div");

		const addToDoBtn = document.createElement("button");
		addToDoBtn.textContent = "Add to Do";
		addToDoBtn.classList.add("create-todo-btn");
		addToDoBtn.style.display = addBtnDisplay;

		const editToDoBtn = document.createElement("button");
		editToDoBtn.classList.add("edit-todo-btn");
		editToDoBtn.style.display = editBtnDisplay;

		formThirdChild.appendChild(addToDoBtn);

		form.appendChild(formFirstChild);
		form.appendChild(formSecondChild);
		form.appendChild(formThirdChild);
		dialog.appendChild(form);

		changePriorityEvent();
	};

	const showForm = () => {
		dialog.showModal();
	};
	const closeForm = () => {
		dialog.close();
	};
	addBtn.addEventListener("click", () => {
		createTaskForm();
		showForm();
		createToDoEvent();
	});
	closeBtn.addEventListener("click", closeForm);

	const createToDo = () => {
		const title = document.querySelector('input[type="text"]').value;
		const description = document.querySelector("textarea").value;
		const dueDate = document.querySelector('input[type="date"]').value;
		const priority = document.querySelector(".selected").textContent;
		toDo.addTask(new task(title, description, dueDate, priority));
		displayToDo();
	};

	const createToDoHTML = (id, title, dueDate) => {
		const toDoDiv = document.createElement("div");
		toDoDiv.classList.add("to-do");

		const toDoDivFirstChild = document.createElement("div");

		const isCompletedBtn = document.createElement("button");
		isCompletedBtn.textContent = "X";

		const titleHeading = document.createElement("h2");
		titleHeading.textContent = title;

		toDoDivFirstChild.appendChild(isCompletedBtn);
		toDoDivFirstChild.appendChild(titleHeading);

		const toDoDivSecondChild = document.createElement("div");

		const date = document.createElement("div");
		date.textContent = dueDate;

		const detailsBtn = document.createElement("button");
		detailsBtn.textContent = "details";
		detailsBtn.classList.add("detail-btn");
		detailsBtn.dataset.id = `${id}`;

		const editBtn = document.createElement("button");
		editBtn.textContent = "edit";
		editBtn.classList.add("edit-btn");
		editBtn.dataset.id = `${id}`;
		const deleteBtn = document.createElement("button");
		deleteBtn.classList.add("delete-btn");
		deleteBtn.textContent = "delete";
		deleteBtn.dataset.id = `${id}`;

		toDoDivSecondChild.appendChild(date);
		toDoDivSecondChild.appendChild(detailsBtn);
		toDoDivSecondChild.appendChild(editBtn);
		toDoDivSecondChild.appendChild(deleteBtn);

		toDoDiv.appendChild(toDoDivFirstChild);
		toDoDiv.appendChild(toDoDivSecondChild);

		mainDiv.appendChild(toDoDiv);
	};

	const displayToDo = () => {
		mainDiv.textContent = "";

		toDo.getToDoArray().forEach((task) => {
			createToDoHTML(task.id, task.title, task.dueDate);
		});

		deleteTaskEvent();
		showDescriptionEvent();
	};

	const createToDoEvent = () => {
		const createToDoBtn = document.querySelector(".create-todo-btn");
		createToDoBtn.addEventListener("click", (e) => {
			e.preventDefault();
			createToDo();
			dialog.close();
		});
	};

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
		let index = findToDo(id);
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

	const findToDo = (id) => {
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
				document.querySelector("dialog.description-dialog").showModal();
			});
		});
	};

	const closeDescriptionEvent = () => {
		const closeBtn = document.querySelector(".desc-close");
		const dialog = document.querySelector("dialog.description-dialog");

		closeBtn.addEventListener("click", () => {
			document.querySelector("body").removeChild(dialog);
		});
	};

	const changePriorityEvent = () => {
		const priorityBtns = document.querySelectorAll(".priority-btns button");

		priorityBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				document
					.querySelector(".selected")
					.classList.remove("selected");
				btn.classList.add("selected");
			});
		});
	};

	const editForm = (id) => {
		let index = findToDo(id);
		let object = toDo.getToDoArray()[index];
	};
	const editEvent = () => {
		const editBtns = document.querySelectorAll(".edit-btn");

		editBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				editForm(btn.dataset.id);
			});
		});
	};
}
