import React from 'react';
import AppCardBoxComp from '../components/cards/Cards.js';

let CategoryTitle = React.createClass({
  getInitialState: function() {
    return {title: ''};
  },
  updateTitle: function(prop) {
    fetch('../../json/categories.json')
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        console.log('parsed json', json)
        this.setState({title: json[prop].name});
      }.bind(this)).catch(function(ex) {
        console.log('parsing failed', ex)
      });
  },
  componentWillReceiveProps: function(nextProps) {
    this.updateTitle(nextProps.cat);
  },
  componentDidMount: function() {
    this.updateTitle(this.props.cat);
  },
  render() {
    return(
      <h1>{ this.state.title }</h1>
    );
  }
});

let Category = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    fetch('../../json/my.json')
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        this.setState({data: json});
      }.bind(this)).catch(function(ex) {
        console.log('parsing failed', ex)
      });
  },
  render() {
    console.log('Category', this.props);
    return(
      <div>
        <CategoryTitle cat={ this.props.params.cat } />
        <AppCardBoxComp data={ this.state.data } />
      </div>
    );
  }
});

export default Category;
