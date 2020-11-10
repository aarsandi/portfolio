'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostPostCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PostPostCategory.init({
    PostId: DataTypes.INTEGER,
    PostCategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostPostCategory',
  });
  return PostPostCategory;
};