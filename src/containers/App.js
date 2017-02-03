import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
require("../../file.less");

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Cal<span>train</span>X</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <IndexLinkContainer to='/'>
              <NavItem eventKey={1}>Schedule</NavItem>
            </IndexLinkContainer>
            <IndexLinkContainer to='/map'>
              <NavItem eventKey={2}>Map</NavItem>
            </IndexLinkContainer>
          </Nav>
        </Navbar>

        <section className="main">
          <div className="container">
            { this.props.children }
          </div>
        </section>

        <footer>
          <div className="container">
            <div className="copyright">
              &copy; CaltrainX 2017, Kuliantxo.<br/>
              Designed by Julian Miqueo.
            </div>
            <div className="copyright">
              Find more information at <a target="_blank" href="https://github.com/kuliantxo/caltrainx">Github</a>.
            </div>
          </div>
        </footer>
      </div>
    );
  }
});

export default App;
