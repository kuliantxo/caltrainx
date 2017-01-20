import React from 'react';
import DescriptionThumbnails from '../../components/description-thumbnails/DescriptionThumbnails.js'
import SignIn from '../../forms/SignIn.js'
import { Col, Modal, Button } from 'react-bootstrap';
require("./description.less");

let AppCardTop = React.createClass({
  getInitialState() {
    return { showModal: false };
  },
  close() {
    this.setState({ showModal: false });
  },
  open() {
    this.setState({ showModal: true });
  },
  render: function() {
    console.log('AppCardTop', this.props);
    return (
      <div className="row">
        <div className="col-sm-8">
          <h3>
            { this.props.data.name }
          </h3>
          <div>
            { this.props.data.tagline }
          </div>
        </div>
        <div className="col-sm-4 text-right">
          <button className="btn btn-lg btn-primary" onClick={this.open}>Learn More</button>
        </div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SignIn />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

let AppCardDescription = React.createClass({
  getInitialState: function() {
    return {image: {}};
  },
  updateProps: function(prop) {
    this.setState({ image: prop.data.images[0] });
  },
  componentWillReceiveProps: function(nextProps) {
    this.updateProps(nextProps);
  },
  handleImageClick: function(i) {
    this.setState({image: this.props.data.images[i]});
  },
  render: function() {
    console.log('AppCardDescription', this.props);
    var bigImage = <img src={ this.state.image.url } alt={ this.state.image.title } title={ this.state.image.title } />;
    if ( this.state.image.iframe ) {
      bigImage = <iframe name="player-iframe" id="appCardVideo" frameBorder="0" title="YouTube video player" width="640" height="400" src={ this.state.image.iframe }></iframe>
    }
    return (
      <div className="row">
        <div className="col-sm-7 big-image">
          { bigImage }
          <h3>
            Description
          </h3>
          <div>
            { this.props.data.description }
          </div>
        </div>
        <DescriptionThumbnails onImageClick={this.handleImageClick} data={ this.props.data.images } />
      </div>
    );
  }
});

let Description = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    fetch('../../json/description.json')
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        this.setState({data: json});
      }.bind(this)).catch(function(ex) {
        console.log('parsing failed', ex)
      });
  },
  render() {
    return(
      <div>
        <AppCardTop data={ this.state.data } />
        <AppCardDescription data={ this.state.data } />
      </div>
    );
  }
});

export default Description;
