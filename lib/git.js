
exports.git = require('simple-git')()

exports.getRepo = async () => {
  const remotes = await exports.git.getRemotes(true)

  const gh = remotes.find((remote) => remote.refs.push.includes('github.com'))

  const regexp = RegExp(/github.com[/:](.*?)\/(.*?)(\.git$|$)/)

  const matches = regexp.exec(gh.refs.push)

  if (matches) {
    return `${matches[1]}/${matches[2]}`
  }
}

exports.getInfo = async () => {
  const info = {}

  const status = await exports.git.status()
  info.branch = status.current

  const log = await exports.git.log()

  info.hash = log.latest.hash
  info.author = log.latest.author_email

  info.repo = await exports.getRepo()

  console.log(info)

  return info
}
