const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('Team', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  }, { timestamps: false});
};