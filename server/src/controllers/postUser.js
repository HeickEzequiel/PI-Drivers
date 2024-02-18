const { User } = require("../db.js");

const postUser = async (req, res) => {
    try{
    const { email, password, name, lastName } = req.body;
    if(email && password && name, lastName){
        const newUser = await User.findOrCreate({
            where: { email, password, name, lastName }
        })
        return res.json(newUser)
    }
    return res.status(400).send("Datos incorrectos")
    }catch (error){
        return res.status(500).send(error.message)
    }
}

module.exports = postUser;