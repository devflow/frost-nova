//////// this is simple test app for debug

const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.post('/account/syncData', (req, res) => {
    res.header("Content-Type",'application/json');
    res.sendFile(path.join(__dirname, 'test_syncData.json'));
})

app.listen(port, () => console.log(`listening on port ${port}!`))