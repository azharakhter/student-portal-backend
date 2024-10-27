const sequelizePaginate = require('sequelize-paginate');
module.exports = function (sequelize, DataTypes) {
  const room_images = sequelize.define('room_images', {
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
  
    image_url: {
      type: DataTypes.STRING(255),
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
    tableName: 'room_images',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });
  sequelizePaginate.paginate(room_images);
    
  room_images.associate = function (models) { 
     
    room_images.belongsTo(models.room_posts, {
      foreignKey: 'room_id',
      as: 'bookImages'
    });
    
  }
  return room_images;
};
