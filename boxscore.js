const espnRequest = require('./espn-request');

function getBoxscore(cookies, leagueId, teamId){
  let url = 'http://games.espn.com/ffl/api/v2/boxscore?leagueId=' + leagueId + '&teamId=' + teamId;
  return espnRequest.requestToPromise(url, cookies);
}

module.exports = {
  getBoxscore : getBoxscore
}
