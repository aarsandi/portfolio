'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PostCategory.belongsToMany(models.Post, {
        through: 'PostPostCategories',
        as: 'Posts',
        foreignKey: 'PostCategoryId'
      })
    }
  };
  PostCategory.init({
    title: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Title already exists'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fill in the title field'
        },
        notNull: {
          msg: 'fill in the title field'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'PostCategory',
  });
  return PostCategory;
};