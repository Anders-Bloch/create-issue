import * as core from '@actions/core'
import {context, getOctokit} from '@actions/github'

import {log4TSProvider} from './config/LogConfig'

/* Creates a logger called "model.Account" */
const log = log4TSProvider.getLogger('main')
const GITHUB_TOKEN = core.getInput('repo_token', {required: true})

async function run(): Promise<void> {
  try {
    log.info(JSON.stringify(context))
    await createCommentOnContext()
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

async function createCommentOnContext(): Promise<unknown> {
  const Github = getOctokit(GITHUB_TOKEN).rest
  return Github.issues.create({
    ...context.repo,
    title: 'Production deployment approval',
    assignee: '',
    body: JSON.stringify({
      repo: context.repo,
      ref: context.ref
    })
  })
}

run()
