import React, { Component } from 'react';
import { Link } from 'react-router';
import Layout from '../Layout';


class WebGamesList extends Component {

  render() {

    return (
      <Layout>
        <div style={{margin: '6px'}}>
          <Link to="/fs" className="mdl-navigation__link">For $olitaire</Link>
          <Link to="/domsim" className="mdl-navigation__link">Dom Simulator</Link>
        </div>
      </Layout>
    );
  }
}



export default WebGamesList;
