const sequelizePaginate = require('sequelize-paginate');
module.exports = function (sequelize, DataTypes) {
  const room_posts = sequelize.define('room_posts', {
      id: {
      type: DataTypes.INTEGER(255).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(255),
      allowNull:false
    },
    contact_person_number: {
      type: DataTypes.INTEGER(255),
      allowNull:false
    },
    room_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },

    rent_of_room: {
      type: DataTypes.INTEGER(255),
      allowNull: true
    },
    advance_rent: {
      type: DataTypes.INTEGER(255),
      allowNull: true
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'room_posts',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });
  sequelizePaginate.paginate(room_posts);

  room_posts.associate = function (models) { 
    room_posts.hasMany(models.room_images, {
      foreignKey: 'room_id',
      as: 'roomImages'
    });

    room_posts.hasOne(models.room_features, {
      foreignKey: 'room_id',
      as: 'roomFeatures'
    });
    room_posts.hasMany(models.booking_room, {
      foreignKey: 'room_id',
      as: 'roombooking'
    });
  
  }
  return room_posts;
};
