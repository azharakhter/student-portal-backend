const sequelizePaginate = require('sequelize-paginate');
module.exports = function (sequelize, DataTypes) {
  const room_features = sequelize.define('room_features', {
      id: {
      type: DataTypes.INTEGER(255).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    room_id: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      references: {
        model: 'room_posts',
        key: 'id'
      }
    },
    bed_in_room: {
      type: DataTypes.INTEGER(255),
      allowNull:false
    },
    bath_in_room: {
      type: DataTypes.INTEGER(255),
      allowNull:false
    },
    kitchen_in_room: {
      type: DataTypes.INTEGER(255),
      allowNull:false
    },
    person_in_room: {
      type: DataTypes.INTEGER(255),
      allowNull:false
    },
    
    wifi: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    include_bills: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    to_avaible_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    from_end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    descriptions: {
      type: DataTypes.STRING(255),
      allowNull:true
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
    tableName: 'room_features',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });

  sequelizePaginate.paginate(room_features);
  
  room_features.associate = function (models) { 
     
    room_features.belongsTo(models.room_posts, {
      foreignKey: 'room_id',
      as: 'bookRoom'
    });
    
  }

  
  return room_features;
};
