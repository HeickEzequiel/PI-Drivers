const axios = require("axios");
const URL = 'http://localhost:5000/drivers';
const { Driver } = require ("../db.js")
const getDrivers = async(req, res) => {
    try{
        const driverDB = await Driver.findAll()
        const { data } = await axios.get(`${URL}`)
        const driversData =  [...data, ...driverDB]
        const drivers = driversData.map(
            ({id, name, image, dob, nationality, teams, description}) =>
            ({id, name, image, dob, nationality, teams, description})
        )
        for(let i=0; drivers.length>i; i++){
        if(drivers[i].image.url === ""){
            drivers[i].image.url = "https://media.istockphoto.com/id/109215640/es/vector/piloto-de-coches-de-carrera.jpg?s=612x612&w=0&k=20&c=DfxGsueT0CGKCwVb3aMIRto0b3kaFyV44aLOc-icZOY="
        }
        }

        return drivers.length > 0 ? res.json(drivers) : res.status(404).send("Not Found")
    }
    catch(error){
        res.status(500).send(error.message)
    }

}
module.exports = getDrivers