const router = require("express").Router();

const getDrivers = require("../controllers/getDrivers.js")
const getDriversById = require("../controllers/getDriversById.js")
const getDriversByName = require("../controllers/getDriversByName.js")
const getTeams = require("../controllers/getTeams.js")
const postDrivers = require("../controllers/postDrivers.js")


router.get("/home", getDrivers)
router.get("/drivers/:id", getDriversById)
router.get("/drivers", getDriversByName)
router.get("/teams", getTeams)
router.post("/newdriver", postDrivers)
module.exports = router;
