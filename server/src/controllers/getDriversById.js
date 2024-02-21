require('dotenv').config();
const axios = require("axios");
const URL = "http://localhost:5000/drivers"
const { Driver, Team } = require("../db");

const getDriversById = async (req, res) =>{
    try {
        if(isNaN(req.params.id)){
            const dbDriverById = await Driver.findByPk(req.params.id, {include: [{ model: Team, as: 'Teams' }]});
            let teams = dbDriverById.Teams.map((team) => team.name); 

            teams = teams.toString();
    
            const driver = 
            {
                id: dbDriverById.id,
                forename: dbDriverById.name,
                surname: dbDriverById.last_name,
                image: dbDriverById.image,
                dob: dbDriverById.birthdate,
                nationality: dbDriverById.nationality,
                teams: teams,
                description: dbDriverById.description
            };
            return res.status(200).json(driver)   
        }else{
            const driverId = req.params.id;
            const { data } =await axios.get(`${URL}/${driverId}`)

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
            return res.status(200).json(drivers)
        }
        
        
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports = getDriversById
