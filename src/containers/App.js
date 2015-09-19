import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { selectHotness, fetchGamesIfNeeded, invalidateHotness } from '../actions';
import Picker from '../components/Picker';
import GameCard from '../components/GameCard';
import bggTypes from '../constants/bgg-types';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedHotness } = this.props;
    dispatch(fetchGamesIfNeeded(selectedHotness));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedHotness !== this.props.selectedHotness) {
      const { dispatch, selectedHotness } = nextProps;
      dispatch(fetchGamesIfNeeded(selectedHotness));
    }
  }

  handleChange(nextHotness) {
    this.props.dispatch(selectHotness(nextHotness));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedHotness } = this.props;
    dispatch(invalidateHotness(selectedHotness));
    dispatch(fetchGamesIfNeeded(selectedHotness));
  }

  render() {
    const { selectedHotness, games, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <Picker value={selectedHotness}
                onChange={this.handleChange}
                options={_.keys(bggTypes)} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && games.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && games.length === 0 &&
          <h2>Empty.</h2>
        }
        {games.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            {games.map((game, i) =>
                <GameCard game={game} gameType={selectedHotness}/>
            )}
          </div>
        }
      </div>
    );
  }
}

App.propTypes = {
  selectedHotness: PropTypes.string.isRequired,
  games: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedHotness, gamesByHotness } = state;
  const {
    isFetching,
    lastUpdated,
    items: games
  } = gamesByHotness[selectedHotness] || {
    isFetching: true,
    items: []
  };

  return {
    selectedHotness,
    games,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(App);
