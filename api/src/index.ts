const mysql = require('mysql')
const express = require('express')
const cors = require('cors')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    database: 'zavrsni',
})
const app = express()
app.use(express.urlencoded())
app.use(express.json())
app.use(cors())

app.set('db', connection)

const port = 3000

const auth = require('./auth.controller.ts')
const product = require('./product.controller.ts')
const category = require('./category.controller.ts')
const checkout = require('./checkout.controller.ts')
const order = require('./order.controller.ts')
const user = require('./user.controller.ts')

app.use('/auth', auth)
app.use('/products', product)
app.use('/categories', category)
app.use('/checkout', checkout)
app.use('/orders', order)
app.use('/users', user)

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})
