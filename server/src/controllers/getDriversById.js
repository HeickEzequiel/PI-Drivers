require('dotenv').config();
const axios = require("axios");
const URL = "http://localhost:5000/drivers"
const { Driver, Team } = require("../db");

const getDriversById = async (req, res) =>{
    try {
        if(isNaN(req.params.id)){
            const dbDriverById = await Driver.findByPk(req.params.id, {include: [{ model: Team, as: 'Teams' }]});
            let teams = dbDriverById.Teams.map((team) => team.name); 
console.log(teams)
            teams = teams.toString();
    
            const driver = 
            {
                id: dbDriverById.id,
                forename: dbDriverById.name.forename,
                surname: dbDriverById.name.surname,
                image: dbDriverById.image.url,
                dob: dbDriverById.dob,
                nationality: dbDriverById.nationality,
                teams: teams,
                description: dbDriverById.description 
            };

            if(!driver.description) driver.description= `Learn more about one of the talented Formula 1 drivers who pushes the limits of speed and skill in every race. ${dbDriverById.name.forename} is a true legend on the asphalt, known for exceptional prowess behind the wheel and the ability to tackle the most intense challenges on the track. With a unique driving style and a career filled with triumphs, ${dbDriverById.name.forename} has left an indelible mark on the history of motorsport. From impressive maneuvers in the turns to bravery in high-pressure situations, this driver embodies the very essence of F1. Dive into their exciting journey, discover exclusive details about their life and career, and stay updated on their latest achievements. Join us in following in the footsteps of ${dbDriverById.name.forename} and experiencing the passion of Formula 1 in a unique and unparalleled way`;
            if(driver.image === "") driver.image= "https://media.istockphoto.com/id/109215640/es/vector/piloto-de-coches-de-carrera.jpg?s=612x612&w=0&k=20&c=DfxGsueT0CGKCwVb3aMIRto0b3kaFyV44aLOc-icZOY="

            


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

            if(!drivers.description) drivers.description= `Learn more about one of the talented Formula 1 drivers who pushes the limits of speed and skill in every race. ${name.surname} is a true legend on the asphalt, known for exceptional prowess behind the wheel and the ability to tackle the most intense challenges on the track. With a unique driving style and a career filled with triumphs, ${name.surname} has left an indelible mark on the history of motorsport. From impressive maneuvers in the turns to bravery in high-pressure situations, this driver embodies the very essence of F1. Dive into their exciting journey, discover exclusive details about their life and career, and stay updated on their latest achievements. Join us in following in the footsteps of ${name.surname} and experiencing the passion of Formula 1 in a unique and unparalleled way`;
            if(drivers.image === "") drivers.image= "https://media.istockphoto.com/id/109215640/es/vector/piloto-de-coches-de-carrera.jpg?s=612x612&w=0&k=20&c=DfxGsueT0CGKCwVb3aMIRto0b3kaFyV44aLOc-icZOY="

            return res.status(200).json(drivers)
        }
        
        
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports = getDriversById
