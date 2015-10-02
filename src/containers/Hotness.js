import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchGamesIfNeeded } from '../actions/hotness';
import GameCard from '../components/GameCard';
import bggTypes from '../constants/bgg-types';
import {LinearProgress} from 'material-ui';

class Hotness extends Component {
  constructor(props) {
    super(props);
    console.log('hotness constructor', Math.random());
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGamesIfNeeded());
  }


  render() {
    const { games, isFetching } = this.props;
    const gameType = bggTypes.boardgames;
    console.log('hotness render', games, isFetching);
    let output = (<h2>Empty.</h2>);
    if(isFetching && games.length === 0){
      output = (<LinearProgress mode="indeterminate"  />);
    }
    if(!isFetching && games.length > 0){
      output = (
        <div>
        {games.map(function(game, i) {
          return <GameCard game={game} gameType={gameType} key={i}/>;
        })}
        </div>
      );
    }
    return (
      <div>
        <h3>Hotness:</h3>
        {output}
      </div>
    );
  }
}

Hotness.propTypes = {
  games: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  const { isFetching, games } = state.hotness;

  return {
    games,
    isFetching
  };
}

export default connect(mapStateToProps)(Hotness);
