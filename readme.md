# ESPN FF API
## What it is
A node package written for the purpose of retrieving ESPN fantasy football information from both private and public leagues

## What it needs
Two cookie values from the ESPN site(espn_s2 and SWID) and a league id.

## What it does
Hits the ESPN API and returns a promise that resolves to an object containing what league information you are querying for.

## Examples
```javascript
const espnFF = require('espn-ff-api');

const cookies = {
  espnS2 : '<your espn s2 cookie value>',
  SWID   : '<your SWID cookie value>'
};

//returns the entire league scoreboard object
espnFF.getLeagueScoreboard(cookies, '<leagueId>')
      .then(leagueInfo => {
        console.log(leagueInfo);
      });

//returns all league matchups in a simplified object
espnFF.getMatchups(cookies, '<leagueId>')
      .then(leagueMatchups => {
        console.log(leagueMatchups);
      });

//returns a specific team matchup
espnFF.getSpecificMatchup(cookies, '<leagueId>', '<teamLocation>', '<teamName>')
      .then(matchup => {
        console.log(matchup);
      });

//returns the entire league standings object
espnFF.getLeagueStandings(cookies, '<leagueId>')
      .then(standings => {
        console.log(standings);
      });

//returns a simplified league standings object sorted by overallStanding
espnFF.getOverallStandings(cookies, '<leagueId>')
      .then(result => {
        console.log(result);
      });

//returns team-level box score data along with a list of player objects for a specific team for a specific week
espnFF.getSingleTeamLineup(cookies, '<leagueId>', '<teamId>', '<scoringPeriodId>')
      .then(team => {
        console.log(team);
      });

//returns team-level box score data along with a list of player objects for a specific matchup for a specific week
espnFF.getMatchupLineups(cookies, '<leagueId>', '<teamId>', '<scoringPeriodId>')
      .then(teams => {
        console.log(teams);
      });

//returns simplified box score data for individual players of a specific team for a specific week
espnFF.getSingleTeamPlayers(cookies, '<leagueId>', '<teamId>', '<scoringPeriodId>')
      .then(players => {
        console.log(players);
      });
```
