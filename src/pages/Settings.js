import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserForm from '../components/UserForm';
import Layout from './Layout';
import Picker from '../components/PickerControls';


class Settings extends Component {
  render() {
    const { mygames, picker } = this.props;

    return (
      <Layout>
        <h2>Settings:</h2>
        <section>
          <UserForm mygames={mygames} />
        </section>
        <h3>Picker defaults:</h3>
        <section>
          <Picker picker={picker} />
        </section>
      </Layout>
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
