const checkoutExpress = require('express')
const checkoutRouter = checkoutExpress.Router()
const format = require('date-fns/format')

checkoutRouter.post('/', (req, res) => {
    const { isLoggedIn } = require('./utils')
    if (!isLoggedIn(req, res)) return
    
    const connection = req.app.get('db')
    const items = req.body.items
    const userId = req.body.userId
    const address = req.body.address
    const city = req.body.city
    const zip = req.body.zip

    let price = 0

    for (let i = 0; i < items.length; i++) {
        price += items[i].qtyPrice
    }

    connection.query(
        `INSERT INTO receipts (fk_usr_id, date, total, city, adress, zip) VALUES (${userId}, '${format(
            new Date(),
            'yyyy-MM-dd HH:MM:SS'
        )}', ${price}, '${city}', '${address}', '${zip}')`,
        (err, result) => {
            if (err) {
                res.send({
                    Result: 'ERR',
                    Message: err.message,
                })
                return
            }

            for (let i = 0; i < items.length; i++) {
                connection.query(
                    `INSERT INTO items (fk_rec_id, fk_pro_id, price, amount) VALUES (${result.insertId}, ${items[i].id}, ${items[i].price}, ${items[i].qty})`,
                    (err) => {
                        if (err) {
                            res.send({
                                Result: 'ERR',
                                Message: err.message,
                            })
                        }
                    }
                )
            }
            res.send({})
        }
    )
})

module.exports = checkoutRouter
