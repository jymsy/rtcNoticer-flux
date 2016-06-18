var React = require('react');

var OptionsBox = React.createClass({
  handleChange: function(event) {
    localStorage.frequency = event.target.value;
  },
  render: function() {
    var freq = localStorage.frequency;
    return (
      <div id="options">
        <h2>Options</h2>
        <div className="row">
        <div className="col-lg-9 form-inline">
          Check new defects every
          <select className="form-control" defaultValue={freq} onChange={this.handleChange}>
            <option>10</option>
            <option>30</option>
            <option>60</option>
          </select>
          second(s).<br/>
        </div>
        </div>
      </div>
    );
  }
});

module.exports = OptionsBox;
