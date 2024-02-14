const { Driver } = require("../db.js")

const postDrivers = async (req, res) =>{
    try{
        const {
            id,
            name,
            last_name,
            description,
            image,
            nationality,
            birthdate
        } = req.body;
        if(id && name && last_name && description && image && nationality && birthdate){
            const newDriver = await Driver.findOrCreate({
                where:{
                    id,
                    name,
                    last_name,
                    description,
                    image,
                    nationality,
                    birthdate
                }
            })
            return res.status(200).json(newDriver)
        }
        return res.status(400).send("Datos incorrectos")
    }catch (error){
        return res.status(500).send(error.message)
    }
}
module.exports = postDrivers