const expressAuth = require('express')
const authRouter = expressAuth.Router()
const utils = require('./utils.ts')

authRouter.post('/login', (req, res) => {
    const connection = req.app.get('db')
    const email = req.body.email
    const pass = req.body.password

    connection.query(
        'SELECT email, access, id FROM users WHERE email=? AND password=?',
        [email, pass],
        (_, rows) => {
            if (rows.length === 0) {
                res.send({
                    status: 'ERR',
                    message: 'Invalid credentials',
                })
                return
            }
            res.send({
                token: utils.signToken({
                    email: rows[0].email,
                    access: rows[0].access,
                    id: rows[0].id,
                }),
            })
        }
    )
})

authRouter.post('/register', (req, res) => {
    const connection = req.app.get('db')
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password

    connection.query(
        `INSERT INTO users (first_name, last_name, email, password, access) VALUES ('${firstName}', '${lastName}', '${email}', '${password}', 2)`,
        (err) => {
            if (err) {
                res.send({
                    status: 'ERR',
                    message: err.message,
                })
                return
            }
            res.send({
                email,
                lvl: 1,
            })
        }
    )
})

module.exports = authRouter
