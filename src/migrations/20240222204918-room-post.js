'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('room_posts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users', // name of the referenced table
          key: 'id',      // name of the referenced column
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      room_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contact_person_number: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      rent_of_room: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      advance_rent: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
