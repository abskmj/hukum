
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

    const runs = await repo.getRuns(gitInfo.branch)

    const triggeredRuns = runs.filter((run) => run.head_branch === gitInfo.branch && run.head_sha === gitInfo.hash)

    // add workflow info
    for (let index = 0; index < triggeredRuns.length; index++) {
      const run = triggeredRuns[index]
      run.workflow = await repo.getWorkflow(run.workflow_id)
    }

    if (triggeredRuns.length === 1) {
      const run = triggeredRuns[0]

      console.log('\n  ', run.head_commit.message)
      console.log('    ', link(run.workflow.name, run.html_url))

      while (true) {
        let jobsComplete = true

        const jobs = await repo.getJobs(run.id)

        jobs.map((job) => {
          jobsComplete = jobsComplete && job.status === 'completed'

          printer.printItem(job, job.id, '      ')

          job.steps.map((step) => {
            printer.printItem(step, step.number, '        ')
          })
        })

        if (jobsComplete) break

        await sleep()
      }
    } else if (triggeredRuns.length > 1) {
      const run = triggeredRuns[0]
      console.log('\n  ', run.head_commit.message)

      while (true) {
        let jobsComplete = true

        for (let index = 0; index < triggeredRuns.length; index++) {
          const run = triggeredRuns[index]

          printer.printItem(link(run.workflow.name, run.html_url), run.workflow_id, '    ')

          const jobs = await repo.getJobs(run.id)

          jobs.map((job) => {
            jobsComplete = jobsComplete && job.status === 'completed'

            printer.printItem(job, job.id, '    ')

            const stepId = `${job.id}-s`

            if (job.status === 'completed') {
              // if job has already concluded, print the last step
              printer.printItem(job.steps.pop(), stepId, '      ')
            } else {
              // find and print the step which is in progress
              const step = job.steps.find((step) => step.status === 'in_progress')

              if (step) printer.printItem(step, stepId, '      ')
              else printer.printItem(' ', stepId, '      ')
            }
          })
        }

        if (jobsComplete) break

        await sleep()
      }
    } else console.log('\nRecent push didn\'t trigger a workflow')
  } catch (err) {
    console.error(err)
  }
}
