const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('Driver_Team', {
    DriverId: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true
    },
    TeamId:{
        type: DataTypes.INTEGER,
        
    }
   
  }, { timestamps: false});
};