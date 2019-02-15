const request = require('request')
const fs = require('fs')

request('https://random.dog/woof.json', (error, response) => {
  if (!error) {
    const responseBody = JSON.parse(response.body)
    const fileName = responseBody.url.split('/').slice(-1).pop()
    request(responseBody.url)
      .pipe(fs.createWriteStream(fileName))
      .on('close', () => {
        console.log(`${fileName} was stored successfully!`)
      })
  }
})