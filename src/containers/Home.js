import React from 'react';
import { Form, FormGroup, Col, ControlLabel, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import CardsPagination from '../components/cards-pagination/CardsPagination.js';

let Home = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    fetch('/json/stops.json')
      .then(function(response) {
        return response.json()
      }).then(function(json) {
console.log('json', json);
        this.setState({stops: json});
      }.bind(this)).catch(function(ex) {
        console.log('parsing failed', ex)
      });
  },
  handleSelect: function() {
console.log('arguments', arguments);
  },
  render() {
    var data = this.state.stops || {};
    var dropDownItem = Object.keys(data).map(function(key, index) {
      return (
        <MenuItem key={ index } eventKey={ key }>
          { key }
        </MenuItem>
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
              <DropdownButton id="dd1" bsStyle="default" title="Departure" onSelect={ this.handleSelect }>
                { dropDownItem }
              </DropdownButton>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalTo">
            <Col componentClass={ControlLabel} sm={2}>
              To
            </Col>
            <Col sm={10}>
              <DropdownButton id="dd2" bsStyle="default" title="Destination">
                { dropDownItem }
              </DropdownButton>
            </Col>
          </FormGroup>

          <button type="button">Reverse</button>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="button">Now</Button>
              <Button type="button">Weekday</Button>
              <Button type="button">Saturday</Button>
              <Button type="button">Sunday</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
});

export default Home;
