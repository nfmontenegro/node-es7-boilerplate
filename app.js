const express = require('express')
const puppeteer = require('puppeteer')

const config = require('./config')

const app = express()
const PORT = process.env.PORT ? process.env.PORT : 3010

const utils = require('./utils')

function getUtils() {
  const {navigator} = utils
  return {navigator}
}

app.get('/', async (req, res) => {
  console.log('\n')
  console.log('------------------------------------------')
  const {baseUri, ...args} = config
  const browser = await puppeteer.launch(args)
  const page = await browser.newPage()

  try {
    console.log('=> Launch browser 🚀')
    await page.goto(baseUri, {waitUntil: 'load'})
    const url = await page.url()

    console.log('=> Start clicking in the browser')
    await page.click('#nav-icon')
    await page.click('#nav-bar > li:nth-child(3) > a')
    await page.waitFor(500)

    await page.click(
      '#nav-bar > li:nth-child(3) > div > div > div:nth-child(1) > div > a:nth-child(1)'
    )
    await page.waitFor(1500)

    console.log('=> Get attributes from the page')
    const data = await page.evaluate(async ({navigator}) => {
      const elements = await navigator.map(({name, atrr}) => {
        return {
          [name]: document.querySelector(atrr).innerText
        }
      })

      return elements
    }, getUtils())

    res.json({url, data})
    browser.close()
  } catch (err) {
    console.log('Err:', err)
    browser.close()
  }
})

app.listen(PORT, () => {
  console.log(`=> Server running: http://localhost:${PORT}`)
})
