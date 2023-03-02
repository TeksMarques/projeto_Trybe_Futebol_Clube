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

  updateMatch(id:number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<number[] | undefined> {
    return this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  async newMatch(homeTeamId: number, awayTeamId: number, homeTeamGoals: Date, awayTeamGoals: string)
    : Promise<MatchesModel> {
    return this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
  }
}

export default MatchesService;
