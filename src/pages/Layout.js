import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Layout extends Component {


  render() {
    return (
      <div>
        <Header/>
        <main className="mdl-layout__content">
          <div className="page-content">
            {this.props.children}
          </div>
        </main>
        <Footer/>
      </div>
    );
  }
}



export default Layout;
