/* eslint-env mocha */

const { expect } = require('chai')
const sinon = require('sinon')

const git = require('../lib/git')

describe('return information from local git', () => {
  describe('return repo from github remote url', () => {
    it('ssh url', async () => {
      sinon.stub(git.git, 'getRemotes').returns([{
        refs: {
          push: 'git@github.com:abskmj/hukum.git'
        }
      }])

      const repo = await git.getRepo()

      expect(repo).to.equal('abskmj/hukum')
    })

    it('user repo url', async () => {
      sinon.stub(git.git, 'getRemotes').returns([{
        refs: {
          push: 'git@github.com:abskmj/abskmj.github.io.git'
        }
      }])

      const repo = await git.getRepo()

      expect(repo).to.equal('abskmj/abskmj.github.io')
    })

    it('https url with .git', async () => {
      sinon.stub(git.git, 'getRemotes').returns([{
        refs: {
          push: 'https://github.com/abskmj/hukum.git'
        }
      }])

      const repo = await git.getRepo()

      expect(repo).to.equal('abskmj/hukum')
    })

    it('https url without .git', async () => {
      sinon.stub(git.git, 'getRemotes').returns([{
        refs: {
          push: 'https://github.com/abskmj/hukum'
        }
      }])

      const repo = await git.getRepo()

      expect(repo).to.equal('abskmj/hukum')
    })

    afterEach(() => sinon.restore())
  })
})
