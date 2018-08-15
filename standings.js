const espnRequest = require('./espn-request');

function getLeagueStandings(cookies, leagueId, season = 2018){
  let url = 'http://games.espn.com/ffl/api/v2/standings?leagueId=' + leagueId + '&seasonId=' + season;
  return espnRequest.requestToPromise(url, cookies);
}

function getOverallStandings(cookies, leagueId, season = 2018){
  return getLeagueStandings(cookies, leagueId, season)
    .then(standings => {
      return standings.teams.map(team => {
        return {
                teamLocation    : team.teamLocation,
                teamNickname    : team.teamNickname,
                teamId          : team.teamId,
                overallStanding : team.overallStanding,
                divisionStanding: team.divisionStanding,
                wins            : team.record.overallWins,
                losses          : team.record.overallLosses,
                streakLength    : team.record.streakLength,
                streakType      : team.record.streakType,
                pointsFor       : team.record.pointsFor,
                pointsAgainst   : team.record.pointsAgainst
              };
      });
    })
    .then(standings => {
      return standings.sort((x,y) => {
        return x.overallStanding - y.overallStanding;
      });
    });
}

module.exports = {
  getLeagueStandings  : getLeagueStandings,
  getOverallStandings : getOverallStandings
}
