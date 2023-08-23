const userExpress = require('express')
const userRouter = userExpress.Router()

userRouter.get('/', function (req, res) {
    const { isAdmin } = require('./utils')
    if (!isAdmin(req, res)) return

    const connection = req.app.get('db')
    connection.query('SELECT * FROM users WHERE id != 1', (_, rows) => {
        if (rows.length === 0) {
            res.send({
                status: 'ERR',
                message: 'No users',
            })
            return
        }
        res.send(
            rows.map((row) => ({
                id: row.id,
                firstName: row.first_name,
                lastName: row.last_name,
                email: row.email,
            }))
        )
    })
})

userRouter.get('/:email', function (req, res) {
    const { isLoggedIn } = require('./utils')
    if (!isLoggedIn(req, res)) return

    const connection = req.app.get('db')
    const email = req.params.email

    connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (_, rows) => {
            if (rows.length === 0) {
                res.send({
                    status: 'ERR',
                    message: 'User not found',
                })
                return
            }
            res.send({
                id: rows[0].id,
                firstName: rows[0].first_name,
                lastName: rows[0].last_name,
                email: rows[0].email,
            })
        }
    )
})

userRouter.put('/:id', (req, res) => {
    const { isLoggedIn } = require('./utils')
    if (!isLoggedIn(req, res)) return

    const connection = req.app.get('db')
    const first_name = req.body.firstName
    const last_name = req.body.lastName
    const id = req.params.id

    connection.query(
        'UPDATE users SET ? WHERE id = ?',
        [{ first_name, last_name }, id],
        (err) => {
            if (err) {
                res.send({
                    status: 'ERR',
                    message: err.message,
                })
                return
            }
            res.send({
                status: "OK"
            })
        }
    )
})

userRouter.delete('/:id', (req, res) => {
    const { isAdmin } = require('./utils')
    if (!isAdmin(req, res)) return

    const connection = req.app.get('db')
    const id = req.params.id

    connection.query('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) {
            res.send({
                status: 'ERR',
                message: err.message,
            })
            return
        }
        res.send({
            status: 'OK',
        })
    })
})

module.exports = userRouter
