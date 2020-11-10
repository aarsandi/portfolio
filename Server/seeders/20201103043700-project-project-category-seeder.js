'use strict';
const fs = require('fs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = JSON.parse(fs.readFileSync('./seeders/json/dataseed_project_project_category.json', 'utf8'))
    data = data.map(temp => {
      temp.createdAt = new Date()
      temp.updatedAt = new Date()
      return temp
    })
    await queryInterface.bulkInsert('ProjectProjectCategories', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ProjectProjectCategories', null, {});
  }
};
