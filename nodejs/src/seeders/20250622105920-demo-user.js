'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',[{
      email:'admin@gmail.com',
      password:'123456',
      firstName: 'hoidanIt',
      lastName: 'Eric',
      address: 'USA',
      gender:1,
      roleId: 'R1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
