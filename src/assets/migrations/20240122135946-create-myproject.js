'use strict';
/** @type {import('sequelize-cli').Migration} */
const { STRING } = require("sequelize");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('myproject', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      end_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      technologies: {
        allowNull: false,
        type: Sequelize.ARRAY(STRING),
      },
      image: {
        type: Sequelize.STRING
      },
      duration: {
        allowNull: false,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('myproject');
  }
};