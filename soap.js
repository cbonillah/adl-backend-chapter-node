const express = require('express')
const bodyParser = require('body-parser')
const soap = require('soap')
const xml2js = require('xml2js')

const SERVICE_WSDL = 'https://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php?wsdl'

const app = express()
let soapClient

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/', (req, res) => {
  soapClient.LatLonListZipCode({ zipCodeList: req.body.zipCode }, (latLonError, result) => {
    if (latLonError) {
      console.error(latLonError)
      res.status(500)
      res.send('Error')
    } else {
      xml2js.parseString(result.listLatLonOut.$value, (latLonError, xmlObj) => {
        if (latLonError) {
          console.error(latLonError)
          res.status(500)
          res.send('Error')
        } else {
          res.send(xmlObj.dwml.latLonList)
        }
      })
    }
  })
})

soap.createClient(SERVICE_WSDL, (error, client) => {
  if (error) {
    console.error(error)
  } else {
    soapClient = client
    app.listen(8080)
    console.log('Server listening on port 8080')
  }
})