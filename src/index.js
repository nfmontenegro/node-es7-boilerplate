import express from 'express'
import puppeteer from 'puppeteer'

// const app = express()

// app.listen(3000, err => {
//   if (err) throw new Error(`Error ${err}`)
//   console.log('Server listening in port: 3000')
// })
;(async () => {
  const browser = await puppeteer.launch({headless: false, slowMo: 150})
  const page = await browser.newPage()
  await page.goto('https://www.google.com')
  await browser.close()
})()
