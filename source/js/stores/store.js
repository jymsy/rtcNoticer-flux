var rtcDispatcher = require('../dispatcher/rtcDispatcher');
var EventEmitter = require('events').EventEmitter;
var rtcConstants = require('../constants/rtcConstants');
var assign = require('object-assign');

rtcDispatcher.register(function(action) {
	switch(action.actionType) {

	}
});

module.exports = rtcStore;
