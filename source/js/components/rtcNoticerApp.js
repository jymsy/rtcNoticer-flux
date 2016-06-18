
var Header = require('./header.js');
var OptionsBox = require('./optionBox.js');
var Following = require('./follow.js');
var TodayItems = require('./todayItems.js');
var CurrentFilters = require('./currentFilters.js');
var NewFilter = require('./newFilter.js');
var React = require('react');
var appStore = require('../stores/store.js');

var rtcNoticer = React.createClass({
  render: function() {
    var focusingOnList = JSON.parse(localStorage.focusingOn);
    return (
      <div>
        <Header />
        <OptionsBox />
        <CurrentFilters />
        <NewFilter />
        <Following />
        <TodayItems />
      </div>
    );
  }
});

module.exports = rtcNoticer;