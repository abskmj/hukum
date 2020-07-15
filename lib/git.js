
const git = require('simple-git')()

module.exports.getInfo = async () => {
  const info = {}

  const status = await git.status()
  info.branch = status.current

  const log = await git.log()

  info.hash = log.latest.hash
  info.author = log.latest.author_email

  const remotes = await git.getRemotes(true)
  const gh = remotes.find((remote) => remote.refs.push.includes('github.com'))

  info.repo = gh.refs.push
    .replace('https://github.com/', '')
    .replace('git@github.com:', '')
    .replace(/\.git$/, '')

  console.log(info)

  return info
}
