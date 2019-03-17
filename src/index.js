import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 3000
app.listen(PORT, err => {
  if (err) throw new Error(`Crashed ${err}`)
  console.log(`Server listening in port: http://localhost:${PORT}`)
})
