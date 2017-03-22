import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserForm from '../components/UserForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Picker from '../components/PickerControls';


class Settings extends Component {
  render() {
    const { mygames, picker } = this.props;

    return (
      <div>
        <Header/>
        <main className="mdl-layout__content">
          <div className="page-content">
            <h2>Settings:</h2>
            <section>
              <UserForm mygames={mygames} />
            </section>
            <h3>Picker defaults:</h3>
            <section>
              <Picker picker={picker} />
            </section>
          </div>
        </main>
        <Footer/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { mygames, picker } = state;

  console.log('state', state);

  return {
    mygames,
    picker
  };
}


export default connect(mapStateToProps)(Settings);
