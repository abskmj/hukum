const axios = require('axios')
const config = require('./config')

const UnexpectedResponseError = (res) => {
  const err = new Error('Unexpected response from api')
  err.response = res
  return err
}

module.exports.getRepo = (repo) => {
  const options = { baseURL: `https://api.github.com/repos/${repo}/actions` }

  if (config && config.github && config.github.token) {
    options.headers = {}
    options.headers.Authorization = `bearer ${config.github.token}`
  }

  const http = axios.create(options)
  const getRuns = async (branch) => {
    const res = await http.get(`/runs?branch=${branch}`)

    if (res && res.data && res.data.workflow_runs) {
      return res.data.workflow_runs
    } else {
      throw UnexpectedResponseError(res)
    }
  }

  const getJobs = async (run) => {
    const res = await http.get(`/runs/${run}/jobs`)

    if (res && res.data && res.data.jobs) {
      return res.data.jobs
    } else {
      throw UnexpectedResponseError(res)
    }
  }
  return {
    getRuns,
    getJobs
  }
}
