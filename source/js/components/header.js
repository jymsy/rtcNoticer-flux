var React = require('react');

var Header = React.createClass({
  render: function() {
    return (
    <div className="header-panel">
        <h1>
            <img src={'../../img/64.png'} alt="Toast"/>
                RTC Notification
        </h1>
    </div>
    );
  }
});

module.exports = Header;
