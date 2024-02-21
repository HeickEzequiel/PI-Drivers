const axios = require("axios");
const { Team } = require("../db.js");
const URL = 'http://localhost:5000/drivers';

const getTeams = async(req, res) => {
    try{
        const teamsDB = await Team.findAll()
        
        if(teamsDB.length === 0){
            const { data } = await axios.get(`${URL}`)
            const teamsData = data      
            
            
            //////////////////lo convierto en array, los separo y los ordeno alfabeticamente//////////////////////////
            const teams = []
            for(let i = 0; teamsData.length > i; i++){
                teams.push(teamsData[i].teams)
                }   
            const combinedTeams = teams
                .filter(name => name !== undefined)
                .flatMap(teams => teams.split(', '))
                .flat()
            const tms = combinedTeams
                .flatMap(name=>name.split(","))
            const uniqueTeams = [...new Set(tms.map(name => name.trim()))].sort()
            
            /////////////////////////////////////////////
            const tmsObj = uniqueTeams.map(team => ({name: team}))           
            await Team.bulkCreate(tmsObj)
             
        }
        const tmsDB = await Team.findAll()
      
        return tmsDB.length > 0 ? res.json(tmsDB) : res.status(404).send("Not Found")    
    }
    catch(error){
        res.status(500).send(error.message)
    }

}
module.exports = getTeams
        
