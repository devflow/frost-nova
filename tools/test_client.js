
const https = require('http')

const data = JSON.stringify({
  bulk:'empty'
})

const options = {
  hostname: '121.159.231.137',
  port: 3426,
  path: 'http://fn.page.link/a.pem',
  method: 'GET',
  headers: {
    'Host' : 'fn.page.link',
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    console.log(d.toString())
    console.log("succeed.")
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()