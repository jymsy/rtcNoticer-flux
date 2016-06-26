/*
 *
 * AppDispatcher
 *
 * A singleton that operates as the central hub for application updates.
 */
var filterStore = require('../stores/filterStore');
var followStore = require('../stores/followStore');
var rtcConstants = require('../constants/rtcConstants');
var Dispatcher = require('flux').Dispatcher;
var rtcDispatcher = new Dispatcher();

rtcDispatcher.register(function(action) {

	switch (action.actionType) {
		case rtcConstants.RTC_FILTER_CREATE:
			var currentFilter = filterStore.getAllFilters();
			currentFilter.push({
				name: action.name,
				id: action.id,
				lastModifyDate: "1"
			});
			localStorage.filter = JSON.stringify(currentFilter);
			filterStore.emitChange();
			break;
		case rtcConstants.RTC_FILTER_DELETE:
			var currentFilter = filterStore.getAllFilters();
			var deleteIndex;
			for (var i = currentFilter.length - 1; i >= 0; i--) {
				if (currentFilter[i].id == action.id) {
					deleteIndex = i;
					break;
				}
			}

			currentFilter.splice(i, 1);
			localStorage.filter = JSON.stringify(currentFilter);
			filterStore.emitChange();
			break;
		case rtcConstants.RTC_FOLLOW_CREATE:
			followStore.emitChange();
			break;
		case rtcConstants.RTC_FOLLOW_DELETE:
			var focusingOnList = followStore.getAllFollows();
			for (var i = focusingOnList.length - 1; i >= 0; i--) {
				if (focusingOnList[i].id == action.id) {
					deleteIndex = i;
					break;
				}
			}

			focusingOnList.splice(i, 1);
			localStorage.focusingOn = JSON.stringify(focusingOnList);
			followStore.emitChange();
			break;
		default:
			break;
	}

});

module.exports = rtcDispatcher;