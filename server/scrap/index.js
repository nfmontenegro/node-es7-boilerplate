const puppeteer = require('puppeteer')
const getElementsDom = require('../utils')

module.exports = async function({value}) {
  try {
    const {baseUri, ...args} = config
    const browser = await puppeteer.launch(args)
    const page = await browser.newPage()
    const url = await page.url()
    console.log('=> Launch browser 🚀')
    await page.goto(baseUri, {waitUntil: 'load'})

    console.log('=> Start clicking in the browser')
    await page.click('#nav-icon')
    await page.click('#nav-bar > li:nth-child(3) > a')
    await page.waitFor(500)

    let elementsDoms
    switch (value) {
      case 'iphonex':
        await page.click(
          '#nav-bar > li:nth-child(3) > div > div > div:nth-child(1) > div > a:nth-child(1)'
        )
        await page.waitFor(1500)
        elementsDoms = getElementsDom(1)
        break

      case 'iphone8':
        await page.click(
          '#nav-bar > li:nth-child(3) > div > div > div:nth-child(1) > div > a:nth-child(2)'
        )
        await page.waitFor(1500)
        elementsDoms = getElementsDom(2)
        break
    }

    console.log('=> Get attributes from the page')
    const data = await page.evaluate(async navigator => {
      const elements = await navigator.map(({name, atrr}) => ({
        [name]: document.querySelector(atrr).innerText
      }))

      return elements
    }, elementsDoms)
    await browser.close()
    console.log('\n\n')
    console.log(`Finish scrapping item ${value}`)
    return {data, url}
  } catch (err) {
    console.log('Error:', err)
  }
}
