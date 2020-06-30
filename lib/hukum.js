
const link = require('terminal-link')

const gh = require('./gh')
const git = require('./git')
const printer = require('./print')

const sleep = (ms = 1000) => new Promise((resolve) => {
  setTimeout(resolve, ms)
})

module.exports.start = async () => {
  try {
    const gitInfo = await git.getInfo()

    const repo = gh.getRepo(gitInfo.repo)

    const runRes = await repo.getRuns(gitInfo.branch)

    const run = runRes.data.workflow_runs.find(async (run) => {
      return run.head_branch === gitInfo.branch && run.head_sha === gitInfo.hash
    })

    console.log('  ', link(run.head_commit.message, run.html_url))

    while (true) {
      const jobRes = await repo.getJobs(run.id)

      let jobsComplete = true

      jobRes.data.jobs.map((job) => {
        jobsComplete = jobsComplete && job.status === 'completed'

        printer.printItem(job, '    ')

        job.steps.map((step) => {
          printer.printItem(step, '      ')
        })
      })

      if (jobsComplete) break

      await sleep()
    }
  } catch (err) {
    console.error(err)
  }
}
