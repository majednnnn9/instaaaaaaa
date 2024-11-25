const express = require("express")
const router = express.Router();
const { LoginSrvice , RigesterService } = require('./../services/user_service')


router.post('/Login', LoginSrvice)
router.post('/Rigetser', RigesterService)


module.exports = router