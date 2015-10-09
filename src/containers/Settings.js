import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UserForm from '../components/UserForm';
import Picker from '../components/PickerControls';


class Settings extends Component {
  render() {
    const { mygames, dispatch, picker } = this.props;

    return (
      <div>
        <h2>Settings:</h2>
        <section>
          <UserForm mygames={mygames} dispatch={dispatch}/>
        </section>
        <h3>Picker defaults:</h3>
        <section>
          <Picker picker={picker} dispatch={dispatch}/>
        </section>
      </div>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  const { mygames, picker } = state;

  return {
    mygames,
    picker
  };
}

export default connect(mapStateToProps)(Settings);
