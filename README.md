*incomplete — tracking [Official GPGme interface/bindings for Nodejs (node)](https://dev.gnupg.org/T7975)*

# gpgmejs

JavaScript/TypeScript bindings ([nodejs addons](https://nodejs.org/api/addons.html)) to [GPGME](https://www.gnupg.org/software/gpgme/index.html) using:

1. [node-addon-api](https://github.com/nodejs/node-addon-api?tab=readme-ov-file#node-addon-api-module) ([Node-API](https://nodejs.org/api/n-api.html#node-api)) for Application Binary Interface (ABI) stability
1. make/Makefile instead of [node-gyp](https://github.com/nodejs/node-gyp) to be faster and lightweight with fewer installed dependencies

## Usage

*TODO*

## Developers

1. Ensure these packages are installed with your system's package manager:
   ```txt
   make watchexec gpgmepp nodejs
   ```
1. Run `npm install`
2. Use workflow tasks below

### Workflow tasks

Run tasks with either `make [task]` or `npm run [task]`; npm scripts mirror make targets

Examples from the [Makefile](Makefile):

```sh
make                # (make all)
make all            # builds project and runs tests
make dev            # developer mode, watches file changes and rebuilds/retests

make clean          # remove built files
make clean all      # clean and build/test
make build          # build without testing
make test           # test without building

# npm only
npm run npm-reset   # reset for "npm install" reinstallation tests
```
