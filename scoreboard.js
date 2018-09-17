const espnRequest = require('./espn-request');

function getLeagueScoreboard(cookies, leagueId, season = 2018, matchupPeriodId){
  let url = 'http://games.espn.com/ffl/api/v2/scoreboard?leagueId=' + leagueId + '&seasonId=' + season;
  if (matchupPeriodId) {
    url += '$matchupPeriodId=' + matchupPeriodId;
  }
  return espnRequest.requestToPromise(url, cookies);
}

function getMatchups(cookies, leagueId, season = 2018, matchupPeriodId){
  return getLeagueScoreboard(cookies, leagueId, season, matchupPeriodId)
    .then(leagueData => {
      return leagueData.scoreboard.matchups;
    });
}

function getSpecificMatchup(cookies, leagueId, teamLocation, teamName, season = 2018, matchupPeriodId){
  return getMatchups(cookies, leagueId, season, matchupPeriodId)
    .then(matchups => {
      return matchups.filter(matchup => {
        return (matchup.teams[0].team.teamLocation === teamLocation && matchup.teams[0].team.teamNickname === teamName) ||
               (matchup.teams[1].team.teamLocation === teamLocation && matchup.teams[1].team.teamNickname === teamName);
      });
    })
    .then(matchup => {
      return matchup[0].teams;
    })
    .then(teams => {
      return teams.map(team => {
        return {
                teamName : team.team.teamLocation + ' ' + team.team.teamNickname,
                score    : team.score,
                wins     : team.team.record.overallWins,
                losses   : team.team.record.overallLosses,
                logoUrl  : team.team.logoUrl,
                teamId   : team.teamId
              };
      });
    });
}

module.exports = {
  getLeagueScoreboard : getLeagueScoreboard,
  getMatchups         : getMatchups,
  getSpecificMatchup  : getSpecificMatchup
};
