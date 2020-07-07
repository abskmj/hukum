const figures = require('figures')
const colors = require('ansi-colors')
const moment = require('moment')
require('draftlog').into(console)

const cache = {}

module.exports.printSuggestion = (message) => {
  console.log('')
  console.log(colors.grey(message))
}

module.exports.printItem = (item, indent) => {
  const index = item.id || item.number
  let draft = cache[index]

  if (!draft) {
    cache[index] = draft = console.draft('')
  }

  if (item.status === 'completed') {
    if (item.conclusion === 'success') {
      draft(indent,
        colors.green(`${figures.tick} ${item.name}`),
        colors.grey(`${moment(item.completed_at).diff(moment(item.started_at), 'seconds')}s`)
      )
    } else if (item.conclusion === 'failure') {
      draft(indent,
        colors.red(`${figures.cross} ${item.name}`),
        colors.grey(`${moment(item.completed_at).diff(moment(item.started_at), 'seconds')}s`)
      )
    }
  } else if (item.status === 'in_progress') {
    draft(indent,
      colors.yellow(`${figures.play} ${item.name}`),
      colors.grey(`${moment().diff(moment(item.started_at), 'seconds')}s`)
    )
  } else if (item.status === 'queued') {
    draft(indent,
      colors.grey(`${figures.ellipsis} ${item.name}`)
    )
  }
}
