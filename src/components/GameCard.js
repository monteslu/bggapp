import React, { PropTypes, Component } from 'react';
import bggTypes from '../constants/bgg-types';

export default class GameCard extends Component {
  render() {
    const {game, gameType} = this.props;
    console.log('props.game', game, gameType);

    const style = {
      background: 'url(\"' + game.thumbnail.value + '\") center / cover'
    };

    const yearpublished = (game.yearpublished ? 'published: ' + game.yearpublished.value : '');
    const gameLink = bggTypes[gameType].url + game.id;

    return (
      <div className="demo-card-wide mdl-card mdl-shadow--8dp">
        <div className="mdl-card__title"  style={style}>
        </div>
        <div className="mdl-card__supporting-text">
          <a href={gameLink} target="_blank">#{game.rank}</a><br/>
          {yearpublished}
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            {game.name.value}
          </a>
        </div>
      </div>
    );
  }
}



      // <div className="demo-card-image mdl-card mdl-shadow--8dp" style={style}>
      //   <div className="mdl-card__title mdl-card--expand"></div>
      //   <div className="mdl-card__actions">
      //     <span className="demo-card-image__filename">{game.name.value}</span>
      //   </div>
      // </div>
