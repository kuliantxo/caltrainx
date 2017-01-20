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
  render() {
    return(
      <div>
        <h4>Welcome!</h4>

        <Form horizontal>
          <FormGroup controlId="formHorizontalFrom">
            <Col componentClass={ControlLabel} sm={2}>
              From
            </Col>
            <Col sm={10}>
              <DropdownButton bsStyle="default" title="Departure">
                <MenuItem eventKey="1">Action</MenuItem>
                <MenuItem eventKey="2">Another action</MenuItem>
                <MenuItem eventKey="3" active>Active Item</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="4">Separated link</MenuItem>
              </DropdownButton>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalTo">
            <Col componentClass={ControlLabel} sm={2}>
              To
            </Col>
            <Col sm={10}>
              <DropdownButton bsStyle="default" title="Departure">
                <MenuItem eventKey="1">Action</MenuItem>
                <MenuItem eventKey="2">Another action</MenuItem>
                <MenuItem eventKey="3" active>Active Item</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="4">Separated link</MenuItem>
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
