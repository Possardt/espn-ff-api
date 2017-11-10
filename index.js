const scoreboard = require('./scoreboard');
const standings  = require('./standings');
const rosters    = require('./rosters');
const boxscores  = require('./boxscores');

module.exports = {
  getLeagueScoreboard  : scoreboard.getLeagueScoreboard,
  getMatchups          : scoreboard.getMatchups,
  getSpecificMatchup   : scoreboard.getSpecificMatchup,
  getLeagueStandings   : standings.getLeagueStandings,
  getOverallStandings  : standings.getOverallStandings,
  getRosters           : rosters.getRosters,
  getBoxScore          : boxscores.getBoxScore,
  getLineups           : boxscores.getLineups,
  getMatchupLineups    : boxscores.getMatchupLineups,
  getSingleTeamLineup  : boxscores.getSingleTeamLineup,
  getSingleTeamPlayers : boxscores.getSingleTeamPlayers
}
