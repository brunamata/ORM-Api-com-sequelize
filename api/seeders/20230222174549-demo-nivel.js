'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Niveis', [
    {
        descr_nivel: 'basico',
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
      descr_nivel: 'intermediario',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
    descr_nivel: 'avançado',
    createdAt: new Date(),
    updatedAt: new Date()
    }
     
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Niveis', null, {});

  }
};
