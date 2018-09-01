const puppeteer = require('puppeteer')
const {navigator} = require('../utils')

module.exports = async function({value}) {
  try {
    const {baseUri, ...args} = config
    const browser = await puppeteer.launch(args)
    const page = await browser.newPage()

    switch (value) {
      case 'iphonex':
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

        const data = await page.evaluate(async navigator => {
          const elements = await navigator.map(({name, atrr}) => ({
            [name]: document.querySelector(atrr).innerText
          }))

          return elements
        }, navigator)
        await browser.close()
        return {data, url}
        break
    }
  } catch (err) {
    console.log('Error:', err)
    browser.close()
  }
}
