import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UserForm from '../components/UserForm';


class Settings extends Component {
  render() {
    const { mygames, dispatch } = this.props;

    return (
      <div>
        <h3>Settings:</h3>
        <section>
          <UserForm mygames={mygames} dispatch={dispatch}/>
        </section>
      </div>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  const { mygames } = state;

  return {
    mygames
  };
}

export default connect(mapStateToProps)(Settings);
