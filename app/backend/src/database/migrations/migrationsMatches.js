module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('matches', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            home_team_id: {
                type: Sequelize.INTEGER,
                references: { model: 'teams', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            },
            home_team_goals: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            away_team_id: {
                type: Sequelize.INTEGER,
                references: { model: 'teams', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            },
            away_team_goals: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            in_progress: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('matches');
    }
}