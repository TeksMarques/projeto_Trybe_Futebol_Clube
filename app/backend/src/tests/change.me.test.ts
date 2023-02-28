import * as sinon from 'sinon';
import * as chai from 'chai';
import { Model } from 'sequelize';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import { Response } from 'superagent';
import TeamService from '../services/TeamService';
import TeamModel from '../database/models/TeamsModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da seção Teams', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Testando camada service - getTeams', async () => {

    const outPutTeams :TeamModel[] = [ new TeamModel({ id: 1, teamName: 'Teste' }) ];

    sinon.stub(TeamModel, 'findAll').resolves(outPutTeams);
    const teamService = new TeamService();
    
    const result = await teamService.getTeams();
    
    expect(result).to.be.deep.eq(outPutTeams);
    expect(result.length).to.be.eq(1);
    expect(result).to.be.an('array');
  });

  it('Testando camada service - getTeamById', async () => {
    const outPutTeam :TeamModel = new TeamModel({ id: 1, teamName: 'Teste' });

    sinon.stub(TeamModel, 'findByPk').resolves(outPutTeam);
    const teamService = new TeamService();
    
    const result = await teamService.getTeamById(1);
    
    expect(result).to.be.deep.eq(outPutTeam);
    expect(result).to.be.an('object');
  });

  it('Testando camada controler - getTeams', async () => {
    const outPutTeams :TeamModel[] = [ new TeamModel({ id: 1, teamName: 'Teste' }) ];

    sinon.stub(TeamModel, 'findAll').resolves(outPutTeams);
    const teamService = new TeamService();
    
    const result = await chai.request(app).get('/teams');
    
    expect(result).to.be.an('object');
    expect(result.body).to.be.an('array');
    expect(result.body).to.be.deep.eq(outPutTeams);
  });

  it('Testando camada controler - getTeamById', async () => {
    const outPutTeam :TeamModel = new TeamModel({ id: 1, teamName: 'Teste' });

    sinon.stub(TeamModel, 'findByPk').resolves(outPutTeam);
    const teamService = new TeamService();
    
    const result = await chai.request(app).get('/teams/1');
    
    expect(result).to.be.an('object');
    expect(result.body).to.be.an('object');
    expect(result.body).to.be.deep.eq(outPutTeam);
  });
});
