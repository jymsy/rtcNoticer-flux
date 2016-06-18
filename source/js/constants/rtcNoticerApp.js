
var Header = require('./header.js');
var OptionsBox = require('./optionBox.js');
var Following = require('./follow.js');
var TodayItems = require('./todayItems.js');
var React = require('react');
var appStore = require('../stores/store.js');

var rtcNoticer = React.createClass({
  render: function() {
    var focusingOnList = JSON.parse(localStorage.focusingOn);
    return (
      <div>
        <Header />
        <OptionsBox />
        <Following />
        <TodayItems />
      </div>
    );
  }
});

module.exports = rtcNoticer;