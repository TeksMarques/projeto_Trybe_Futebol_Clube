import TeamModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import { HomeTeamStats, sortTeams, AwayTeamStats } from '../utils/calculoPoints';
import ITeam from '../interfaces/ITeam';
import ILeaderboard from '../interfaces/ILeaderboard';

class LeaderBoardservice {
  static async getLeaderBoard() {
    const teams = await TeamModel.findAll() as unknown as ITeam[];

    const teamsHomeStats = await teams.map(async (team) => {
      const matchHomeTeam = await MatchesModel.findAll(
        { where: { homeTeamId: team.id, inProgress: false } },
      );

      const teamHomeStats = await matchHomeTeam.map((match) => (
        HomeTeamStats(team.teamName, [match])));

      const teamsAllStats = teamHomeStats[matchHomeTeam.length - 1];
      return { ...teamsAllStats };
    });

    const resultTeams = await Promise.all(teamsHomeStats);
    const resultsSorted = sortTeams(resultTeams);
    return resultsSorted;
  }

  static async getLeaderBoaderAway() {
    const teams = await TeamModel.findAll() as unknown as ITeam[];

    const teamsAwayStats = await teams.map(async (team) => {
      const AwayTeamMatches = await MatchesModel.findAll(
        { where: { awayTeamId: team.id, inProgress: false } },
      );

      const teamAwayStats = await AwayTeamMatches.map((match) => (
        AwayTeamStats(team.teamName, [match])));

      const teamsAllStats = teamAwayStats[AwayTeamMatches.length - 1];
      return { ...teamsAllStats };
    });

    const teamsResults: ILeaderboard[] = await Promise.all(teamsAwayStats);
    const resultsSorted = sortTeams(teamsResults);
    return resultsSorted;
  }
}

export default LeaderBoardservice;
