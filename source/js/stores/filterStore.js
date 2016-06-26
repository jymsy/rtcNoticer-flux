// var rtcDispatcher = require('../dispatcher/rtcDispatcher');
var EventEmitter = require('events').EventEmitter;
// var rtcConstants = require('../constants/rtcConstants');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';


var filterStore = assign({}, EventEmitter.prototype, {
	getAllFilters: function() {
		return JSON.parse(localStorage.filter);
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

module.exports = filterStore;