const orderExpress = require('express')
const orderRouter = orderExpress.Router()

orderRouter.get('/:id', function (req, res) {
    const { isLoggedIn } = require('./utils')
    if (!isLoggedIn(req, res)) return

    const connection = req.app.get('db')
    const userId = req.params.id

    connection.query(
        'SELECT * FROM receipts WHERE fk_usr_id = ?',
        [userId],
        (err, rows) => {
            if (rows.length === 0) {
                res.send({
                    status: 'ERR',
                    message: 'No orders',
                })
                return
            }
            res.send(
                rows.map((row) => ({
                    id: row.id,
                    date: row.date,
                    address: row.address,
                    city: row.city,
                    zip: row.zip,
                    total: row.total,
                }))
            )
        }
    )
})

orderRouter.get('/:id/items', function (req, res) {
    const { isLoggedIn } = require('./utils')
    if (!isLoggedIn(req, res)) return
    
    const connection = req.app.get('db')
    const receiptId = req.params.id

    connection.query(
        'SELECT receipts.date, receipts.address, receipts.city, receipts.zip, receipts.total, items.price, items.amount, products.name FROM receipts LEFT JOIN items ON items.fk_rec_id = receipts.id LEFT JOIN products ON items.fk_pro_id = products.id WHERE receipts.id = ?',
        [receiptId],
        (err, rows) => {
            if (rows.length === 0) {
                res.send({
                    status: 'ERR',
                    message: 'No items',
                })
                return
            }
            res.send(rows)
        }
    )
})

module.exports = orderRouter
