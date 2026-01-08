import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const nodeAddon = require('../gpgmejs.node')

type GPGMEBinding = {
  gpgVersion: string,
}

export const {
  gpgVersion,
} = nodeAddon as GPGMEBinding
