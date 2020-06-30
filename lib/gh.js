const axios = require('axios')
const config = require('./config')

module.exports.getRepo = (repo) => {
  const options = { baseURL: `https://api.github.com/repos/${repo}/actions` }

  if (config && config.github && config.github.token) {
    options.headers = {}
    options.headers.Authorization = `bearer ${config.github.token}`
  }

  const http = axios.create(options)

  const getWorkflows = () => {
    return http.get('/workflows')
  }

  const getRuns = (branch) => {
    return http.get(`/runs?branch=${branch}`)
  }

  const getJobs = (run) => {
    return http.get(`/runs/${run}/jobs`)
  }

  const getLogs = (run) => {
    return http.get(`/runs/${run}/logs`)
  }
  return {
    getWorkflows,
    getRuns,
    getJobs,
    getLogs
  }
}
