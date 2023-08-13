import { User } from "../models/modelTask.js";
import StatusCodes from 'http-status-codes';
import { CustomBadRequest, CustomUnauthenticated } from "../errors/index.js";

const register = async (req, res) => {
    try {
        const user = await User.create({ ...req.body })
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({ user: { name: user.name, token: token } })
    } catch (error) {
        console.log(error.message, error.code );
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
       return CustomBadRequest(res, 'Please provide email and password')
    }

    const user = await User.findOne({ email })

    if (!user) {
        return CustomUnauthenticated(res, 'Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
        return CustomUnauthenticated(res, 'Invalid Credentials')
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name, token } })
}

export { register, login }
