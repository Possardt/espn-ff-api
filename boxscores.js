const espnRequest = require('./espn-request');

// set NFL team names by ID
const nflTeams = {
  '22': 'Arizona Cardinals',
  '1' : 'Atlanta Falcons',
  '33': 'Baltimore Ravens',
  '2' : 'Buffalo Bills',
  '29': 'Carolina Panthers',
  '3' : 'Chicago Bears',
  '4' : 'Cincinnati Bengals',
  '5' : 'Cleveland Browns',
  '6' : 'Dallas Cowboys',
  '7' : 'Denver Broncos',
  '8' : 'Detroit Lions',
  '9' : 'Green Bay Packers',
  '34': 'Houston Texans',
  '11': 'Indianapolis Colts',
  '30': 'Jacksonville Jaguars',
  '12': 'Kansas City Chiefs',
  '24': 'Los Angeles Chargers',
  '14': 'Los Angeles Rams',
  '15': 'Miami Dolphins',
  '16': 'Minnesota Vikings',
  '17': 'New England Patriots',
  '18': 'New Orleans Saints',
  '19': 'New York Giants',
  '20': 'New York Jets',
  '13': 'Oakland Raiders',
  '21': 'Philadelphia Eagles',
  '23': 'Pittsburgh Steelers',
  '25': 'San Francisco 49ers',
  '26': 'Seattle Seahawks',
  '27': 'Tampa Bay Buccaneers',
  '10': 'Tennessee Titans',
  '28': 'Washington Redskins',
  '-1': 'Bye'
};

const nflTeamsAbbrev = {
  '22': 'Ari',
  '1' : 'Atl',
  '33': 'Bal',
  '2' : 'Buf',
  '29': 'Car',
  '3' : 'Chi',
  '4' : 'Cin',
  '5' : 'Cle',
  '6' : 'Dal',
  '7' : 'Den',
  '8' : 'Det',
  '9' : 'GB',
  '34': 'Hou',
  '11': 'Ind',
  '30': 'Jax',
  '12': 'KC',
  '24': 'LAC',
  '14': 'LAR',
  '15': 'Mia',
  '16': 'Min',
  '17': 'NE',
  '18': 'NO',
  '19': 'NYG',
  '20': 'NYJ',
  '13': 'Oak',
  '21': 'Phi',
  '23': 'Pit',
  '25': 'SF',
  '26': 'Sea',
  '27': 'TB',
  '10': 'Ten',
  '28': 'Wsh',
  '-1': 'Bye'
}

// set player positions
const playerPositions = {
  '0, 20'    : 'QB',
  '2, 23, 20': 'RB',
  '4, 23, 20': 'WR',
  '6, 23, 20': 'TE',
  '16, 20'   : 'Def',
  '17, 20'   : 'K'
};

// set lineup positions
const lineupPositions = {
  '0' : 'QB',
  '2' : 'RB',
  '4' : 'WR',
  '6' : 'TE',
  '16': 'Def',
  '17': 'K',
  '20': 'Bench',
  '23': 'Flex'
};

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
          playerName        : player.player.firstName + ' ' + player.player.lastName,
          playerTeamId      : teamId,
          playerPosition    : playerPositions[player.player.eligibleSlotCategoryIds.join(', ')],
          lineupPosition    : lineupPositions[player.slotCategoryId.toString()],
          nflTeam           : nflTeams[player.player.proTeamId.toString()],
          nflTeamAbbrev     : nflTeamsAbbrev[player.player.proTeamId.toString()],
          nflTeamOpp        : nflTeams[player.opponentProTeamId.toString()],
          nflTeamOppAbbrev  : nflTeamsAbbrev[player.opponentProTeamId.toString()],
          projectedPoints   : player.currentPeriodProjectedStats.appliedStatTotal,
          realPoints        : player.currentPeriodRealStats.appliedStatTotal || 0
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
