const { Driver , Team} = require("../db.js")

const postDrivers = async (req, res) =>{
   
    try{
        const {
            name,
            last_name,
            description,
            image,
            nationality,
            birthdate,
            teams
        } = req.body;
        if(name && last_name && description && image && nationality && birthdate && teams){
            const newDriver = await Driver.findOrCreate({
                where:{
                    name,
                    last_name,
                    description,
                    image,
                    nationality,
                    birthdate,
                    teams
                }
            })
            const bringTeams = await Team.findAll({
                where:{
                    name : req.body.teams
                }
            })
            const idTeams = bringTeams.map((Team)=>Team.id)
            const driverTeam = await newDriver[0].setTeams(idTeams)
            
            newDriver.pop()
            const driverTeamObj = driverTeam.pop()
            
            const finalDriver = [...newDriver, ...driverTeamObj]
            
          
            
            
        return res.status(200).json(finalDriver)
        
            
        }
        return res.status(400).send("Datos incorrectos")
    }catch (error){
        return res.status(500).send(error.message)
    }
}
module.exports = postDrivers