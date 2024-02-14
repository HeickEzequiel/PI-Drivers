require('dotenv').config();
const axios = require("axios");
const URL = "http://localhost:5000/drivers"
const { Driver, Team } = require("../db");

const getDriversById = async (req, res) =>{
    try{
        const dbid = req.params.id;
        const driverDB = await Driver.findOne({
            where: {id: dbid},
        });
        const driverId = req.params.id;
        const { data } =await axios.get(`${URL}/${driverId}`)
        console.log(data)
        const {id, name, image, dob, nationality, teams, description} = data;
       
        const drivers = {
            id,
            forename: name.forename,
            surname: name.surname,
            image:image.url,
            dob,
            nationality,
            teams,
            description,            
        };
        if(driverDB && drivers){
            return res.status(200).json({driverDB, drivers})
        }else if (driverDB){
            return res.status(200).json(driverDB)
        }else if (drivers){
            return res.status(200).json(drivers)
        }else{
            res.status(404).send("Not Found")
        }
    }catch (error){
        return res.status(400).send(error.message)
    }

}

module.exports = getDriversById
    
