const axios = require('axios')
const config = require('./config')
const printer = require('./print')

const UnexpectedResponseError = (res) => {
  const err = new Error('Unexpected response from api')
  err.response = res
  return err
}

module.exports.getRepo = (repo) => {
  const options = { baseURL: `https://api.github.com/repos/${repo}/actions` }
  options.headers = {}

  if (config && config.github && config.github.token) {
    options.headers.Authorization = `bearer ${config.github.token}`
  } else if (process.env.HUKUM_GITHUB_TOKEN) {
    options.headers.Authorization = `bearer ${process.env.HUKUM_GITHUB_TOKEN}`
  } else {
    printer.printSuggestion('Github personal token is not configured. Unauthenticated requests to github.com is limited to 60 requests per hour. Details at https://github.com/abskmj/hukum#github-personal-token.')
  }

  const http = axios.create(options)

  const getRuns = async (branch) => {
    const res = await http.get(`/runs?branch=${branch}`)

    if (res && res.data && res.data.workflow_runs) return res.data.workflow_runs
    else throw UnexpectedResponseError(res)
  }

  const getJobs = async (run) => {
    const res = await http.get(`/runs/${run}/jobs`)

    if (res && res.data && res.data.jobs) return res.data.jobs
    else throw UnexpectedResponseError(res)
  }

  const getWorkflow = async (workflow) => {
    const res = await http.get(`/workflows/${workflow}`)

    if(res && res.data && res.data.name) return res.data
    else throw UnexpectedResponseError(res)
  }

  return {
    getRuns,
    getJobs,
    getWorkflow
  }
}
