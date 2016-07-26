var React = require('react');

var OptionsBox = React.createClass({
  handleChange: function(event) {
    localStorage.frequency = event.target.value;
  },
  render: function() {
    var freq = localStorage.frequency;
    var customStyle = {
      "margin-left": "0",
      "margin-right": "0"
    };
    return (
      <div id="options">
        <h2 className = "title-text">Options:</h2>
        <div className="row" style={customStyle}>
        <div className="col-lg-9 form-inline">
          <span className = "normal-text">Check new defects every </span>
          <select className="form-control" defaultValue={freq} onChange={this.handleChange}>
            <option>10</option>
            <option>30</option>
            <option>60</option>
          </select>
          <span className = "normal-text"> second(s).</span><br/>
        </div>
        </div>
      </div>
    );
  }
});

module.exports = OptionsBox;
