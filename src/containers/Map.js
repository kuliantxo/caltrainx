import React from 'react';
import Peninsula from '../components/Peninsula.js';

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      calendar: {},
      calendar_dates: {},
      stops: {},
      routes: {},
      results: []
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    const names = ["calendar", "calendar_dates", "stops", "routes"];
    names.forEach(function(name) {
      fetch(`/json/${ name }.json`)
        .then(function(response) {
          return response.json()
        }).then(function(json) {
          this.setState({[name]: json});
        }.bind(this)).catch(function(ex) {
          console.log('parsing failed', ex)
        });
    }.bind(this));
  }

  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  render() {
    let calendar = this.state.calendar;
    let calendar_dates = this.state.calendar_dates;
    let stops = this.state.stops;
    let routes = this.state.routes;

    if (
      !this.isEmpty(calendar) &&
      !this.isEmpty(calendar_dates) &&
      !this.isEmpty(stops) &&
      !this.isEmpty(routes)) {
      return (
        <Peninsula calendar={ calendar } calendar_dates={ calendar_dates } stops={ stops } routes={ routes } />
      )
    }

    return(
      <div>Loading...</div>
    );
  }
}

export default Map;
