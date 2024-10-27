const sequelizePaginate = require('sequelize-paginate');
module.exports = function (sequelize, DataTypes) {
  const booking_room = sequelize.define('booking_room', {
      id: {
      type: DataTypes.INTEGER(255).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    room_id: {
      type: DataTypes.INTEGER(255),
      allowNull: true,
      references: {
        model: 'room_posts',
        key: 'id'
      }
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    
    email: {
      type: DataTypes.STRING(191),
      allowNull: true
    },
    contact_person_number: {
      type: DataTypes.INTEGER(255),
      allowNull:false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull:true
    },
    user_id: {
      type: DataTypes.INTEGER(255),
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    from_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
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
    tableName: 'booking_room',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });
  sequelizePaginate.paginate(booking_room);
  
  booking_room.associate = function (models) { 
     
    booking_room.belongsTo(models.room_posts, {
      foreignKey: 'room_id',
      as: 'bookRooms'
    });
    booking_room.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'bookRoomUser'
    });
    
  }
  return booking_room;
};
