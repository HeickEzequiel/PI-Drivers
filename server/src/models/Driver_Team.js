const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('Driver_Team', {
    DriverId: {
      type: DataTypes.STRING,
     
      
    },
    TeamId:{
        type: DataTypes.JSONB,

        allowNull:false

    },

   
  }, { timestamps: false});
};