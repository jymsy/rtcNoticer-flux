/*
 *
 * AppDispatcher
 *
 * A singleton that operates as the central hub for application updates.
 */
var filterStore = require('../stores/filterStore');
var rtcConstants = require('../constants/rtcConstants');
var Dispatcher = require('flux').Dispatcher;
var rtcDispatcher = new Dispatcher();

rtcDispatcher.register(function(action) {
	var currentFilter = filterStore.getAllFilters();
	switch (action.actionType) {
		case rtcConstants.RTC_FILTER_CREATE:
			currentFilter.push({
				name: action.name,
				id: action.id,
				lastModifyDate: "1"
			});
			break;
		case rtcConstants.RTC_FILTER_DELETE:
			var deleteIndex;
			for (var i = currentFilter.length - 1; i >= 0; i--) {
				if (currentFilter[i].id == action.id) {
					deleteIndex = i;
					break;
				}
			}

			currentFilter.splice(i, 1);
			break;
		default:
			break;
	}
	localStorage.filter = JSON.stringify(currentFilter);
	filterStore.emitChange();
});

module.exports = rtcDispatcher;