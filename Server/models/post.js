'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User)
      Post.belongsToMany(models.PostCategory, {
        through: 'PostPostCategories',
        as: 'PostCategories',
        foreignKey: 'PostId'
      })
    }
  };
  Post.init({
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
    },
    detail: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    images: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    featured: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};