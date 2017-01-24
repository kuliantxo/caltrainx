import React from 'react';
import { ListGroup, ListGroupItem, Form, FormGroup, Col, ControlLabel, Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import CardsPagination from '../components/cards-pagination/CardsPagination.js';
import { schedule, second2str, time_relative } from '../services/home.js';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      calendar: {},
      calendar_dates: {},
      stops: {},
      routes: {},
      results: [],
      fromTitle: 'Departure',
      toTitle: 'Destination'
    };
  }

  componentWillMount() {
console.log('componentWillMount calendar', this.state.calendar);
console.log('componentWillMount calendar_dates', this.state.calendar_dates);
console.log('componentWillMount stops', this.state.stops);
console.log('componentWillMount routes', this.state.routes);
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

  componentDidMount() {
console.log('componentDidMount calendar', this.state.calendar);
console.log('componentDidMount calendar_dates', this.state.calendar_dates);
console.log('componentDidMount stops', this.state.stops);
console.log('componentDidMount routes', this.state.routes);
    schedule();
  }

  handleFromSelect(title) {
    this.setState({ fromTitle: title });
  }

  handleToSelect(title) {
    this.setState({ toTitle: title });
  }

  handleClick(title) {
    let calendar = this.state.calendar;
    let calendar_dates = this.state.calendar_dates;
    let stops = this.state.stops;
    let routes = this.state.routes;
    let results = schedule(calendar, calendar_dates, stops, routes, this.state.fromTitle, this.state.toTitle);
    this.setState({ results: results });
  }

  render() {
console.log('render calendar', this.state.calendar);
console.log('render calendar_dates', this.state.calendar_dates);
console.log('render stops', this.state.stops);
console.log('render routes', this.state.routes);
    let stops = this.state.stops;
    let results = this.state.results;

    let dropDownItem = Object.keys(stops).map(function(key, index) {
      return (
        <MenuItem key={ index } eventKey={ key }>
          { key }
        </MenuItem>
      );
    });
    let resultItems = results.map(function(trip, index) {
      return (
        <ListGroupItem key={ index }>
          <span className="departure">{ second2str(trip.departure_time) }</span>
          <small className="duration">{ time_relative(trip.departure_time, trip.arrival_time) } min</small>
          <span className="arrival">{ second2str(trip.arrival_time) }</span>
        </ListGroupItem>
      );
    });
    return(
      <div>
        <Form horizontal className="schedule-form">
          <FormGroup controlId="formHorizontalFrom">
            <Col componentClass={ControlLabel} sm={2}>
              From
            </Col>
            <Col sm={10}>
              <DropdownButton id="dd1" bsStyle="default" title={ this.state.fromTitle } onSelect={ this.handleFromSelect.bind(this) }>
                { dropDownItem }
              </DropdownButton>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalTo">
            <Col componentClass={ControlLabel} sm={2}>
              To
            </Col>
            <Col sm={10}>
              <DropdownButton id="dd2" bsStyle="default" title={ this.state.toTitle } onSelect={ this.handleToSelect.bind(this) }>
                { dropDownItem }
              </DropdownButton>
            </Col>
          </FormGroup>

          <Button bsStyle="link revert-btn"><span className="glyphicon glyphicon-refresh" aria-hidden="true"></span></Button>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <ButtonGroup>
                <Button onClick={ this.handleClick.bind(this, 'now')}>Now</Button>
                <Button onClick={ this.handleClick.bind(this, 'weekday')}>Weekday</Button>
                <Button onClick={ this.handleClick.bind(this, 'saturday')}>Saturday</Button>
                <Button onClick={ this.handleClick.bind(this, 'sunday')}>Sunday</Button>
              </ButtonGroup>
            </Col>
          </FormGroup>
        </Form>

        <ListGroup>
          { resultItems }
        </ListGroup>
      </div>
    );
  }
}

export default Home;
