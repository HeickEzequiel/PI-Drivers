const axios = require("axios");
const URL = 'http://localhost:5000/drivers';

const getDrivers = async(req, res) => {
    try{
        const { data } = await axios.get(`${URL}`)
        const driversData =  data
        const drivers = driversData.map(
            ({id, name, image, dob, nationality, teams, description}) =>
            ({id, name, image, dob, nationality, teams, description})
        )
        console.log(drivers[0].name)
        return drivers.length > 0 ? res.json(drivers) : res.status(404).send("Not Found")
    }
    catch(error){
        res.status(500).send(error.message)
    }

}
module.exports = getDrivers