import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

var Checkbox = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(['email', 'password', 'checkbox']).isRequired,
    placeholder: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool,
    oneOf: React.PropTypes.array,
    minLength: React.PropTypes.int
  },
  getInitialState: function() {
    console.log('Input: getInitialState');
    return {
      value: '',
      error: ''
    };
  },
  getValidationState: function(e){
    console.log('Input: getValidationState');
    var value = this.state.value;
    if (this.props.required && !value) {
      this.state.error = 'This field is required';
      return 'error';
    } else if (this.props.oneOf && !(value in this.props.oneOf)) {
      this.state.error = 'oneOf';
      return 'error';
    } else if (this.props.minLength && value.length < this.props.minLength) {
      this.state.error = 'This field requires a minimum of ' + this.props.minLength + ' characters';
      return 'error';
    }
    this.state.error = '';
  },
  onChange: function(e) {
    console.log('Input: onChange');
    e.stopPropagation();
    this.setState({value: this.refs.input.value});
    this.props.onChange(this.props.name, {error: this.state.error, value: this.refs.input.value});
  },
  renderInput: function(){
    console.log('Input: renderInput');
    var className = '';
    if(['email', 'password'].indexOf(this.props.type) > -1) {
      className = "form-control input-md";
    }
    return (
      <label>
        <input type={this.props.type} className={className}
          placeholder={this.props.placeholder} ref="input"
          onChange={ this.onChange } />
        {this.props.label}
      </label>
    );
  },
  renderError: function(){
    console.log('Input: renderError');
    return <span class="error-block">{ this.state.error }</span> ? this.state.error : undefined;
  },
  render: function(){
    console.log('Input: render', this.props);
    console.log('Input: render', ['email', 'password'].indexOf(this.props.type));
    var className = "form-group";
    // if (this.state.error) {
    //   className += ' has-error';
    // }
    console.log('Input: render', className);
    return (
      <FormGroup validationState={this.getValidationState()}>
        <pre>{ this.state && this.state.error }</pre>
        <pre>{ this.state && this.state.value }</pre>
        { this.renderInput() }
        { this.renderError() }
      </FormGroup>
    );
  }
});

export default Checkbox;
