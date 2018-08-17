const espnRequest = require('./espn-request');

function getRosters(cookies, leagueId, teamIds, season = 2018){
  let url = 'http://games.espn.com/ffl/api/v2/rosterInfo?leagueId=' + leagueId + '&seasonId='+ season +'&teamIds=' + teamIds.join(',');
  return espnRequest.requestToPromise(url, cookies);
}

module.exports = {
  getRosters : getRosters
}
