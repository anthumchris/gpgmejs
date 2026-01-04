import assert from 'assert'
import { gpgVersion } from '../build/gpgmejs.js'

assert(gpgVersion, "undefined named import")
assert.match(gpgVersion, /^\d+\.\d+\.\d+$/, "gpgVersion invalid")
