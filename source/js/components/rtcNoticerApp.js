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
        <div className="left-panel">
          <Following />
          <CurrentFilters />
          <NewFilter />
        </div>
        <div className="right-panel">
          <OptionsBox />
          <TodayItems />
        </div>
      </div>
    );
  }
});

module.exports = rtcNoticer;