const scoreboard = require('./scoreboard');

module.exports = {
  getLeagueScoreboard : scoreboard.getLeagueScoreboard,
  getMatchups         : scoreboard.getMatchups,
  getSpecificMatchup  : scoreboard.getSpecificMatchup
}
