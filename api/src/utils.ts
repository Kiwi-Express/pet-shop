const jsonwebtoken = require('jsonwebtoken')

const JWT_SECRET = 'zazDiMJ7h7hqOKKL7WtP06mjgP05dYhQeDkYxD9VSY3C4JHRIQ'

function signToken(response) {
    return jsonwebtoken.sign(response, JWT_SECRET)
}

function isLoggedIn(req, res) {
    const authToken = req.headers.authorization.split(' ')[1]
    try {
        jsonwebtoken.verify(authToken, JWT_SECRET)
        return true
    } catch (error) {
        res.status(401)
        return false
    }
}
function isAdmin(req, res) {
    const authToken = req.headers.authorization.split(' ')[1]
    try {
        const decoded = jsonwebtoken.verify(authToken, JWT_SECRET)
        if (decoded.access === '1') {
            return true
        } else {
            res.status(403)
            return false
        }
    } catch (error) {
        res.status(401)
        return false
    }
}

module.exports = { signToken, isLoggedIn, isAdmin }
