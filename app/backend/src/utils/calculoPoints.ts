import IMatch from '../interfaces/IMatch';

const TeamStats = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
};

const reset = () => {
  TeamStats.totalPoints = 0;
  TeamStats.totalGames = 0;
  TeamStats.totalVictories = 0;
  TeamStats.totalDraws = 0;
  TeamStats.totalLosses = 0;
  TeamStats.goalsFavor = 0;
  TeamStats.goalsOwn = 0;
};

const victoryHome = (homeTeamGoals:number, awayTeamGoals:number) => {
  TeamStats.totalPoints += 3;
  TeamStats.totalVictories += 1;
  TeamStats.goalsFavor += homeTeamGoals;
  TeamStats.goalsOwn += awayTeamGoals;
};

const victoryAway = (homeTeamGoals:number, awayTeamGoals:number) => {
  TeamStats.totalPoints += 3;
  TeamStats.totalVictories += 1;
  TeamStats.goalsFavor += awayTeamGoals;
  TeamStats.goalsOwn += homeTeamGoals;
};

const drawHome = (homeTeamGoals:number, awayTeamGoals:number) => {
  TeamStats.totalPoints += 1;
  TeamStats.totalDraws += 1;
  TeamStats.goalsFavor += homeTeamGoals;
  TeamStats.goalsOwn += awayTeamGoals;
};

const drawAway = (homeTeamGoals:number, awayTeamGoals:number) => {
  TeamStats.totalPoints += 1;
  TeamStats.totalDraws += 1;
  TeamStats.goalsFavor += awayTeamGoals;
  TeamStats.goalsOwn += homeTeamGoals;
};

const defeatHome = (homeTeamGoals:number, awayTeamGoals:number) => {
  TeamStats.totalPoints += 0;
  TeamStats.totalLosses += 1;
  TeamStats.goalsFavor += homeTeamGoals;
  TeamStats.goalsOwn += awayTeamGoals;
};

const defeatAway = (homeTeamGoals:number, awayTeamGoals:number) => {
  TeamStats.totalPoints += 0;
  TeamStats.totalLosses += 1;
  TeamStats.goalsFavor += awayTeamGoals;
  TeamStats.goalsOwn += homeTeamGoals;
};

const calculatePointsHome = ((matches: IMatch[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) victoryHome(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals === awayTeamGoals) drawHome(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals < awayTeamGoals) defeatHome(homeTeamGoals, awayTeamGoals);
  });
});

const calculatePointsAway = ((matches:IMatch[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) victoryAway(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals === awayTeamGoals) drawAway(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals < awayTeamGoals) defeatAway(homeTeamGoals, awayTeamGoals);
  });
});

const StatisticTeamHome = (name:string, matches:IMatch[]) => {
  if (name !== TeamStats.name) {
    reset();
  }
  TeamStats.name = name;
  calculatePointsHome(matches);
  TeamStats.totalGames += 1;

  return TeamStats;
};

const StatisticTeamAway = (name:string, matches:IMatch[]) => {
  if (name !== TeamStats.name) {
    reset();
  }
  TeamStats.name = name;
  calculatePointsAway(matches);
  TeamStats.totalGames += 1;

  return TeamStats;
};

export { StatisticTeamHome, StatisticTeamAway };
