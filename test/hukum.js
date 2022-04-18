/* eslint-env mocha */

const hukum = require('../lib/hukum')

describe('hukum', () => {
  it('should start without any error', async () => {
    hukum.start()
  })
})
