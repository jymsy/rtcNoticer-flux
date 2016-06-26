var Header = require('./header');
var OptionsBox = require('./optionBox');
var Following = require('./follow');
var TodayItems = require('./todayItems');
var CurrentFilters = require('./currentFilters');
var NewFilter = require('./newFilter');
var React = require('react');


var rtcNoticer = React.createClass({


  render: function() {
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