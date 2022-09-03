const url =
  'https://www.espncricinfo.com/series/asia-cup-2022-1327237/hong-kong-vs-india-4th-match-group-a-1327272/full-scorecard'

const request = require('request')

const cheerio = require('cheerio')

request(url, cb)

function cb(err, res, html) {
  if (err) {
    console.log('error', err)
  } else {
    extractHTML(html)
  }
}

function extractHTML(html) {
  let $ = cheerio.load(html)
  let elemArray = $(
    '.ci-team-score.ds-flex.ds-justify-between.ds-items-center.ds-text-typo-title.ds-mb-2',
  )
  let wTeamName
  for (let i = 0; i < elemArray.length; i++) {
    let hasClass = $(elemArray[i]).hasClass('ds-opacity-50')
    if (hasClass == false) {
      let teamNameElem = $(elemArray[i]).text()
      //   console.log(teamNameElem)
      const [name, score] = teamNameElem.match(/\D+|\d+/g)
      wTeamName = name.trim()
      //   console.log(wTeamName)
    }
  }

  let innings = $('.ds-bg-fill-content-prime.ds-rounded-lg')
  let htmlString = ''
  for (let i = 0; i < innings.length; i++) {
    // let cHTML = $(innings[i]).html()
    // htmlString += cHTML
    let teamNameElem = $(innings[i]).find(
      '.ds-text-tight-s.ds-font-bold.ds-uppercase',
    )
    let teamName = teamNameElem.text()

    teamName = teamName.split('INNINGS')[0]
    teamName = teamName.trim()

    if (wTeamName != teamName) {
      console.log(teamName)

      let wTeamtables = $(innings[i]).find(
        '.ds-w-full.ds-table.ds-table-md.ds-table-auto',
      )

      for (let i = 0; i < wTeamtables.length; i++) {
        let hasClass = $(wTeamtables[i]).hasClass('ci-scorecard-table')

        if (hasClass == false) {
          let allBowlers = $(wTeamtables[i]).find('tr')

          for (let j = 1; j < allBowlers.length; j++) {
            let allCols = $(allBowlers[j]).find('td')
            let playerName = $(allCols[0]).text()
            let noOfWickets = $(allCols[4]).text()
            if (noOfWickets > 0) j += 1
            // console.log(playerName)
            // console.log(noOfWickets)
            console.log(`${playerName} took ${noOfWickets} wickets!`)
          }
        }
      }
    }
  }
  // console.log(htmlString)
}
