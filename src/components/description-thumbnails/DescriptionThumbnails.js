import React from 'react';
require("./thumbnails.less");

let DescriptionThumbnails = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      selected: 0
    };
  },
  updateProps: function(prop) {
    this.setState({ data: prop.data });
  },
  componentWillReceiveProps: function(nextProps) {
    this.updateProps(nextProps);
  },
  handleClick: function(i, e) {
    this.state.selected = i;
    this.props.onImageClick(i);
  },
  render: function() {
    console.log('AppCardImages', this.props);
    var imageNodes = this.state.data.map(function(image, index) {
      var selected = (index == this.state.selected) ? ' selected' : '';
      return (
        <div key={ index } className="col-sm-6">
          <div className={ 'thumbnail thumbnail-description' + selected } onClick={ this.handleClick.bind(this, index) }>
            <img src={ image.url } alt={ image.title } title={ image.title } />
          </div>
        </div>
      );
    }, this);
    return (
      <div className="col-sm-5">
        <div className="row">
          { imageNodes }
        </div>
      </div>
    );
  }
});

export default DescriptionThumbnails;
