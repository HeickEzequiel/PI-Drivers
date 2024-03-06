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
        
        const teams = []
        teams.push(team1)
        teams.push(team2)
        teams.push(team3)
        console.log(teams)
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
            
            
            
            
            const bringTeams  = await Team.findAll({
                where:{
                    name : [req.body.team1, req.body.team2, req.body.team3]
                    
                }
            })
            
            
            const  driverTeam  = await newDriver[0].setTeams(bringTeams)
            
            
            
            const finalDriver = [...newDriver, ...driverTeam]
            return res.status(200).json(finalDriver)
        }
        return res.status(400).send("Datos incorrectos")
        
        //no olvidar cargar la base de datos con los teams antes de crear el conductor o va a tirar error          
        
        
        
    }catch (error){
        return res.status(500).send(error.message)
    }
}
module.exports = postDrivers