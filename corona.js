const request = require('request')
const cheerio = require('cheerio')
const chalk = require('chalk')

request('http://www.worldometers.info/coronavirus', cb)

function cb(error, res, html) {
  if (error) {
    console.log('error: ', error)
  } else {
    handlehtml(html)
  }
}

function handlehtml(html) {
  let selectorTool = cheerio.load(html)
  let arr = selectorTool('#maincounter-wrap span')
  //   for(let i=0;i<arr.length;i++){
  //    let data= selectorTool(arr[i]).text()
  //    console.log(data)
  //   }
  let totalCases = selectorTool(arr[0]).text()
  let totalDeaths = selectorTool(arr[1]).text()
  let totalRecoveries = selectorTool(arr[2]).text()

  console.log(chalk.gray('total cases are ', totalCases))
  console.log(chalk.red('total deaths are ', totalDeaths))
  console.log(chalk.green('total recoveries are ', totalRecoveries))
}
