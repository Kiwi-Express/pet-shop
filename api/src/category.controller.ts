const catExpress = require('express')
const catRouter = catExpress.Router()

catRouter.get('/', function (req, res) {
    const connection = req.app.get('db')

    connection.query('SELECT * FROM categories', (err, rows) => {
        res.send(
            rows.map((row) => ({
                id: row.id,
                name: row.name,
                imgUrl: row.img_url,
            }))
        )
    })
})

catRouter.get('/:id/products', function (req, res) {
    const connection = req.app.get('db')
    const id = req.params.id

    connection.query(
        'SELECT * FROM products WHERE fk_cat_id=?',
        [id],
        (err, rows) => {
            res.send(
                rows.map((row) => ({
                    id: row.id,
                    desc: row.desc,
                    name: row.name,
                    price: row.price,
                }))
            )
        }
    )
})

catRouter.get('/:id', function (req, res) {
    const { isAdmin } = require('./utils')
    if (!isAdmin(req, res)) return

    const connection = req.app.get('db')
    const id = req.params.id

    connection.query(
        'SELECT * FROM categories WHERE id = ?',
        [id],
        (_, rows) => {
            res.send({
                id: rows[0].id,
                name: rows[0].name,
                imgUrl: rows[0].img_url,
            })
        }
    )
})

catRouter.post('/', function (req, res) {
    const { isAdmin } = require('./utils')
    if (!isAdmin(req, res)) return

    const connection = req.app.get('db')
    const name = req.body.name
    const imgUrl = req.body.imgUrl

    connection.query(
        `INSERT INTO categories (name, img_url) VALUES ('${name}', '${imgUrl}')`,
        (err) => {
            if (err) {
                res.send({
                    status: 'ERR',
                    message: err,
                })
                return
            }
            res.send({
                status: 'OK',
            })
        }
    )
})

catRouter.put('/:id', (req, res) => {
    const { isAdmin } = require('./utils')
    if (!isAdmin(req, res)) return

    const connection = req.app.get('db')
    const id = req.params.id
    const name = req.body.name
    const img_url = req.body.imgUrl

    connection.query(
        'UPDATE categories SET ? WHERE id = ?',
        [{ name, img_url }, id],
        (err) => {
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
        }
    )
})

catRouter.delete('/:id', (req, res) => {
    const { isAdmin } = require('./utils')
    if (!isAdmin(req, res)) return

    const connection = req.app.get('db')
    const id = req.params.id

    connection.query('DELETE FROM categories WHERE id = ?', [id], (err) => {
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

module.exports = catRouter
