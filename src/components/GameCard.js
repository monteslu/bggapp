import React, { Component } from 'react';

export default class GameCard extends Component {
  render() {
    const {game, gameType} = this.props;

    const style = {
      background: `url("${game.thumbnail.value}") center / cover`
    };

    const yearpublished = (game.yearpublished ? 'published: ' + game.yearpublished.value : '');
    const gameLink = gameType.url + game.id;

    return (
      <div className="demo-card-wide mdl-card mdl-shadow--8dp">
        <div className="mdl-card__title"  style={style}>
        </div>
        <div className="mdl-card__supporting-text">
          <a href={gameLink} target="_blank">#{game.rank}</a><br/>
          {yearpublished}
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <a className="mdl-button mdl-button--colored">
            {game.name.value}
          </a>
        </div>
      </div>
    );
  }
}
