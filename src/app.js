const express = require('express')
const app = express()
app.use(express.static('css'));
app.use(express.static('img'));
app.use(express.static('js'));
app.use(express.static('components'))
app.get('/', (req, res) => res.sendFile('index.html'))


app.listen(3060, () => console.log('app listening on port 3060!'))