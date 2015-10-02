import React, { Component, PropTypes } from 'react';
import { Router, Route, Link, History, Lifecycle, Redirect } from 'react-router';

import { connect } from 'react-redux';
import Picker from './Picker';
import Settings from './Settings';
import Hotness from './Hotness';
import GameDetails from './GameDetails';


class Layout extends Component {


  render() {
    return (
<div className="mdl-layout mdl-layout--fixed-header">
  <header className="mdl-layout__header">
    <div className="mdl-layout__header-row">
      <span className="mdl-layout-title"><Link to="/" className="mdl-navigation__link">BGG Picker</Link></span>
      <div className="mdl-layout-spacer"></div>
      <nav className="mdl-navigation">
        <Link to="/hotness" className="mdl-navigation__link">Hotness</Link>
        <Link to="/settings" className="mdl-navigation__link">Settings</Link>
      </nav>
    </div>
  </header>
  <main className="mdl-layout__content">
    <div className="page-content">{this.props.children || <Picker/>}</div>
  </main>
  <footer className="mdl-mega-footer">
    <div className="mdl-mega-footer--bottom-section">
      <div className="mdl-logo">
        Made By <a href="https://twitter.com/monteslu" target="_blank">@MONTESLU</a>
      </div>
    </div>
  </footer>
</div>
    );
  }
}

class AppRouter extends Component {

  render(){
    return (
      <Router>
        <Route path="/" component={Layout}>
          <Route path="hotness" component={Hotness} />
          <Route path="settings" component={Settings} />
          <Route path="details/:objectid" component={GameDetails} />
        </Route>
      </Router>
    )
  }
}



export default AppRouter;
