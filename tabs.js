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

function getCurrentWindowTabs() {
    return browser.tabs.query({currentWindow: true,
			       url: "*://*.youtube.com/watch?*"});
}

document.addEventListener("click", (e) => {
    function callOnActiveTab(callback) {
	getCurrentWindowTabs().then((tabs) => {
	    for (var tab of tabs) {
		
		if (tab.active) {
		    callback(tab, tabs);
		}
	    }
	});
    }
    if (e.target.classList.contains('switch-tabs')) {
	var tabId = +e.target.getAttribute('href');
	
	browser.tabs.query({
	    currentWindow: true
	}).then((tabs) => {
	    for (var tab of tabs) {
		if (tab.id === tabId) {
		    browser.tabs.update(tabId, {
			active: true
		    });
		}
	    }
	});
    }

    e.preventDefault();
});
