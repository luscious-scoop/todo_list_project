export function screenController() {
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

		const descriptionInput = document.createElement("textarea");
		descriptionInput.rows = "10";
		descriptionInput.cols = "100";
		descriptionInput.style.resize = "none";

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
	};
	addBtn.addEventListener("click", showForm);
	closeBtn.addEventListener("click", closeForm);
}
