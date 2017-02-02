import React from 'react';
import { ListGroup, ListGroupItem, Form, FormGroup, Row, Col, ControlLabel, Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { location, second2str, time_relative, now, is_defined } from '../services/home.js';
import d3 from 'd3';
import { feature } from 'topojson';

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

    let width = 580,
      height = 600;

    // set projection
    let projection = d3.geo.mercator();

    // create path variable
    let path = d3.geo.path()
      .projection(projection);

    d3.json("/json/Bay_Area_Cities_topo.json", function(error, topo) {
    	let zones = feature(topo, topo.objects.Bay_Area).features;

    	// set projection parameters
    	projection
        .scale(30000)
        .center([-121.7, 37.5]);

      // create svg variable
      let svg = d3.select(".map").append("svg")
				.attr("width", width)
				.attr("height", height);

    	// add zones from topojson
    	svg.selectAll("path")
        .data(zones).enter()
        .append("path")
        .attr("class", "feature")
        .style("fill", "khaki")
        .attr("d", path);

      fetch(`/json/stops.json`)
        .then(function(response) {
          return response.json()
        }).then(function(json) {
          let a = [];
          Object.keys(json).forEach(function(name) {
            a.push([json[name][3],json[name][2],name]);
          });
          svg.selectAll("circle")
            .data(a).enter()
            .append("circle")
            .attr("cx", function (d) { return projection(d)[0]; })
            .attr("cy", function (d) { return projection(d)[1]; })
            .attr("r", "3px")
            .attr("stroke", "darkgray")
            .attr("fill", "lightgray")
            .append("svg:title")
            .text(function(d) {
              return d[2];
            });
        }.bind(this)).catch(function(ex) {
          console.log('parsing failed', ex)
        });
    });
  }

  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  render() {
    let calendar = this.state.calendar;
    let calendar_dates = this.state.calendar_dates;
    let stops = this.state.stops;
    let routes = this.state.routes;
    let results = {};

    console.log('state', this.state);
    if (!this.isEmpty(calendar) && !this.isEmpty(calendar_dates) && !this.isEmpty(stops) && !this.isEmpty(routes)) {
      results = location(calendar, calendar_dates, stops, routes);
    }
    console.log('results', results);

    return(
      <div className="map"></div>
    );
  }
}

export default Map;
