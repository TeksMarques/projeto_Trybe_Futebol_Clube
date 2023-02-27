import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

class TeamModel extends Model {
  declare id: number;
  declare teamName: string;
}

TeamModel.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  teamName: {
    type: STRING,
    field: 'team_name',
  },
}, {
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
  modelName: 'TeamModel',
  underscored: true,
});

export default TeamModel;
