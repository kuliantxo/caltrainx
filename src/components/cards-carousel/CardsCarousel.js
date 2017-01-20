import React from 'react';
import AppCardComp from '../cards/Cards.js';
import {React_Boostrap_Carousel} from 'react-boostrap-carousel';
require("./carousel.less");

var CardsCarousel = React.createClass({
  render: function() {
    var rating = [], tmp = [], isActive = 'item active';
    for(var i = 0, l = this.props.data.length; i < l; i++) {
      if ((i > 0) && (i % 4 == 0)) {
        rating.push(<div key={ i } className={ isActive }><AppCardComp data={ tmp } /></div>);
        isActive = 'item';
        tmp = [];
      }
      tmp.push(this.props.data[i]);
    }
    if (tmp.length > 0) {
      rating.push(<div key={ i } className='item'><AppCardComp data={ tmp } /></div>);
    }
    return (
      <React_Boostrap_Carousel animation={true} className="carousel-fade">
        { rating }
      </React_Boostrap_Carousel>
    );
  }
});

export default CardsCarousel;
