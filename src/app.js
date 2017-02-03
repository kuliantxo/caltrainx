import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, IndexRoute } from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import App from './containers/App.js';
import Home from './containers/Home.js';
import Map from './containers/Map.js';

ReactDOM.render(
  (<Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/map" component={Map} />
    </Route>
  </Router>), document.getElementById('app')
);
