const espnRequest = require('./espn-request');

function getRosters(cookies, leagueId, teamIds){
  let url = 'http://games.espn.com/ffl/api/v2/rosterInfo?leagueId=' + leagueId + '&seasonId=2017&teamIds=' + teamIds.join(',');
  return espnRequest.requestToPromise(url, cookies);
}

module.exports = {
  getRosters : getRosters
}
