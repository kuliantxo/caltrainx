import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, IndexRoute } from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import App from './containers/App.js';
import Home from './containers/Home.js';
import MyApps from './containers/MyApps.js';
import Description from './containers/description/Description.js';
import Search from './containers/Search.js';
import Category from './containers/Category.js';

ReactDOM.render(
  (<Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/my_apps" component={MyApps} />
      <Route path="/app/:appId" component={Description} />
      <Route path="/search/:query" component={Search} />
      <Route path="/category/:cat" component={Category} />
    </Route>
  </Router>), document.getElementById('app')
);
