const express = require('express')
const path = require('path')
const { HOST } = require('./src/constants')
const db = require('./src/database')

const PORT = process.env.PORT || 80

const app = express()
  .set('port', PORT)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

// Static public files
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.send('Get ready for OpenSea!');
})

app.get('/api/token/:token_id', function(req, res) {
  const tokenId = parseInt(req.params.token_id).toString()
  const card = db[tokenId]
  const data = {
    'name': card.name,
    'attributes': {
      
    },
    "description": card.description, 
    'image': `${HOST}/images/${tokenId}.png`
  }
  res.send(data)
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})