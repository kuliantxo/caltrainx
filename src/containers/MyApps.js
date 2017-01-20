import React from 'react';
import CardsCarousel from '../components/cards-carousel/CardsCarousel.js';

let MyApps = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    fetch('../../json/my.json')
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        console.log('parsed json', json)
        this.setState({data: json});
      }.bind(this)).catch(function(ex) {
        console.log('parsing failed', ex)
      });
  },
  render() {
    return(
      <div>
        <h1>My Apps</h1>
        <CardsCarousel carId='myCar' data={ this.state.data } />
      </div>
    );
  }
});

export default MyApps;
