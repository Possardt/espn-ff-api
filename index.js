const scoreboard = require('./scoreboard');
const standings  = require('./standings');
const rosters    = require('./rosters');

module.exports = {
  getLeagueScoreboard : scoreboard.getLeagueScoreboard,
  getMatchups         : scoreboard.getMatchups,
  getSpecificMatchup  : scoreboard.getSpecificMatchup,
  getLeagueStandings  : standings.getLeagueStandings,
  getOverallStandings : standings.getOverallStandings,
  getRosters          : rosters.getRosters
}
