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
    var width = 450,
        height = 450;

    // set projection
    var projection = d3.geo.mercator();

    // create path variable
    var path = d3.geo.path()
        .projection(projection);


    d3.json("/json/Bay_Area_Cities_topo.json", function(error, topo) { console.log(topo);
console.log('feature', feature);
      	var states = feature(topo, topo.objects.Bay_Area).features

      	// set projection parameters
      	projection
          .scale(30000)
          .center([-121.7, 37.5])

        // create svg variable
        var svg = d3.select("body").append("svg")
        				.attr("width", width)
        				.attr("height", height);

        // points
        var aa = [-122.5, 37.5];
    	var bb = [-122.6, 37.5];

    	console.log(projection(aa),projection(bb));

    	// add states from topojson
    	svg.selectAll("path")
          .data(states).enter()
          .append("path")
          .attr("class", "feature")
          .style("fill", "steelblue")
          .attr("d", path);

        // put boarder around states
      	// svg.append("path")
        //   .datum(topojson.mesh(topo, topo.objects.states, function(a, b) { return a !== b; }))
        //   .attr("class", "mesh")
        //   .attr("d", path);

        // add circles to svg
        svg.selectAll("circle")
    		.data([aa,bb]).enter()
    		.append("circle")
    		.attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
    		.attr("cy", function (d) { return projection(d)[1]; })
    		.attr("r", "8px")
    		.attr("fill", "red")

    });
  }

  render() {
    return(
      <div>Map</div>
    );
  }
}

export default Map;
