import React from 'react';
import { Form, FormGroup, Col, ControlLabel, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import CardsPagination from '../components/cards-pagination/CardsPagination.js';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      stops: {},
      routes: {},
      result: {},
      fromTitle: 'Departure',
      toTitle: 'Destination'
    };
  }

  componentDidMount() {
    fetch('/json/stops.json')
      .then(function(response) {
        return response.json()
      }).then(function(json) {
console.log('json', json);
        this.setState({stops: json});
      }.bind(this)).catch(function(ex) {
        console.log('parsing failed', ex)
      });
      fetch('/json/routes.json')
        .then(function(response) {
          return response.json()
        }).then(function(json) {
  console.log('json', json);
          this.setState({routes: json});
        }.bind(this)).catch(function(ex) {
          console.log('parsing failed', ex)
        });
  }

  handleFromSelect(title) {
    this.setState({ fromTitle: title });
  }

  handleToSelect(title) {
    this.setState({ toTitle: title });
  }

  handleClick(title) {
//    this.setState({ toTitle: title });
  }

  render() {
    let stops = this.state.stops;
    let routes = this.state.routes;
    let dropDownItem = Object.keys(stops).map(function(key, index) {
      return (
        <MenuItem key={ index } eventKey={ key }>
          { key }
        </MenuItem>
      );
    });
    let resultsItem = Object.keys(routes).map(function(key, index) {
      return (
        <li>{ key }</li>
      );
    });
    return(
      <div>
        <h4>Welcome!</h4>

        <Form horizontal>
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

          <button type="button">Reverse</button>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="button" onClick={ this.handleClick.bind(this, 'now')}>Now</Button>
              <Button type="button" onClick={ this.handleClick.bind(this, 'weekday')}>Weekday</Button>
              <Button type="button" onClick={ this.handleClick.bind(this, 'saturday')}>Saturday</Button>
              <Button type="button" onClick={ this.handleClick.bind(this, 'sunday')}>Sunday</Button>
            </Col>
          </FormGroup>
        </Form>

        <ul>
          { this.resultsItem }
        </ul>
      </div>
    );
  }
}

export default Home;
