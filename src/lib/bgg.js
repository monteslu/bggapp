import rest from 'rest';
import mime from 'rest/interceptor/mime';
import pathPrefix from 'rest/interceptor/pathPrefix';

//import x2js from 'x2js-cjs2'; //if BGG enables CORS and we ditch the stupid proxy

const client = rest.wrap(mime).wrap(pathPrefix, { prefix: 'https://monteslu.iceddev.com/bgg/' });


export function hotness(){
  return client({path: 'hotness'});
}

export function collection(username){
  return client({path: `collection?stats=1&username=${username}`});
}
