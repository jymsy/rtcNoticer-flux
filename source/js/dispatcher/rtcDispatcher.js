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
	switch (action.actionType) {
		case rtcConstants.RTC_FILTER_CREATE:
			var currentFilter = JSON.parse(localStorage.filter);
			currentFilter.push({
				name: action.name,
				id: action.id,
				lastModifyDate: "1"
			});
			localStorage.filter = JSON.stringify(currentFilter);
			// PubSub.publish(reloadFilterEvt);
			filterStore.emitChange();
			break;
		default:
			break;
	}
});

module.exports = rtcDispatcher;