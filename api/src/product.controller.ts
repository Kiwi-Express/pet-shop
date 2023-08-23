const productExpress = require('express')
const productRouter = productExpress.Router()

productRouter.get('/', function (req, res) {
    const connection = req.app.get('db')

    connection.query('SELECT * FROM products', (_, rows) => {
        res.send(
            rows.map((row) => ({
                id: row.id,
                desc: row.desc,
                name: row.name,
                price: row.price,
            }))
        )
    })
})

productRouter.get('/:id', function (req, res) {
    const { isAdmin } = require('./utils')
    if (!isAdmin(req, res)) return
    
    const connection = req.app.get('db')
    const id = req.params.id

    connection.query('SELECT * FROM products WHERE id = ?', [id], (_, rows) => {
        res.send({
            id: rows[0].id,
            desc: rows[0].desc,
            name: rows[0].name,
            price: rows[0].price,
            categoryId: rows[0].fk_cat_id,
        })
    })
})

productRouter.post('/', (req, res) => {
    const { isAdmin } = require('./utils')
    if (!isAdmin(req, res)) return

    const connection = req.app.get('db')
    const name = req.body.name
    const price = req.body.price
    const desc = req.body.desc
    const categoryId = req.body.categoryId

    connection.query(
        `INSERT INTO products (name, price, products.desc, fk_cat_id) VALUES ('${name}', ${price}, '${desc}', ${categoryId})`,
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

productRouter.put('/:id', (req, res) => {
    const { isAdmin } = require('./utils')
    if (!isAdmin(req, res)) return

    const connection = req.app.get('db')
    const name = req.body.name
    const price = req.body.price
    const desc = req.body.desc
    const categoryId = req.body.categoryId
    const id = req.params.id

    connection.query(
        'UPDATE products SET ? WHERE id = ?',
        [{ name, desc, price, fk_cat_id: categoryId }, id],
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

productRouter.delete('/:id', (req, res) => {
    const { isAdmin } = require('./utils')
    if (!isAdmin(req, res)) return

    const connection = req.app.get('db')
    const id = req.params.id

    connection.query('DELETE FROM products WHERE id = ?', [id], (err) => {
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

module.exports = productRouter
