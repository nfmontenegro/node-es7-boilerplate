const puppeteer = require('puppeteer')
const getElementsDom = require('./utils')
const config = require('../config')

module.exports = async function({value}) {
  try {
    const {baseUri, ...rest} = config
    const browser = await puppeteer.launch(rest)
    const page = await browser.newPage()
    const url = await page.url()
    console.log('=> Launch browser 🚀')

    await page.goto(baseUri, {waitUntil: 'load'})
    console.log('=> Start clicking in the browser')

    await page.click('#nav-icon')
    await page.click('#nav-bar > li:nth-child(3) > a')
    await page.waitFor(500)

    let ntChild = 0
    console.log('Value', value)
    switch (value) {
      case 'iphonex':
        await page.click(
          '#nav-bar > li:nth-child(3) > div > div > div:nth-child(1) > div > a:nth-child(1)'
        )
        await page.waitFor(1500)
        ntChild = 2
        console.log('\n')
        console.log(`=> item selected ntChild: 1, name ${value}`)
        break

      case 'iphone8':
        await page.click(
          '#nav-bar > li:nth-child(3) > div > div > div:nth-child(1) > div > a:nth-child(2)'
        )
        await page.waitFor(1500)
        ntChild = 1
        console.log('\n')
        console.log(`=> item selected ntChild: 2, name ${value}`)
        break
    }

    console.log('=> Get attributes from the page')
    const data = await page.evaluate(async navigator => {
      return await navigator.map(({name, atrr}) => ({
        [name]: document.querySelector(atrr).innerText
      }))
    }, getElementsDom(ntChild))

    await browser.close()
    console.log('\n\n')
    console.log(`Finish scrapping item: ${value}`)

    return {
      data,
      url
    }
  } catch (err) {
    console.log('Error:', err)
  }
}
