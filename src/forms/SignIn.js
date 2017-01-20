import React from 'react';
import { Col, FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import auth from '../services/auth';
import Input from './Input';
import Checkbox from './Checkbox';

// https://clozeit.wordpress.com/2014/01/13/bootstrap-forms-using-react-js/
// http://stackoverflow.com/questions/27864951/how-to-access-childs-state-in-react
// https://github.com/reactjs/react-router/blob/master/examples/auth-flow/auth.js
// http://www.tech-dojo.org/#!/articles/5697fd5ddb99acd646dea1aa
// https://github.com/tech-dojo/react-showcase

var Form = React.createClass({
  propTypes: {
    callback: React.PropTypes.func.isRequired,
  },
  getInitialState() {
    return {};
  },
  getDefaultProps: function() {
    console.log('Form: getDefaultProps', this.props);
    return {
      bsClass: "form"
    };
  },
  handleFieldChange: function(field, value) {
    console.log('handleFieldChange', field, value);
    var newState = {};
    newState[field] = value;
    this.setState(newState);
  },
  onSubmit: function(e) {
    console.log('Form: onSubmit', e.target);
    e.preventDefault();
    this.props.callback(this.state.email.value, this.state.password.value);
  },
  render: function(){
    console.log('Form: render', this.props);
    console.log('Form: render children', this.props.children);
    var thisChildren = React.Children.map(this.props.children, function(child){
      console.log('Form: render child', child);
      // if (child.type === RadioOption) {
        return React.cloneElement(child, {
          onChange: this.handleFieldChange
        });
      // }
      // return child;
    }, this);
    console.log('Form: render children last', thisChildren);
    return (
      <form onSubmit={this.onSubmit} className={this.props.bsStyle} role="form" noValidate>
        { thisChildren }
      </form>
    );
  }
});

let SignIn = React.createClass({
  handleSignin: function(email, password) {
    console.log('Form: handleSignin', email, password);
    auth.login(email, password, (loggedIn) => {
      if (!loggedIn) {
        alert( "Login Failed" );
//        return this.setState({ error: "Login Failed" })
      }
    })
  },
  render: function() {
    return (
      <Form bsStyle="inline" callback={this.handleSignin}>
        <Input key={1} name="email" type="email" placeholder="Email" required={true}/>
        <Input key={2} name="password" type="password" placeholder="Password"
          required={true} minLength={5}/>
        <Checkbox key={3} name="remember" type="checkbox" label="Remember me" />
        <Button key={4} type="submit" bsStyle="primary">
          Sign In
        </Button>
      </Form>
    );
  }
});

export default SignIn;
