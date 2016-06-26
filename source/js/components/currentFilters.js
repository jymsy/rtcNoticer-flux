var React = require('react');
var FilterRow = require('./filterRow');
var filterStore = require('../stores/filterStore');

var CurrentFilters = React.createClass({
  getInitialState: function() {
    // var currentFilterList = JSON.parse(localStorage.filter);
    return {
      list: filterStore.getAllFilters()
    };
  },
  componentDidMount: function() {
    // PubSub.subscribe(reloadFilterEvt, function(){
    //   var currentFilterList = JSON.parse(localStorage.filter);
    //   this.setState({list: currentFilterList});
    // }.bind(this));
    filterStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    // PubSub.unsubscribe(reloadFilterEvt);
    filterStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    // var currentFilterList = JSON.parse(localStorage.filter);
    this.setState({
      list: filterStore.getAllFilters()
    });
  },
  handleDeleteFilter: function(filter) {
    var deleteIndex;
    var currentFilter = JSON.parse(localStorage.filter);

    for (var i = currentFilter.length - 1; i >= 0; i--) {
      if (currentFilter[i].id == filter.id) {
        deleteIndex = i;
        break;
      }
    }

    currentFilter.splice(i, 1);
    localStorage.filter = JSON.stringify(currentFilter);
    this.setState({
      list: currentFilter
    });
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