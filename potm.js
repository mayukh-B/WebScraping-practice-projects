// .ds-text-tight-m.ds-font-medium ds-text-ui-typo ds-underline ds-decoration-ui-stroke hover:ds-text-ui-typo-primary hover:ds-decoration-ui-stroke-primary ds-block

const request = require('request')
const cheerio = require('cheerio')

request(
  'https://www.espncricinfo.com/series/asia-cup-2022-1327237/bangladesh-vs-sri-lanka-5th-match-group-b-1327273/full-scorecard',
  cb,
)

function cb(error, res, html) {
  if (error) {
    console.log('error ', error)
  } else {
    handleHTML(html)
  }
}
// '.ds-px-4.ds-py-2.ds-self-stretch.ds-w-full .ds-mr-1.ds-break-words',
function handleHTML(html) {
  let selectorTool = cheerio.load(html)
  let MOTM = selectorTool(
    '.ds-px-4.ds-py-2.ds-self-stretch.ds-w-full .ds-inline-flex.ds-items-start.ds-leading-none ',
  )
  let name1 = selectorTool(MOTM[0]).text()
  console.log(`Man of the match is : ${name1}`)
  //   console.log(MOTM[1])
}
