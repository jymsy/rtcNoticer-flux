var React = require('react');
var FilterRow = require('./filterRow');
var filterStore = require('../stores/filterStore');
var rtcActions = require('../actions/rtcActions');

var CurrentFilters = React.createClass({
  getInitialState: function() {
    return {
      list: filterStore.getAllFilters()
    };
  },
  componentDidMount: function() {
    filterStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    filterStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      list: filterStore.getAllFilters()
    });
  },
  handleDeleteFilter: function(filter) {
    rtcActions.deleteFilter(filter.id);
  },
  render: function() {
    var rows = [];
    this.state.list.forEach(function(item) {
      rows.push(<FilterRow item={item} onDeleted={this.handleDeleteFilter} />);
    }.bind(this));
    return (
      <section>
        <h2>Current filters:</h2>
        <div className="row">
          <div className="col-lg-6">
          <table className="table table-bordered" id="filter">
            <thead>
                <tr>
                    <th>name</th>
                    <th>id</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
          </div>
          </div>
      </section>
    );
  }
});

module.exports = CurrentFilters;