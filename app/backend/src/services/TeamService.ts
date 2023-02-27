import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamsModel';

class TeamService {
  private teamModel: ModelStatic<TeamModel> = TeamModel;

  async getTeams(): Promise<TeamModel[]> {
    const result = await this.teamModel.findAll();
    return result;
  }

  async getTeamById(id: number): Promise<TeamModel | null> {
    const result = await this.teamModel.findByPk(id);
    return result;
  }
}

export default TeamService;
