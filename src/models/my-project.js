'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class My - Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  My - Project.init({
    titles: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    author: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'My-Project',
  });
  return My - Project;
};