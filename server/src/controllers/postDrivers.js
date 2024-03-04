const { Driver , Team} = require("../db.js")

const postDrivers = async (req, res) =>{

    try{
        const {
            forename,
            surname,
            url,
            dob,
            nationality,
            team1, 
            team2, 
            team3, 
            description,
        } = req.body;
            
        const teams = `${team1},${team2},${team3}`
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
            console.log(newDriver)




            const bringTeams1 = await Team.findAll({
                where:{
                    name : req.body.team1,
              
                }
            })
            const bringTeams2 = await Team.findAll({
                where:{
                   
                    name : req.body.team2,
                   
                }
            })
            const bringTeams3 = await Team.findAll({
                where:{

                    name : req.body.team3
                }
            })
            const idTeams1 = bringTeams1.map((Team)=>Team.id)
            const idTeams2 = bringTeams2.map((Team)=>Team.id)
            const idTeams3 = bringTeams3.map((Team)=>Team.id)
            const driverTeam1 = await newDriver[0].setTeams(idTeams1)
            const driverTeam2 = await newDriver[0].setTeams(idTeams2)
            const driverTeam3 = await newDriver[0].setTeams(idTeams3)
            
            newDriver.pop()

            const driverTeamObj1 = driverTeam1.pop()
            const driverTeamObj2 = driverTeam2.pop()
            const driverTeamObj3 = driverTeam3.pop()
            
            const driverTeamObj = [...driverTeamObj1, ...driverTeamObj2, ...driverTeamObj3]
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