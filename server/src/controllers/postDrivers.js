const { Driver , Team} = require("../db.js")

const postDrivers = async (req, res) =>{

    try{
        const {
            forename,
            surname,
            url,
            dob,
            nationality,
            teams,
            description,
        } = req.body;
            
        if(forename && surname && url!==undefined && dob && nationality && teams && description!==undefined){
            const newDriver = await Driver.findOrCreate({
                where:{
                    name:{
                        forename,
                        surname
                    },
                    image:{
                        url
                    },
                    dob,
                    nationality,
                    teams,
                    description,
                }
            })
            console.log(req.body.teams)
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
            
  //no olvidar cargar la base de datos de teams antes de crear el conductor o va a tirar error          
            
        
            
    }catch (error){
        return res.status(500).send(error.message)
    }
}
module.exports = postDrivers