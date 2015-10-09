import rest from 'rest';
import when from 'when';
import mime from 'rest/interceptor/mime';
import pathPrefix from 'rest/interceptor/pathPrefix';
//import x2js from 'x2js-cjs2'; //if BGG enables CORS and we ditch the stupid proxy

const client = rest.wrap(mime).wrap(pathPrefix, { prefix: 'https://monteslu.iceddev.com/bgg/' });


export function hotness(){
  return client({path: 'hotness'});
}

export function collection(username){
  return when.try(function(boardgames, expansions){
      if(boardgames.entity.message){
        return boardgames.entity;
      }
      if(expansions.entity.message){
        return expansions.entity;
      }

      let games = boardgames.entity.items.item || [];
      return games.concat(expansions.entity.items.item || []);

    },
    client({path: `collection?stats=1&username=${username}&version=1&subtype=boardgame&excludesubtype=boardgameexpansion`}),
    client({path: `collection?stats=1&username=${username}&version=1&subtype=boardgameexpansion`}));

}

