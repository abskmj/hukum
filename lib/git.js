
const git = require('simple-git')()

const getRepo = async () => {
  const remotes = await git.getRemotes(true)
  const gh = remotes.find((remote) => remote.refs.push.includes('github.com'))

  const regexp = RegExp(/github.com[/:](.*?)\/(.*?)\.git$/)

  const matches = regexp.exec(gh.refs.push)

  if (matches) {
    return `${matches[1]}/${matches[2]}`
  }
}

module.exports.getInfo = async () => {
  const info = {}

  const status = await git.status()
  info.branch = status.current

  const log = await git.log()

  info.hash = log.latest.hash
  info.author = log.latest.author_email

  info.repo = await getRepo()

  console.log(info)

  return info
}
