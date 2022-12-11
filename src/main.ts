import * as core from '@actions/core'
import * as github from '@actions/github'
import {log4TSProvider} from './config/LogConfig'

/* Creates a logger called "model.Account" */
const log = log4TSProvider.getLogger('main')

async function run(): Promise<void> {
  try {
    log.info(JSON.stringify(github.context))
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
