import React from 'react';
import { Link } from 'react-router';
import SearchBar from '../components/SearchBar.js';
import CategoryDropdown from '../components/CategoryDropdown.js';
// https://github.com/webpack/less-loader
require("../../file.less");

var App = React.createClass({
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/">All Apps</Link></li>
                <li><Link to="/my_apps">My Apps</Link></li>
                <li><Link to="/todo">Todo</Link></li>
              </ul>
            </div>
          </div>
        </nav>

        <section class="search-bar">
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <CategoryDropdown />
              </div>
              <div className="col-sm-8">
                <SearchBar />
              </div>
            </div>
          </div>
        </section>
        <section className="main">
          <div className="container">
            { this.props.children }
          </div>
        </section>
      </div>
    );
  }
});

export default App;
