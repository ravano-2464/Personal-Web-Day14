'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class myproject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // You can define associations here if needed
    }
  }

  myproject.init(
    {
      project_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      technologies: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true, // Adjust as needed
      },
      duration: {
        type: Sequelize.STRING,
        allowNull: true, // Adjust as needed
      },
    },
    {
      sequelize,
      modelName: 'myproject', // Use PascalCase for the model name
      tableName: 'myproject', // Optional: explicitly set the table name
      timestamps: true, // Optional: include timestamps (createdAt, updatedAt)
    }
  );

  return MyProject;
};
