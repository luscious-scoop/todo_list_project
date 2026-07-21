export function setLocalStorageItem(name, param) {
	localStorage.setItem(name, JSON.stringify(param));
}

export function getLocalStorageItem(name) {
	return JSON.parse(localStorage.getItem(name));
}

export function projectsRawDataController() {
	let notesData = getLocalStorageItem("notesData") || [];
	let projectsRawData = getLocalStorageItem("projectsRawData") || {
		df: [],
	};

	const updateNotes = () => {
		setLocalStorageItem("notesData", notesData);
	};

	const updateData = () => {
		setLocalStorageItem("projectsRawData", projectsRawData);
	};

	const addRawData = (key, array = null) => {
		if (key === "notes") {
			notesData = [];
			array.forEach((item) => {
				notesData.push({
					...item,
				});
			});
			updateNotes();
			return;
		}
		projectsRawData[key] = [];

		if (!array) {
			updateData();
			return;
		}

		array.forEach((item) => {
			projectsRawData[key].push({
				...item,
			});
		});
		updateData();
	};

	const getRawDataArray = (key) => {
		if (key === "notes") {
			return notesData;
		}

		return projectsRawData[key];
	};

	const deleteArray = (key) => {
		delete projectsRawData[key];

		updateData();
	};

	return {
		getRawDataArray,
		deleteArray,

		addRawData,
	};
}
