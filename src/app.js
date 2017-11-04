const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('./'))


app.listen(3060, () => console.log('app listening on port 3060!'))