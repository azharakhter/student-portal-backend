const sequelizePaginate = require('sequelize-paginate');
module.exports = function (sequelize, DataTypes) {
  const users = sequelize.define('users', {
      id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    
    email: {
      type: DataTypes.STRING(191),
      allowNull: true
    },
    
    password: {
      type: DataTypes.STRING(191),
      allowNull: true
    },
    role_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
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
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });
  sequelizePaginate.paginate(users);

  users.associate = function (models) { 
    users.hasMany(models.room_posts, {
      foreignKey: 'user_id',
      as: 'userPosts'
    });
    users.hasMany(models.booking_room, {
      foreignKey: 'user_id',
      as: 'userBooking'
    });
    

  
  }
  return users;
};
