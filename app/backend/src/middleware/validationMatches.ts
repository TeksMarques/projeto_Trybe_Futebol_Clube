import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/TeamService';

async function validationMatch(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;

  const teamService = new TeamService();

  if (homeTeamId === awayTeamId) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams' });
  }
  const homeTeam = await teamService.getTeamById(homeTeamId);
  const awayTeam = await teamService.getTeamById(awayTeamId);
  if (!homeTeam || !awayTeam) {
    return res.status(404).json({
      message: 'There is no team with such id!' });
  }
  next();
}

export default validationMatch;
