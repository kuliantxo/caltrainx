import React from 'react';
import { ListGroup, ListGroupItem, Form, FormGroup, Row, Col, ControlLabel, Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { schedule, second2str, time_relative, now, is_defined } from '../services/home.js';
import d3 from 'd3';
import { feature } from 'topojson';

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    let width = 450,
      height = 450;

    // set projection
    let projection = d3.geo.mercator();

    // create path variable
    let path = d3.geo.path()
      .projection(projection);

    d3.json("/json/Bay_Area_Cities_topo.json", function(error, topo) {
      console.log('topo', topo);
    	let zones = feature(topo, topo.objects.Bay_Area).features;
console.log('zones', zones);
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
        .style("fill", "steelblue")
        .attr("d", path);

      fetch(`/json/stops.json`)
        .then(function(response) {
          return response.json()
        }).then(function(json) {
          let a = [];
          Object.keys(json).forEach(function(name) {
            a.push([json[name][3],json[name][2]]);
          });
          svg.selectAll("circle")
            .data(a).enter()
            .append("circle")
            .attr("cx", function (d) { console.log('pro', projection(d)); return projection(d)[0]; })
            .attr("cy", function (d) { return projection(d)[1]; })
            .attr("r", "2px")
            .attr("fill", "#666");
        }.bind(this)).catch(function(ex) {
          console.log('parsing failed', ex)
        });
    });
  }

  render() {
    return(
      <div className="map"></div>
    );
  }
}

export default Map;
