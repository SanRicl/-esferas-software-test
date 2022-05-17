module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.createTable('contatos', {
          id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
          },
          nome: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          sobrenome: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
          },
          cpf: {
              type: Sequelize.STRING,
              allowNull: true,
          },
          telefone: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          created_at: {
              type: Sequelize.DATE,
              allowNull: false,
          },
          updated_at: {
              type: Sequelize.DATE,
              allowNull: false,
          },
      });
  },

  async down(queryInterface) {
      await queryInterface.dropTable('contatos');
  },
};
