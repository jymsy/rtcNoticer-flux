var rtcDispatcher = require('../dispatcher/rtcDispatcher');
var rtcConstants = require('../constants/rtcConstants');

var rtcActions = {
	/**
	 * create new filter
	 */
	createFilter: function(id, name) {
		rtcDispatcher.dispatch({
			actionType: rtcConstants.RTC_FILTER_CREATE,
			id: id,
			name: name
		});
	},
	deleteFilter: function(id) {
		rtcDispatcher.dispatch({
			actionType: rtcConstants.RTC_FILTER_DELETE,
			id: id
		});
	}
};

module.exports = rtcActions;