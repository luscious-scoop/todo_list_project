export function setLocalStorageItem(name, param) {
	localStorage.setItem(name, JSON.stringify(param));
}

export function getLocalStorageItem(name) {
	return JSON.parse(localStorage.getItem(name));
}
