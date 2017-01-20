import React from 'react';
import CardsPagination from '../components/cards-pagination/CardsPagination.js';

let Home = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    fetch('../../json/all.json')
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        this.setState({data: json});
      }.bind(this)).catch(function(ex) {
        console.log('parsing failed', ex)
      });
  },
  render() {
    return(
      <div>
        <h1>All Apps</h1>
        <CardsPagination data={ this.state.data } />
      </div>
    );
  }
});

export default Home;
