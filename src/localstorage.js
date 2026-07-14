export function setLocalStorageItem(name, param) {
	localStorage.setItem(name, JSON.stringify(param));
}

export function getLocalStorageItem(name) {
	return JSON.parse(localStorage.getItem(name));
}

export function projectsRawDataController() {
	let projectRawData = getLocalStorageItem("projectsRawObjectData") || {
		df: [],
	};

	const updateData = () => {
		setLocalStorageItem("projectsRawObjectData", projectRawData);
	};

	const AddRawDataArray = (key) => {
		projectRawData[key] = [];
		updateData();
	};

	const removeObject = (key, index) => {
		projectRawData[key].splice(index, 1);
		updateData();
	};

	const editObject = (key, index, object) => {
		projectRawData[key][index].title = object.title;
		projectRawData[key][index].description = object.description;
		projectRawData[key][index].dueDate = object.dueDate;
		projectRawData[key][index].priority = object.priority;
		updateData();
	};

	const deleteArray = (key) => {
		delete projectRawData[key];
		updateData();
	};

	const isDuplicate = (key, title) => {
		let isDuplicate = false;
		let array = projectRawData[key];
		for (let i = 0; i < array.length; i++) {
			if (array[i].title === title) {
				isDuplicate = true;
				return isDuplicate;
			}
		}
		return isDuplicate;
	};

	const addObject = (key, object) => {
		if (isDuplicate(key, object.title)) {
			return;
		}

		projectRawData[key].push({
			title: object.title,
			description: object.description,
			dueDate: object.dueDate,
			priority: object.priority,
			isCompleted: object.isCompleted,
		});
		updateData();
	};

	const toggleDataStatus = (key, index, status) => {
		let array = projectRawData[key];
		console.log(array);
		array[index].isCompleted = status;
		updateData();
	};

	const getRawDataArray = (key) => {
		return projectRawData[key];
	};

	return {
		getRawDataArray,
		toggleDataStatus,
		addObject,
		deleteArray,
		editObject,
		removeObject,
		AddRawDataArray,
	};
}
