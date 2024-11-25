const UserModel = require('./../models/user_model')

const LoginSrvice = async (req, res, next) => {
    const User = await UserModel.find({})
    res.json({ data: User })
}
const RigesterService = async (req, res, next) => {
    const { name, password, refToken } = req.body
    const User = await UserModel.create({ name, password })
    res.status(201).json({ "msg": "successful" })
}
module.exports = {
    LoginSrvice,
    RigesterService
}