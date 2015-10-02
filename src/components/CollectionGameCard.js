import React, { PropTypes, Component } from 'react';

export default class GameCard extends Component {
  render() {
    const {game, gameType} = this.props;

    const style = {
      background: 'url(\"' + game.thumbnail + '\") center / cover'
    };

    const yearpublished = (game.yearpublished ? 'published: ' + game.yearpublished : '');
    const gameLink = gameType.url + game.objectid;
    let gameDisplayName = String(game.name.$t || ''); //yuck

    gameDisplayName = gameDisplayName.replace(/\&amp\;/g, '&')
                                      .replace(/\&apos\;/g, '\'')
                                      .replace(/\%28\;/g, '(')
                                      .replace(/\%29\;/g, ')'); //WTF!!! burn in hell XML

    return (
      <div className="demo-card-wide mdl-card mdl-shadow--8dp collection-card">
        <div className="mdl-card__title"  style={style}>
        </div>
        <div className="mdl-card__supporting-text">
          <a href={gameLink} target="_blank">{gameDisplayName}</a><br/>
          {yearpublished}
        </div>
      </div>
    );
  }
}

