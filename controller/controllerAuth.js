import { User } from "../models/modelTask.js";
import StatusCodes from 'http-status-codes';
import { CustomBadRequest, CustomUnauthenticated } from "../errors/index.js";

const register = async (req, res) => { 
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user: {name:user.name, token: token} })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({msg: 'Please provide email and password'})
        // throw CustomBadRequest('Please provide email and password')
    }

    const user = await User.findOne({email})

    if (!user) {
        res.status(StatusCodes.UNAUTHORIZED).json({msg: 'Invalid Credentials'})
        // throw CustomUnauthenticated('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
        res.status(StatusCodes.UNAUTHORIZED).json({msg: 'Invalid Credentials'})
        // throw CustomUnauthenticated('Invalid Credentials')
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user: {name: user.name, token}})
}

export { register, login }
 