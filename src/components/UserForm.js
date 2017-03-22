import React, { Component } from 'react';
import {trim} from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {TextField, RaisedButton, LinearProgress} from 'material-ui';

import { updateUsername,
         loadMyGames
      } from '../state/mygames';

class UserForm extends Component {

  handleTextChange(evt){
    this.props.updateUsername(evt.target.value);
  }

  handleClick(evt){
    this.props.loadMyGames();
  }

  render() {
    const {mygames} = this.props;

    const style = {
      margin: '8px'
    };

    const progress = mygames.isFetching ? (
      <LinearProgress mode="indeterminate"  />
    ) : '';

    const queued = mygames.isQueued ? (
      <div>Collection loading queued. Please try again in 1 minute.</div>
    ) : '';

    const errorFetching = mygames.errorFetching ? (
      <div>Error fetching collection: {mygames.errorFetching}</div>
    ) : '';

    let buttonLabel = 'Load Games';

    return (
      <div className="mdl-shadow--8dp" style={style}>
        <div style={style}>
        <TextField
        floatingLabelText="BGG username"
        value={mygames.username || ''}
        onChange={evt => this.handleTextChange(evt)}
        underlineStyle={{borderColor:'red', color: 'red'}}
        floatingLabelStyle={{color: 'red'}}
        />
        <RaisedButton label={buttonLabel} primary={true} disabled={!trim(mygames.username) || mygames.isFetching} onClick={evt => this.handleClick(evt)}/><br/>
        {progress}{queued}{errorFetching}
        </div>
      </div>
    );

  }
}

function mapStateToProps(state) {
  const { mygames } = state;

  return { mygames };
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    updateUsername, loadMyGames
  };

  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
