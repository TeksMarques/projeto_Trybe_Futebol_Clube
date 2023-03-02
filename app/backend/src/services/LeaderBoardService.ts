import TeamModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import { StatisticTeamHome } from '../utils/calculoPoints';
import ITeam from '../interfaces/ITeam';

class LeaderBoardservice {
  static async getLeaderBoard() {
    const teams = await TeamModel.findAll() as unknown as ITeam[];

    const teamsHomeStats:Array<unknown> = await teams.map(async (team) => {
      const matchHomeTeam = await MatchesModel.findAll(
        { where: { homeTeamId: team.id, inProgress: false } },
      );

      const teamHomeStats = await matchHomeTeam.map((match) => (
        StatisticTeamHome(team.teamName, [match])));

      const teamsAllStats = teamHomeStats[matchHomeTeam.length - 1];
      return { ...teamsAllStats };
    });

    const resultTeams = await Promise.all(teamsHomeStats);
    return resultTeams;
  }
}

export default LeaderBoardservice;
