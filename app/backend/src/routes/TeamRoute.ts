import { Router } from 'express';
import TeamControler from '../controlers/TeamControler';

const teamController = new TeamControler();

const teamsRouter = Router();

teamsRouter.get('/', (req, res) => teamController.getTeams(req, res));
teamsRouter.get('/:id', (req, res) => teamController.getTeamById(req, res));

export default teamsRouter;
