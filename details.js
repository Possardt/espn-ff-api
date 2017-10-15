const getLeagueScoreboard = require('./scoreboard').getLeagueScoreboard;


function getMatchups(cookies, leagueId){
  return getLeagueScoreboard(cookies, leagueId)
    .then(leagueData => {
      leagueData = JSON.parse(leagueData);
      return leagueData.scoreboard.matchups;
    });
}

function getSpecificMatchup(cookies, leagueId, teamLocation, teamName){
  return getMatchups(cookies, leagueId)
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
                score    : team.score
              };
      });
    });
}


module.exports = {
  getMatchups        : getMatchups,
  getSpecificMatchup : getSpecificMatchup
}
