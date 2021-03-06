const _ = require('lodash')

const { md5 } = require('./utils')

const CONFIG_FILEPATH = process.env.CONFIGURATION_FILENAME || 'pr-reviewers-bot.yml'

class Config {
  constructor (context) {
    this.context = context
    this.config = null
  }

  async load () {
    this.config = await this.context.config(CONFIG_FILEPATH)
  }

  get (path, defaults) {
    return _.get(this.config, path, defaults)
  }

  getMinReviewersPerPR () {
    return this.get('min_reviewers_per_pr', 0)
  }

  getTeam () {
    return this.get('team') || this.get('reviewers') || []
  }

  getShuffleTeam () {
    return this.get('shuffle_team', true)
  }

  getTeamHash () {
    const team = this.getTeam()
    const teamSorted = team.sort((a, b) => a > b)

    return md5(teamSorted)
  }
}

module.exports = Config
