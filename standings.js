//Haven't quite figured out the scorebard endpoint yet
// Keep getting 401 unauthorized
const espnRequest = require('./espn-request');

function getLeagueStandings(cookies, leagueId){
  let url = 'http://games.espn.com/ffl/api/v2/standings?leagueId=' + leagueId + '&seasonId=2017';
  return espnRequest.requestToPromise(url, cookies);
}

module.exports = {
  getLeagueStandings : getLeagueStandings
}
