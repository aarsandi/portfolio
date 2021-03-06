'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.User)
      Project.belongsToMany(models.ProjectCategory, {
        through: 'ProjectProjectCategories',
        as: 'ProjectCategories',
        foreignKey: 'ProjectId'
      })
    }
  };
  Project.init({
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
    gitlink: DataTypes.STRING,
    demolink: DataTypes.STRING,
    featured: DataTypes.INTEGER,
    isdone: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};