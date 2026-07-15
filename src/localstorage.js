export function setLocalStorageItem(name, param) {
	localStorage.setItem(name, JSON.stringify(param));
}

export function getLocalStorageItem(name) {
	return JSON.parse(localStorage.getItem(name));
}

export function projectsRawDataController() {
	let projectsRawData = getLocalStorageItem("projectsRawData") || {
		df: [],
		notes: [],
	};

	const updateData = () => {
		setLocalStorageItem("projectsRawData", projectsRawData);
	};

	const addRawData = (key, array = null) => {
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
