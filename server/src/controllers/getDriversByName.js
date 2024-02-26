require('dotenv').config();
const axios = require("axios")
const URL = "http://localhost:5000/drivers?name.forename="
const { Op } = require("sequelize")
const { Driver } = require("../db.js")

const getDriversByName = async (req, res) =>{
    try{
        const { name } = req.query
        const driverDB = await Driver.findAll({
            where:{
                name:{
                    forename:{

                        [Op.iLike]: `%${name}%`
                    }
                }
            }, limit: 15
        })

        const { data } = await axios.get(`${URL}${name}`)
        const drivers = data.slice(0,15)
        const combinedDrivers = [...driverDB, ...drivers].map(
            ({id, name, image, dob, nationality, teams, description}) =>
            ({id, name, image, dob, nationality, teams, description})
        ) 
        for(let i=0; combinedDrivers.length>i; i++){
            if(combinedDrivers[i].image.url === ""){
                combinedDrivers[i].image.url = "https://media.istockphoto.com/id/109215640/es/vector/piloto-de-coches-de-carrera.jpg?s=612x612&w=0&k=20&c=DfxGsueT0CGKCwVb3aMIRto0b3kaFyV44aLOc-icZOY="
            }
        }
        return combinedDrivers.length > 0 
            ? res.json(combinedDrivers) 
            : res.status(404).send(`No se encontraron conductores con el nombre "${name}".`)
    } catch (error){
        console.error("Error al buscar conductores por nombre:", error);
        return res.status(500).send(error.message)
    }
}
module.exports = getDriversByName