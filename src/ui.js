import { projectController } from "./projects.js";
import { taskController, task, notes, notesController } from "./task.js";
import { projectsRawDataController } from "./localstorage.js";

import closeBtnImg from "./icons/close.png";
import delBtnSrc from "./icons/minus-sign.png";
import checkImgSrc from "./icons/check.png";

export function screenController() {
	const todoContainer = document.querySelector(".todo-container");
	const notesContainer = document.querySelector(".notes-container");

	const homeBtn = document.querySelector(".home");
	const notesSelectionBtn = document.querySelector(".notes-selection-btn");
	const notesShowFormBtn = document.querySelector(".notes-show-form-btn");

	const dialog = document.querySelector(".main-dialog");

	const closeBtn = document.querySelector(".close-btn");
	const addBtn = document.querySelector(".add-btn");
	const projectsDiv = document.querySelector(".projects");
	let projectObject = projectController();
	let rawDataController = projectsRawDataController();

	const notesObject = notesController();

	let currentRawDataArrayKey;

	const changeCurrentRawDataArray = (key = "df") => {
		currentRawDataArrayKey = key;
	};

	changeCurrentRawDataArray();

	let editIndex = null;
	let editObject = null;
	const mainDiv = document.querySelector("main");
	let toDo;

	const changeToDoController = (
		controller = projectObject.getDefaultProject(),
	) => {
		toDo = controller;
	};

	changeToDoController();
	homeBtn.addEventListener("click", () => {
		defaultProjectInitializer();
	});

	const tabSwitchBtnsStyles = (btn = null) => {
		if (btn) {
			document.querySelector(".active").classList.remove("active");
			btn.classList.add("active");
		}

		const tabSwitchBtns = document.querySelectorAll(".tab-switch-btn");

		tabSwitchBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				document.querySelector(".active")?.classList.remove("active");

				btn.classList.add("active");
			});
		});
	};

	const getProjectEvent = () => {
		let project;
		const projectBtns = document.querySelectorAll(".todo-project");

		projectBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				changeToDoController(projectObject.getProject(btn.textContent));
				changeCurrentRawDataArray(btn.textContent);

				displayToDo();
			});
		});
	};
	getProjectEvent();

	const getToDoObject = () => toDo;

	const createTaskForm = (
		heading = "Create a ToDo",
		title = "",
		description = "",
		dueDate = "2026-07-03",
		priority = "",
		addBtnDisplay = "block",
		editBtnDisplay = "none",
	) => {
		const dialogHeading = document.querySelector(".task-form-heading");
		dialogHeading.textContent = heading;
		const form = document.createElement("form");
		form.classList.add("task-form");

		const formFirstChild = document.createElement("div");

		const titleInput = document.createElement("input");
		titleInput.type = "text";
		titleInput.placeholder = "Title: Pay bills";
		titleInput.value = title;

		const descriptionInput = document.createElement("textarea");
		descriptionInput.rows = "5";
		descriptionInput.cols = "50";
		descriptionInput.style.resize = "none";
		descriptionInput.placeholder =
			"Details: e.g internet, phone , electricity.";

		descriptionInput.value = description;

		formFirstChild.appendChild(titleInput);
		formFirstChild.appendChild(descriptionInput);

		formFirstChild.classList.add("task-form-first-child");

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
		formSecondChild.classList.add("task-form-second-child");

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

		lowPriorityButton.classList.add("low-priority-btn");
		mediumPriorityButton.classList.add("medium-priority-btn");
		highPriorityButton.classList.add("high-priority-btn");

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
		priorityButtonsDiv;
		priorityDiv.classList.add("priority-btns");

		priorityDiv.appendChild(priorityHeading);
		priorityDiv.appendChild(priorityButtonsDiv);

		priorityDiv.classList.add("priority-div");

		formSecondChild.appendChild(priorityDiv);

		const formThirdChild = document.createElement("div");

		const addToDoBtn = document.createElement("button");
		addToDoBtn.textContent = "Add To Do";
		addToDoBtn.classList.add("create-todo-btn");
		addToDoBtn.style.display = addBtnDisplay;

		const editToDoBtn = document.createElement("button");
		editToDoBtn.classList.add("edit-todo-btn");
		editToDoBtn.style.display = editBtnDisplay;
		editToDoBtn.textContent = "Edit To Do";
		formThirdChild.appendChild(editToDoBtn);

		formThirdChild.appendChild(addToDoBtn);

		formThirdChild.classList.add("task-form-third-child");

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
		dialog.removeChild(document.querySelector("form"));
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

		if (title !== "" || description !== "" || dueDate !== "") {
			getToDoObject().addTask(
				currentRawDataArrayKey,
				new task(title, description, dueDate, priority, false),
			);
		}
	};

	const ToDoToggleStyles = (status, div, btn, priority = null) => {
		const checkMarkImg = document.createElement("img");
		checkMarkImg.src = `${checkImgSrc}`;
		const isCompleteBtn = btn;
		const todoDiv = div;

		if (priority === "Low") {
			todoDiv.style.borderLeft = "5px solid #069e2d";
		} else if (priority === "Medium") {
			todoDiv.style.borderLeft = "5px solid #ff9f1c";
		} else if (priority === "High") {
			todoDiv.style.borderLeft = "5px solid #e3170a";
		}
		todoDiv.style.borderTopLeftRadius = "8px";
		todoDiv.style.borderBottomLeftRadius = "8px";

		if (status === true) {
			todoDiv.classList.remove("not-completed-todo");
			todoDiv.classList.add("todo-completed");
			isCompleteBtn.appendChild(checkMarkImg);
			isCompleteBtn.style.backgroundColor = "white";
		} else {
			todoDiv.classList.add("not-completed-todo");
			todoDiv.classList.remove("todo-completed");
			isCompleteBtn.textContent = "";
			isCompleteBtn.style.backgroundColor = "transparent";
		}
	};

	const createToDoHTML = (id, title, dueDate, isComplete, priority) => {
		const toDoDiv = document.createElement("div");
		toDoDiv.classList.add("to-do");

		toDoDiv.dataset.id = `${id}`;

		const toDoDivFirstChild = document.createElement("div");

		const isCompletedBtn = document.createElement("button");

		isCompletedBtn.classList.add("is-complete-btn");
		isCompletedBtn.dataset.id = `${id}`;

		ToDoToggleStyles(isComplete, toDoDiv, isCompletedBtn, priority);

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

		todoContainer.appendChild(toDoDiv);
	};

	const displayToDo = () => {
		todoContainer.textContent = "";
		notesContainer.textContent = "";

		getToDoObject()
			.getToDoArray()
			.forEach((task) => {
				createToDoHTML(
					task.id,
					task.title,
					task.dueDate,
					task.isCompleted,
					task.priority,
				);
			});

		deleteTaskEvent();
		showDescriptionEvent();
		editShowEvent();
		isComplete();
	};

	const defaultProjectInitializer = () => {
		changeToDoController();
		changeCurrentRawDataArray();
		displayToDo();
	};

	const createToDoEvent = () => {
		const createToDoBtn = document.querySelector(".create-todo-btn");
		createToDoBtn.addEventListener("click", (e) => {
			e.preventDefault();
			createToDo();
			displayToDo();
			dialog.close();
			dialog.removeChild(document.querySelector("form"));
		});
	};

	const deleteTask = (id) => {
		getToDoObject().removeTask(currentRawDataArrayKey, id);
		displayToDo();
	};

	const deleteTaskEvent = () => {
		const deleteBtns = document.querySelectorAll(".delete-btn");

		deleteBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				deleteTask(btn.dataset.id);
			});
		});
	};

	const createDescriptionDialog = (id) => {
		let index = findToDo(id);
		let object = getToDoObject().getToDoArray()[index];

		const descriptionDialog = document.createElement("dialog");
		descriptionDialog.classList.add("description-dialog");
		descriptionDialog.textContent = "";

		const closeBtnDiv = document.createElement("div");
		const closeBtn = document.createElement("button");
		closeBtn.classList.add("desc-close");
		closeBtn.dataset.id = `${object.id}`;

		const closeBtnImage = document.createElement("img");
		closeBtnImage.src = `${closeBtnImg}`;
		closeBtn.appendChild(closeBtnImage);
		closeBtnDiv.appendChild(closeBtn);
		descriptionDialog.appendChild(closeBtnDiv);

		const titleDiv = document.createElement("div");

		const titleValue = document.createElement("h2");
		titleValue.textContent = `${object.title}`;
		titleDiv.classList.add("desc-title-div");

		titleDiv.appendChild(titleValue);

		const descriptionDiv = document.createElement("div");

		const descriptionHeading = document.createElement("h2");
		descriptionHeading.textContent = "Description: ";
		const descriptionValue = document.createElement("p");
		descriptionValue.textContent = `${object.description}`;

		descriptionDiv.appendChild(descriptionHeading);
		descriptionDiv.appendChild(descriptionValue);

		const dateDiv = document.createElement("div");

		const dateHeading = document.createElement("h2");
		dateHeading.textContent = "DueDate: ";

		const dateValue = document.createElement("p");
		dateValue.textContent = `${object.dueDate}`;

		dateDiv.appendChild(dateHeading);
		dateDiv.appendChild(dateValue);

		const priorityDiv = document.createElement("div");

		const priorityHeading = document.createElement("h2");
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
		let index = getToDoObject().findTask(id);
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
		editIndex = getToDoObject().findTask(id);
		editObject = getToDoObject().getToDoArray()[editIndex];

		createTaskForm(
			"Edit ToDo",
			editObject.title,
			editObject.description,
			editObject.dueDate,
			editObject.priority,
			"none",
			"block",
		);
		confirmEditEvent();
	};

	const editShowEvent = () => {
		const editBtns = document.querySelectorAll(".edit-btn");
		editBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				editForm(btn.dataset.id);
				dialog.showModal();
			});
		});
	};
	const confirmEditEvent = () => {
		const conFirmEditBtn = document.querySelector(".edit-todo-btn");
		conFirmEditBtn.addEventListener("click", (e) => {
			e.preventDefault();
			getToDoObject().editTask(
				currentRawDataArrayKey,
				editIndex,
				document.querySelector('input[type="text"]').value,
				document.querySelector("textarea").value,
				document.querySelector('input[type="date"]').value,
				document.querySelector(".selected").textContent,
			);
			displayToDo();
			dialog.close();
			dialog.removeChild(document.querySelector("form"));
		});
	};

	const isComplete = () => {
		const isCompleteBtns = document.querySelectorAll(".is-complete-btn");

		isCompleteBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				let status = getToDoObject().toggleCompleteStatus(
					currentRawDataArrayKey,
					btn.dataset.id,
				);

				ToDoToggleStyles(
					status,
					document.querySelector(
						`.to-do[data-id="${btn.dataset.id}"]`,
					),
					document.querySelector(
						`.is-complete-btn[data-id="${btn.dataset.id}"]`,
					),
				);
			});
		});
	};

	const createProjectDialog = () => {
		const dialog = document.createElement("dialog");

		dialog.classList.add("project-dialog");
		const ProjectDialogHeaderDiv = document.createElement("div");
		ProjectDialogHeaderDiv.classList.add("project-dialog-header-div");

		const projectDialogHeader = document.createElement("h2");
		projectDialogHeader.classList.add("project-dialog-header");
		projectDialogHeader.textContent = "Create a new project";

		ProjectDialogHeaderDiv.appendChild(projectDialogHeader);

		const closeBtn = document.createElement("button");
		closeBtn.classList.add("project-close");
		const closeBtnImage = document.createElement("img");
		closeBtnImage.src = `${closeBtnImg}`;

		closeBtn.appendChild(closeBtnImage);

		ProjectDialogHeaderDiv.appendChild(closeBtn);
		dialog.appendChild(ProjectDialogHeaderDiv);

		document.querySelector("body").appendChild(dialog);
	};
	createProjectDialog();
	const ProjectDialog = document.querySelector(".project-dialog");

	const createProjectForm = () => {
		const form = document.createElement("form");
		const projectInputDiv = document.createElement("div");
		projectInputDiv.classList.add("project-input-div");
		form.classList.add("project-form");
		const projectTitle = document.createElement("input");
		projectTitle.classList.add("project-title-input");
		projectTitle.type = "text";
		projectTitle.placeholder = "Title: Build a new pc ";
		projectInputDiv.appendChild(projectTitle);

		const addProjectBtn = document.createElement("button");
		addProjectBtn.classList.add("add-project-btn");
		addProjectBtn.textContent = "Create Project";
		const addProjectDiv = document.createElement("div");
		addProjectDiv.classList.add("add-project-div");
		addProjectDiv.appendChild(addProjectBtn);

		form.appendChild(projectInputDiv);
		form.appendChild(addProjectDiv);
		ProjectDialog.appendChild(form);
		createProjectEvent();
	};

	const closeFormEvent = () => {
		const closeBtn = document.querySelector(".project-close");
		closeBtn.addEventListener("click", () => {
			ProjectDialog.close();
			ProjectDialog.removeChild(document.querySelector(".project-form"));
		});
	};
	closeFormEvent();

	const openFormBtn = document.querySelector(".open-form-btn");
	openFormBtn.addEventListener("click", () => {
		createProjectForm();
		ProjectDialog.showModal();
	});

	const createProject = () => {
		const projectName = document.querySelector(
			".project-title-input",
		).value;

		projectObject.addProject(projectName);

		displayProject();
	};

	const createProjectSidebar = (projectName) => {
		const projectDiv = document.createElement("div");
		projectDiv.classList.add("project-card");

		const projectBtn = document.createElement("button");
		projectBtn.classList.add("todo-project");
		projectBtn.classList.add("tab-switch-btn");
		projectBtn.textContent = projectName;

		const deleteBtn = document.createElement("button");
		deleteBtn.classList.add("project-del-btn");

		const delBtnImg = document.createElement("img");
		delBtnImg.src = `${delBtnSrc}`;
		deleteBtn.appendChild(delBtnImg);

		deleteBtn.dataset.id = projectName;
		projectDiv.appendChild(projectBtn);
		projectDiv.appendChild(deleteBtn);

		projectsDiv.appendChild(projectDiv);
	};

	const displayProject = () => {
		projectsDiv.textContent = "";
		let projects = projectObject.getAllProjects();
		for (let project in projects) {
			createProjectSidebar(project);
		}
		deleteProjectEvent();
		getProjectEvent();
		tabSwitchBtnsStyles();
	};
	const createProjectEvent = () => {
		const addBtn = document.querySelector(".add-project-btn");

		addBtn.addEventListener("click", (e) => {
			e.preventDefault();
			createProject();
			ProjectDialog.close();
			ProjectDialog.removeChild(document.querySelector(".project-form"));
		});
	};
	const deleteProjectEvent = () => {
		const deleteBtns = document.querySelectorAll(".project-del-btn");

		deleteBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				projectObject.deleteProject(btn.dataset.id);
				tabSwitchBtnsStyles(homeBtn);

				displayProject();
				defaultProjectInitializer();
			});
		});
	};

	const createNotesDialog = () => {
		const notesDialog = document.createElement("dialog");
		notesDialog.classList.add("notes-dialog");
		const headerDiv = document.createElement("div");
		headerDiv.classList.add("notes-header");

		const dialogHeader = document.createElement("h2");
		dialogHeader.classList.add("dialog-header");
		dialogHeader.textContent = "Create a new Note";

		const notesDialogCloseBtn = document.createElement("button");
		notesDialogCloseBtn.type = "button";

		notesDialogCloseBtn.classList.add("notes-dialog-close-btn");

		const closeBtnImage = document.createElement("img");
		closeBtnImage.src = `${closeBtnImg}`;

		notesDialogCloseBtn.appendChild(closeBtnImage);

		headerDiv.appendChild(dialogHeader);
		headerDiv.appendChild(notesDialogCloseBtn);

		notesDialog.appendChild(headerDiv);
		document.querySelector("body").appendChild(notesDialog);
	};
	createNotesDialog();

	const removeNotesForm = () => {
		const notesDialog = document.querySelector(".notes-dialog");
		const notesForm = document.querySelector(".notes-form");

		notesDialog.removeChild(notesForm);
	};

	const notesCloseDialog = () => {
		const notesDialog = document.querySelector(".notes-dialog");
		const notesDialogCloseBtn = document.querySelector(
			".notes-dialog-close-btn",
		);

		notesDialogCloseBtn.addEventListener("click", () => {
			notesDialog.close();
			removeNotesForm();
		});
	};

	notesCloseDialog();

	const createNotesForm = (title = "", description = "") => {
		const notesForm = document.createElement("form");
		notesForm.classList.add("notes-form");

		const notesTitleInput = document.createElement("input");
		notesTitleInput.type = "text";
		notesTitleInput.value = title;
		notesTitleInput.classList.add("notes-title-input");
		notesTitleInput.placeholder = "Note Title";

		const notesDescriptionInput = document.createElement("textarea");
		notesDescriptionInput.classList.add("notes-desc-input");
		notesDescriptionInput.placeholder = "Note Description";

		notesDescriptionInput.value = description;
		notesDescriptionInput.rows = "10";
		notesDescriptionInput.cols = "100";

		const notesInputDiv = document.createElement("div");
		notesInputDiv.classList.add("notes-input-div");

		notesInputDiv.appendChild(notesTitleInput);
		notesInputDiv.appendChild(notesDescriptionInput);

		const createNotesBtnDiv = document.createElement("div");
		createNotesBtnDiv.classList.add("create-notes-div");

		const createNoteBtn = document.createElement("button");
		createNoteBtn.classList.add("notes-add-btn");
		createNoteBtn.textContent = "Add Note";

		createNotesBtnDiv.appendChild(createNoteBtn);

		notesForm.appendChild(notesInputDiv);
		notesForm.appendChild(createNotesBtnDiv);
		const notesDialog = document.querySelector(".notes-dialog");

		notesDialog.appendChild(notesForm);
		createNotesEvent();
	};

	notesShowFormBtn.addEventListener("click", () => {
		createNotesForm();
		const notesDialog = document.querySelector(".notes-dialog");
		notesDialog.showModal();
	});

	const createNote = () => {
		const notesTitleInput =
			document.querySelector(".notes-title-input").value;
		const notesDescriptionInput =
			document.querySelector(".notes-desc-input").value;
		changeCurrentRawDataArray("notes");
		notesObject.addTask(
			currentRawDataArrayKey,
			new notes(notesTitleInput, notesDescriptionInput),
		);
	};

	const createNotesEvent = () => {
		const notesDialog = document.querySelector(".notes-dialog");

		const createNoteBtn = document.querySelector(".notes-add-btn");

		createNoteBtn.addEventListener("click", (e) => {
			e.preventDefault();
			createNote();

			displayNotes();
			tabSwitchBtnsStyles(notesSelectionBtn);
			notesDialog.close();
			removeNotesForm();
		});
	};

	const createNotesHTML = (id, notesTitle, notesDescription) => {
		const notesCard = document.createElement("div");
		notesCard.classList.add("notes-card");

		const noteTitle = document.createElement("h2");

		const notesDeleteDiv = document.createElement("div");
		notesDeleteDiv.classList.add("notes-del-div");

		const notesDeleteBtn = document.createElement("button");

		notesDeleteBtn.dataset.id = `${id}`;
		notesDeleteBtn.classList.add("notes-del-btn");
		const delBtnImage = document.createElement("img");
		delBtnImage.src = `${closeBtnImg}`;
		notesDeleteBtn.appendChild(delBtnImage);

		notesDeleteDiv.appendChild(notesDeleteBtn);

		noteTitle.textContent = notesTitle;

		const noteDescription = document.createElement("p");

		noteDescription.textContent = notesDescription;
		notesCard.appendChild(notesDeleteDiv);

		notesCard.appendChild(noteTitle);
		notesCard.appendChild(noteDescription);

		notesContainer.appendChild(notesCard);
	};

	const displayNotes = () => {
		todoContainer.textContent = "";
		notesContainer.textContent = "";

		notesObject.getToDoArray().forEach((note) => {
			createNotesHTML(note.id, note.title, note.description);
			console.log(note);
		});
		deleteNote();
	};

	const deleteNote = () => {
		const notesDeleteBtns = document.querySelectorAll(".notes-del-btn");

		notesDeleteBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				changeCurrentRawDataArray("notes");
				notesObject.removeTask(currentRawDataArrayKey, btn.dataset.id);
				displayNotes();
			});
		});
	};
	notesSelectionBtn.addEventListener("click", () => {
		displayNotes();
	});
	const createProjectsOnReload = () => {
		let projects = projectObject.getAllProjects();
		let data = projectObject.getProjectsData();
		let array;
		let controller;
		if (
			Object.keys(projects).length === 0 &&
			Object.keys(data).length !== 0
		) {
			for (let project in data) {
				projectObject.addProject(project);
			}
			for (let project in projects) {
				controller = projectObject.getProject(project);

				array = rawDataController.getRawDataArray(project);
				displayProject();

				if (!array) return;

				console.log(project);
				console.log(array);
				array.forEach((item) => {
					controller.addTask(
						project,
						new task(
							item.title,
							item.description,
							item.dueDate,
							item.priority,
							item.isCompleted,
						),
					);
				});
			}

			displayProject();
		}
	};

	const createToDoOnReload = () => {
		changeToDoController();
		changeCurrentRawDataArray();

		let array = rawDataController.getRawDataArray(currentRawDataArrayKey);
		if (getToDoObject().getToDoArray().length === 0 && array.length !== 0) {
			array.forEach((item) => {
				getToDoObject().addTask(
					currentRawDataArrayKey,
					new task(
						item.title,
						item.description,
						item.dueDate,
						item.priority,
						item.isCompleted,
					),
				);
			});
			displayToDo();
		}
	};

	const createNotesOnReload = () => {
		changeCurrentRawDataArray("notes");
		console.log(currentRawDataArrayKey);

		let array = rawDataController.getRawDataArray(currentRawDataArrayKey);

		if (notesObject.getToDoArray().length === 0 && array.length !== 0) {
			array.forEach((item) => {
				notesObject.addTask(
					currentRawDataArrayKey,
					new notes(item.title, item.description),
				);
			});
		}
		deleteNote();
	};
	createNotesOnReload();
	createProjectsOnReload();

	createToDoOnReload();
	tabSwitchBtnsStyles();
}
