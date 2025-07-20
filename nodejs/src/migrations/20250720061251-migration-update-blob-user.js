'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Users', 'image', {
        type: Sequelize.BLOB('long'),
        allowNull: true,
        defaultValue: null
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Users', 'image', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      }),
    ]);
  }
};
