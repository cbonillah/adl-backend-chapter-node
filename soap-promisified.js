const express = require('express');
const bodyParser = require('body-parser');
const soap = require('soap')
const util = require('util')
const xml2js = require('xml2js')

const SERVICE_WSDL = 'https://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php?wsdl'

const createClient = util.promisify(soap.createClient)
const parseXmlString = util.promisify(xml2js.parseString)

let soapClient
let latLonListZipCode

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  latLonListZipCode({ zipCodeList: req.body.zipCode })
    .then(result => parseXmlString(result.listLatLonOut.$value))
    .then(xmlObj => res.send(xmlObj.dwml.latLonList))
    .catch(err => {
      console.error(err)
      res.status(500)
      res.send('Error')
    })
})

createClient(SERVICE_WSDL)
  .then(client => {
    soapClient = client
    latLonListZipCode = util.promisify(soapClient.LatLonListZipCode)
    app.listen(8080)
  })
  .catch(err => console.error(err))

console.log('Server listening on port 8080');