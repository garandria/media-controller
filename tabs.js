/**
 * listTabs to switch to
 */
function listTabs() {
    getCurrentWindowTabs().then((tabs) => {
	let tabsList = document.getElementById('tabs-list');
	let currentTabs = document.createDocumentFragment();
	
	for (let tab of tabs) {
	    let tabLink = document.createElement('a');
	    tabLink.textContent = tab.title || tab.id;
	    tabLink.setAttribute('href', tab.id);
	    tabLink.classList.add('switch-tabs');
	    currentTabs.appendChild(tabLink);
	}

	tabsList.appendChild(currentTabs);
    });
}

document.addEventListener("DOMContentLoaded", listTabs);
