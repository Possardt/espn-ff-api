const scoreboard = require('./scoreboard');
const standings  = require('./standings');

module.exports = {
  getLeagueScoreboard : scoreboard.getLeagueScoreboard,
  getMatchups         : scoreboard.getMatchups,
  getSpecificMatchup  : scoreboard.getSpecificMatchup,
  getLeagueStandings  : standings.getLeagueStandings,
  getOverallStandings : standings.getOverallStandings
}
