function getElementsDom(value) {
  return [
    {
      name: 'title',
      atrr: '#product-header > div > div > div.col-sm-6.col-sm-pull-6 > h1'
    },
    {
      name: 'description',
      atrr: `#tab-description > p:nth-child(${value})`
    },
    {
      name: 'size',
      atrr:
        '#tab-technical_details > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(2)'
    },
    {
      name: 'processor',
      atrr:
        '#tab-technical_details > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2)'
    },
    {
      name: 'screen',
      atrr:
        '#tab-technical_details > table:nth-child(2) > tbody > tr:nth-child(6) > td:nth-child(2)'
    }
  ]
}

module.exports = getElementsDom
