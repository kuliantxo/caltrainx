import React from 'react';
import { location, second2str, time_relative, now, is_defined } from '../services/home.js';
import d3 from 'd3';
import { feature } from 'topojson';

class Peninsula extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
  }

  componentDidMount() {
    let width = 580,
      height = 600;

    // set projection
    let projection = d3.geo.mercator();

    // create path variable
    let path = d3.geo.path()
      .projection(projection);

    d3.json("/json/Bay_Area_Cities_topo.json", function(error, topo) {
    	let zones = feature(topo, topo.objects.Bay_Area).features,
        calendar = this.props.calendar,
        calendar_dates = this.props.calendar_dates,
        stops = this.props.stops,
        routes = this.props.routes;

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

      let a = [];

      Object.keys(stops).forEach(function(stop) {
        a.push([stops[stop][2],stops[stop][3],stop]);
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

      function update(results, direction = 'north') {
console.log('results', results);
        let chunck = ' l 4 8 l -8 0 z';
        if (direction == 'south') {
          chunck = ' l 4 -8 l -8 0 z';
        }

        let selection = svg.selectAll("path."+direction)
          .data(results)
          // .attr("class", "train")
          .attr('d', function(d) {
            return 'M ' + projection(d)[0] +' '+ projection(d)[1] + chunck;
          })
          .attr("stroke", "red")
          .attr("fill", "orange");

        selection.enter()
          .append("path")
          .attr("class", direction)
          .attr('d', function(d) {
            return 'M ' + projection(d)[0] +' '+ projection(d)[1] + chunck;
          })
          .attr("stroke", "green")
          .attr("fill", "green")
          .append("svg:title")
          .text(function(d) {
            return d[2];
          });

        selection.exit().remove();
      }

      update(location(calendar, calendar_dates, stops, routes)[0]), 'north';
      update(location(calendar, calendar_dates, stops, routes)[1], 'south');

      setInterval(function() {
        update(location(calendar, calendar_dates, stops, routes)[0]), 'north';
        update(location(calendar, calendar_dates, stops, routes)[1], 'south');
      }, 10000);
    }.bind(this));
  }

  render() {
    return(
      <div className="map"></div>
    );
  }
}

export default Peninsula;
