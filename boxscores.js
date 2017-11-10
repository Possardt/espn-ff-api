const espnRequest = require('./espn-request');

function getBoxScore(cookies, leagueId, teamId, scoringPeriodId){
  let url = 'http://games.espn.com/ffl/api/v2/boxscore?leagueId=' + leagueId + '&teamId=' + teamId + '&scoringPeriodId=' + scoringPeriodId + '&seasonId=2017';
  return espnRequest.requestToPromise(url, cookies);
}

function getLineups(cookies, leagueId, teamId, scoringPeriodId){
  return getBoxScore(cookies, leagueId, teamId, scoringPeriodId)
    .then(lineups => {
      return lineups.boxscore.teams;
    });
}

function getMatchupLineups(cookies, leagueId, teamId, scoringPeriodId){
  return getLineups(cookies, leagueId, teamId, scoringPeriodId)
    .then(teams => {
      return teams.map(team => {
        return {
          teamName        : team.team.teamLocation + ' ' + team.team.teamNickname,
          teamAbbrev      : team.team.teamAbbrev,
          logoUrl         : team.team.logoUrl,
          teamId          : team.teamId,
          projectedPoints : team.appliedActiveProjectedTotal,
          realPoints      : team.appliedActiveRealTotal,
          players         : team.slots
        };
      });
    });
}

function getSingleTeamLineup(cookies, leagueId, teamId, scoringPeriodId){
  return getLineups(cookies, leagueId, teamId, scoringPeriodId)
    .then(teams => {
      return teams.filter(function(obj){
        return obj.team.teamId == teamId;
      });
    })
    .then(team => {
      return team.map(team => {
        return {
          teamName        : team.team.teamLocation + ' ' + team.team.teamNickname,
          teamAbbrev      : team.team.teamAbbrev,
          logoUrl         : team.team.logoUrl,
          teamId          : team.teamId,
          projectedPoints : team.appliedActiveProjectedTotal,
          realPoints      : team.appliedActiveRealTotal,
          players         : team.slots
        };
      });
    });
}

function getSingleTeamPlayers(cookies, leagueId, teamId, scoringPeriodId){
  return getSingleTeamLineup(cookies, leagueId, teamId, scoringPeriodId)
    .then(team => {
      return team[0].players;
    })
    .then(players => {
      return players.map(player => {
        return {
          playerName      : player.player.firstName + ' ' + player.player.lastName,
          playerPosition  : player.slotCategoryId,
          projectedPoints : player.currentPeriodProjectedStats.appliedStatTotal,
          realPoints      : player.currentPeriodRealStats.appliedStatTotal
        };
      });
    });
}

module.exports = {
  getBoxScore          : getBoxScore,
  getLineups           : getLineups,
  getMatchupLineups    : getMatchupLineups,
  getSingleTeamLineup  : getSingleTeamLineup,
  getSingleTeamPlayers : getSingleTeamPlayers
};
