const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('Driver', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    image: {
      type: DataTypes.JSON,
      allowNull: true
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false
    },
    teams:{
      type: DataTypes.STRING,
      allowNull:false
    },
    description:{
      type: DataTypes.STRING,
      allowNull: true
    },

  }, { timestamps: false});
};