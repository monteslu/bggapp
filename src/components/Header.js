import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { colors } from '../lib/styles';

const baseStyles = {
  header: {
    backgroundColor: colors.darkBackground
  },
  icon: {
    color: colors.white,
  }
};


class Header extends Component {

  render() {
    console.log('header props', this.props);
    return (
      <header style={baseStyles.header}>
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title"><Link to="/" className="mdl-navigation__link">BGG Picker</Link></span>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation">
            <Link to="/hotness" className="mdl-navigation__link">Hotness</Link>
            <Link to="/settings" className="mdl-navigation__link">Settings</Link>
            <Link to="/fs" className="mdl-navigation__link">Play</Link>
          </nav>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  const { router } = state;

  return {
    router
  };
}


export default connect(mapStateToProps)(Header);
