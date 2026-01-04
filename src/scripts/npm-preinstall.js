#!/usr/bin/env node

import { promisify } from 'util'
import { exec } from 'child_process'

const name = 'gpgmejs'
const run = promisify(exec)
const systemDeps = [
  ['make',  'make'],
  ['gnupg', 'gpg'],
  ['gpgmepp', 'gpgme-tool'], // gpgme-tool is from C gpgme (dependency of C++ gpgmepp)
]

await testLinuxDeps()

// TODO testWindowsDeps() {}

async function testLinuxDeps() {
  const missing = (await Promise.allSettled(
    systemDeps.map(([pkg, cmd]) =>
      run(`command -v ${cmd}`)
        .catch(() => ({ pkg }))
    )
  )).filter(({ value }) => value.pkg ?? false).map(({ value }) => value.pkg)
  for (const pkg of missing) {
    error(`"${pkg}" package was not found or is not installed`)
  }
  if (missing.length) {
    error('install the packages above with your system\'s package manager')
    process.exit(1)
  }
}

function error(str) {
  const red = '\x1b[31m'
  const reset = '\x1b[0m'
  console.error(`${red}[${name}]${reset} ${str}`)
}