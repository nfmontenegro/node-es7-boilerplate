import express from 'express'
import puppeteer from 'puppeteer'

const app = express()
const PORT = process.env.PORT ? process.env.PORT : 3010
const baseUri = 'https://maconline.com/'

app.get('/', async (req, res) => {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.goto(baseUri, {waitUntil: 'load'})
  const url = await page.url()

  //start click in the browser
  await page.click('#nav-icon')
  await page.click('#nav-bar > li:nth-child(3) > a')
  await page.waitFor(500)

  await page.click(
    '#nav-bar > li:nth-child(3) > div > div > div:nth-child(1) > div > a:nth-child(1)'
  )
  await page.waitFor(1500)

  //get text attributes
  const data = await page.evaluate(() => {
    const title = document.querySelector(
      '#product-header > div > div > div.col-sm-6.col-sm-pull-6 > h1'
    ).innerText
    const description = document.querySelector(
      '#tab-description > p:nth-child(2)'
    ).innerText
    return {title, description}
  })

  res.json({url, ...data})
  browser.close()
})

app.listen(PORT, () => {
  console.log(`=> Server running: http://localhost:${PORT}`)
})
