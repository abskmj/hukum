#! /usr/bin/env node
const hukum = require('../lib/hukum')

// exit the process when enter is pressed
process.stdin.resume()
process.stdin.on('data', d => {
  process.exit(0)
})

hukum.start()
  .then(() => {
    process.exit(0)
  })
