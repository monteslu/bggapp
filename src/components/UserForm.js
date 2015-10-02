import React, { PropTypes, Component } from 'react';
import {trim} from 'lodash';

import {TextField, RaisedButton, LinearProgress} from 'material-ui';

import { updateUsername,
         loadMyGames
      } from '../actions/mygames';

class UserForm extends Component {

  handleTextChange(evt){
    const {dispatch} = this.props;
    dispatch(updateUsername(evt.target.value));
  }

  handleClick(evt){
    const {dispatch} = this.props;
    dispatch(loadMyGames());
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

export default UserForm;

