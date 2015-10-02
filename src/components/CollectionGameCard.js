import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';

import cleanupName from '../lib/cleanupName';

export default class GameCard extends Component {
  render() {
    const {game} = this.props;

    const style = {
      background: 'url(\"' + game.thumbnail + '\") center / cover'
    };


    const gameLink = '/details/' + game.objectid;
    let gameDisplayName = cleanupName(game.name.$t);

    if(gameDisplayName.length > 21){
      gameDisplayName = gameDisplayName.substring(0, 19) + "…";
    }

    return (
      <Link to={gameLink} >
        <div className="demo-card-wide mdl-card mdl-shadow--8dp collection-card">
            <div className="mdl-card__title"  style={style}>
            </div>
            <div className="mdl-card__supporting-text">
              {gameDisplayName}
            </div>
        </div>
      </Link>
    );
  }
}

