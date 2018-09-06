const express = require('express')
const cors = require('cors')
const scrapping = require('./scrap')

const config = require('./config')

const app = express()

app.use(cors())

const PORT = process.env.PORT ? process.env.PORT : 3010

app.get('/:value', async (req, res) => {
  console.log('=> Start scrapping')
  console.log('------------------------------------------')
  console.log('\n')
  try {
    if (!req.params) throw new Error('no hay parametros')

    const {url, data} = await scrapping(req.params)
    res.json({url, data})
  } catch (err) {
    console.log('Err: ', err)
  }
})

app.listen(PORT, err => {
  if (err) throw new Error('=> Something is wrong ‼️')
  console.log(`=> Server running: http://localhost:${PORT}`)
})
