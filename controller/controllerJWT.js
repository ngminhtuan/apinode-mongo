import jwt from "jsonwebtoken";


const login = async (req, res) => {
    console.log(req.user.username);
    const { username } = req.user
    const id = new Date().getDate()
    const token = jwt.sign({ id, username }, 'jwtSecret', { expiresIn: '30d' })
    res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({ msg: `Hello, ${req.user.username}`, secret: `Here is lucky number ${luckyNumber}` })
}

export { login, dashboard }