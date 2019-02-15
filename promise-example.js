const req = require('request')
const fs = require('fs')
const util = require('util')

const request = util.promisify(req)

request('https://random.dog/woof.json')
  .then(response => {
    const responseBody = JSON.parse(response.body)
    return responseBody.url
  })
  .then(fetchImage)
  .then(fileName => console.log(`${fileName} was stored successfully!`))
  .catch(err => console.error(err))

function fetchImage(url) {
  const fileName = url.split('/').slice(-1).pop()
  return new Promise((resolve, reject) => {
    req(url)
      .pipe(fs.createWriteStream(fileName))
      .on('close', () => {
        resolve(fileName)
      })
  })
}
