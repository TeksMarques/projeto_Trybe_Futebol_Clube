import IMatch from '../interfaces/IMatch';
import ILeaderboard from '../interfaces/ILeaderboard';

const SportsTeamStats = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

const restart = () => {
  SportsTeamStats.totalPoints = 0;
  SportsTeamStats.totalGames = 0;
  SportsTeamStats.totalVictories = 0;
  SportsTeamStats.totalDraws = 0;
  SportsTeamStats.totalLosses = 0;
  SportsTeamStats.goalsFavor = 0;
  SportsTeamStats.goalsOwn = 0;
  SportsTeamStats.goalsBalance = 0;
  SportsTeamStats.efficiency = 0;
};

const homeWin = (homeTeamGoals: number, awayTeamGoals: number) => {
  SportsTeamStats.totalPoints += 3;
  SportsTeamStats.totalVictories += 1;
  SportsTeamStats.goalsFavor += homeTeamGoals;
  SportsTeamStats.goalsOwn += awayTeamGoals;
};

const homeTie = (homeTeamGoals: number, awayTeamGoals: number) => {
  SportsTeamStats.totalPoints += 1;
  SportsTeamStats.totalDraws += 1;
  SportsTeamStats.goalsFavor += homeTeamGoals;
  SportsTeamStats.goalsOwn += awayTeamGoals;
};
const homeLose = (homeTeamGoals: number, awayTeamGoals: number) => {
  SportsTeamStats.totalPoints += 0;
  SportsTeamStats.totalLosses += 1;
  SportsTeamStats.goalsFavor += homeTeamGoals;
  SportsTeamStats.goalsOwn += awayTeamGoals;
};
const awayWin = (homeTeamGoals: number, awayTeamGoals: number) => {
  SportsTeamStats.totalPoints += 3;
  SportsTeamStats.totalVictories += 1;
  SportsTeamStats.goalsFavor += awayTeamGoals;
  SportsTeamStats.goalsOwn += homeTeamGoals;
};

const awayTie = (homeTeamGoals: number, awayTeamGoals: number) => {
  SportsTeamStats.totalPoints += 1;
  SportsTeamStats.totalDraws += 1;
  SportsTeamStats.goalsFavor += awayTeamGoals;
  SportsTeamStats.goalsOwn += homeTeamGoals;
};

const awayLose = (homeTeamGoals: number, awayTeamGoals: number) => {
  SportsTeamStats.totalPoints += 0;
  SportsTeamStats.totalLosses += 1;
  SportsTeamStats.goalsFavor += awayTeamGoals;
  SportsTeamStats.goalsOwn += homeTeamGoals;
};

const calculateHomeTeamPoints = (matches: IMatch[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) homeWin(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals === awayTeamGoals) homeTie(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals < awayTeamGoals) homeLose(homeTeamGoals, awayTeamGoals);
  });
};

const HomeTeamStats = (name: string, matches: IMatch[]) => {
  if (name !== SportsTeamStats.name) {
    restart();
  }
  SportsTeamStats.name = name;
  calculateHomeTeamPoints(matches);
  SportsTeamStats.totalGames += 1;
  SportsTeamStats.goalsBalance = SportsTeamStats.goalsFavor - SportsTeamStats.goalsOwn;
  SportsTeamStats.efficiency = Number(
    (
      (SportsTeamStats.totalPoints / (SportsTeamStats.totalGames * 3))
      * 100
    ).toFixed(2),
  );

  return SportsTeamStats;
};

const calculateAwayTeamPoints = (matches: IMatch[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) awayWin(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals === awayTeamGoals) awayTie(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals < awayTeamGoals) awayLose(homeTeamGoals, awayTeamGoals);
  });
};

const AwayTeamStats = (name: string, matches: IMatch[]) => {
  if (name !== SportsTeamStats.name) {
    restart();
  }
  SportsTeamStats.name = name;
  calculateAwayTeamPoints(matches);
  SportsTeamStats.totalGames += 1;

  return SportsTeamStats;
};

function sortByPoints(a: ILeaderboard, b: ILeaderboard): number {
  return b.totalPoints - a.totalPoints;
}

function sortByVictories(a: ILeaderboard, b: ILeaderboard): number {
  return b.totalVictories - a.totalVictories;
}

function sortByGoalsBalance(a: ILeaderboard, b: ILeaderboard): number {
  return b.goalsBalance - a.goalsBalance;
}

function sortByGoalsFavor(a: ILeaderboard, b: ILeaderboard): number {
  return b.goalsFavor - a.goalsFavor;
}

function sortByGoalsOwn(a: ILeaderboard, b: ILeaderboard): number {
  return b.goalsOwn - a.goalsOwn;
}

function sortTeams(matches: ILeaderboard[]): ILeaderboard[] {
  return matches.sort((a, b) =>
    sortByPoints(a, b)
    || sortByVictories(a, b)
    || sortByGoalsBalance(a, b)
    || sortByGoalsFavor(a, b)
    || sortByGoalsOwn(a, b));
}

export { HomeTeamStats, AwayTeamStats, sortTeams };
