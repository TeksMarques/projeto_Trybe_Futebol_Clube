import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';

class MatchesService {
  model: ModelStatic<MatchesModel> = MatchesModel;

  async getMatches(): Promise<MatchesModel[]> {
    const matches = await this.model.findAll(
      { include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
      },
    );
    return matches;
  }
}

export default MatchesService;
