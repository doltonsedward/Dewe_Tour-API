'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      countryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "countries",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      accomodation: {
        type: Sequelize.STRING
      },
      transportation: {
        type: Sequelize.STRING
      },
      eat: {
        type: Sequelize.STRING
      },
      day: {
        type: Sequelize.INTEGER
      },
      night: {
        type: Sequelize.INTEGER
      },
      dateTrip: {
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      quota: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('trips');
  }
};