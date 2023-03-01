import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';

class MatchesService {
  model: ModelStatic<MatchesModel> = MatchesModel;

  async getMatches(inProgress: unknown): Promise<MatchesModel[]> {
    const matches = await this.model.findAll(
      { include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
      },
    );
    if (inProgress === 'true') return matches.filter((match) => match.inProgress === true);
    if (inProgress === 'false') return matches.filter((match) => match.inProgress === false);
    return matches;
  }

  async getMatchFinished(id: number): Promise<void> {
    await this.model.findByPk(id);
    await this.model.update({ inProgress: false }, { where: { id } });
  }
}

export default MatchesService;
