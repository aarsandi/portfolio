'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectProjectCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ProjectProjectCategory.init({
    ProjectId: DataTypes.INTEGER,
    ProjectCategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProjectProjectCategory',
  });
  return ProjectProjectCategory;
};