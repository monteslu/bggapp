import React, { Component } from 'react';
import {trim} from 'lodash';
import { connect } from 'react-redux';

import {TextField, Button, LinearProgress} from '@material-ui/core';

//console.log('Userform tf', TextField, 'rb', Button, 'lp', LinearProgress);

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
        placeholder="BGG username"
        value={mygames.username || ''}
        onChange={evt => this.handleTextChange(evt)}
        />
        <Button
          variant={'contained'}
          color={'primary'}
          disabled={!trim(mygames.username) || mygames.isFetching}
          onClick={evt => this.handleClick(evt)}
        >
          {buttonLabel}
        </Button>
        <br/>
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

export default connect(mapStateToProps, { updateUsername, loadMyGames })(UserForm);
