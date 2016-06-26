var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';


var followStore = assign({}, EventEmitter.prototype, {
	getAllFollows: function() {
		return JSON.parse(localStorage.focusingOn);
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

module.exports = followStore;