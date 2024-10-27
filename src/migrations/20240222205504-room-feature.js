'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('room_features', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'room_posts', // name of the referenced table
          key: 'id',      // name of the referenced column
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      bed_in_room: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bath_in_room: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      kitchen_in_room: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      wifi: {
        type: Sequelize.BOOLEAN, // Corrected data type
        allowNull: true,
      },
      include_bills: {
        type: Sequelize.BOOLEAN, // Corrected data type
        allowNull: true,
      },
      person_in_room: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      to_avaible_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      from_end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      descriptions: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('room_features');
  },
};
