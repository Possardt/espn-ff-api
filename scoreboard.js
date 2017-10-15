const request = require('request');
const rp      = require('request-promise');
const tough   = require('tough-cookie');
const cookieJar = rp.jar();

function getLeagueScoreboard(cookies, leagueId){
  const espnS2 = new tough.Cookie({
    key    : 'espn_s2',
    value  : cookies.espnS2,
    domain : '.espn.com'
  });
  const SWID = new tough.Cookie({
    key    : 'SWID',
    value  : cookies.SWID,
    domain : '.espn.com'
  });

  cookieJar.setCookie(espnS2, 'http://games.espn.com/ffl/api/v2/scoreboard');
  cookieJar.setCookie(SWID, 'http://games.espn.com/ffl/api/v2/scoreboard');

  const options = {
    jar : cookieJar,
    uri : 'http://games.espn.com/ffl/api/v2/scoreboard?leagueId=' + leagueId + '&seasonId=2017'
  };
  return rp(options);
}

module.exports = {
  getLeagueScoreboard : getLeagueScoreboard
};
