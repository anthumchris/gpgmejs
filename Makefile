ROOT        := $(patsubst %/,%,$(dir $(abspath $(lastword $(MAKEFILE_LIST)))))
DIR_SRC     := $(ROOT)/src
DIR_BUILD   := $(ROOT)/build
DIR_TEST    := $(DIR_BUILD)/test
SRC_CC      := $(shell find $(DIR_SRC) -path $(DIR_SRC)/scripts -prune -o -name "*.cc" -print)
SRC_TS      := $(shell find src -path src/scripts -prune -o -name "*.ts" -print)
SRC_IGNORE  := **/scripts/**
OUT_CC      := $(DIR_BUILD)/gpgmejs.node
OUT_JS      := $(DIR_BUILD)/src/gpgmejs.js

NODE_ARR    := $(shell node -p "const p=require('path'); \
              [p.resolve(process.execPath, '..', '..'), \
              require('node-addon-api').include].join(' ')")
NODE_INC    := $(word 1, $(NODE_ARR))/include/node
NAPI_INC    := $(word 2, $(NODE_ARR))
TSC         := node_modules/.bin/tsc --project $(DIR_SRC)/conf
CXX         := g++
CXXFLAGS    := -std=c++17 -fPIC -fexceptions -DNODE_ADDON_API_ENABLE_MAYBE
INCLUDES    := -I$(NODE_INC) -I$(NAPI_INC)
LDFLAGS     := -lgpgmepp

ifeq ($(shell uname), Darwin)	# macOS
	LDFLAGS += -undefined dynamic_lookup -dynamiclib
else
	LDFLAGS += -shared
endif

# multi-thread make with system's total CPU/processors
#   uses (Linux || macOS || Windows || 1)
NPROCS      := $(shell nproc 2>/dev/null || sysctl -n hw.ncpu 2>/dev/null || echo "$$NUMBER_OF_PROCESSORS")
NPROCS      ?= 1
MAKEFLAGS   += -j$(NPROCS)

# log colors
RED     := $(shell tput setaf 9)    # [1, 9, 124, 160, 196, 202]
ORANGE  := $(shell tput setaf 208)  # [166, 202, 208, 214]
GREEN   := $(shell tput setaf 2)    # [2, 10, 40, 41, 70, 71]
RESET   := $(shell tput sgr0)       # default color

# log utils
DONE_ERROR  = printf "$(strip $(RED))error: %s$(RESET)\n" >&2
DONE_OK     = printf "$(strip $(GREEN))%s ✓$(RESET)\n"
WATCHING    = printf "$(strip $(ORANGE))[ %s ]$(RESET)\n"

.PHONY: all clean build build-cc build-js test dev build-watch test-watch
.NOTPARALLEL: clean

all: build test
build: build-cc build-js
build-cc: $(OUT_CC)
build-js: $(OUT_JS)
clean:
	@ echo cleaning...
	@ rm -rf $(DIR_BUILD)
	@ $(DONE_OK) "cleaning"

$(OUT_CC): $(SRC_CC)
	@ echo building C/C++...
	@ mkdir -p $(DIR_BUILD)
	@ $(CXX) $(CXXFLAGS) $(INCLUDES) $(LDFLAGS) $< -o $@
	@ $(DONE_OK) "building C/C++"

$(OUT_JS): $(SRC_TS)
	@ echo building JS...
	@ mkdir -p $(DIR_BUILD)
	@ $(TSC)
	@ $(DONE_OK) "building JS"

test:
	@ echo "testing..."
	@ NODE_FILES="$(DIR_BUILD)/*.node"; \
		FILES="$$(ls $$NODE_FILES 2>/dev/null)"; \
		if [ -n "$$FILES" ]; then \
			node $(DIR_TEST)/*.js \
				&& $(DONE_OK) "testing"; \
		else \
			$(DONE_ERROR) "$$NODE_FILES files don't exist. Consider \"make build\" first"; \
			exit 1; \
		fi

# developer mode to rebuild/retest on file changes
# --no-print-directory hides "forced in submake: disabling jobserver mode"
WATCHFLAGS	:= MAKEFLAGS= --no-print-directory
dev: build-cc
	@ $(MAKE) $(WATCHFLAGS) build-cc-watch & \
		$(MAKE) $(WATCHFLAGS) build-js-watch & \
		$(MAKE) $(WATCHFLAGS) test-watch & \
		wait
build-cc-watch:
	@ $(WATCHING) "watching C/C++ source files"
	@ watchexec --quiet --exts cc --ignore $(DIR_BUILD) --watch $(DIR_SRC) --ignore $(SRC_IGNORE) -- \
		$(MAKE) $(WATCHFLAGS) --quiet build-cc
build-js-watch:
	@ $(WATCHING) "watching TS source files"
	@ $(TSC) --watch --preserveWatchOutput
test-watch: # consider vitest to watch TS
	@ sleep 1.00 # ensures TSC starts and tests don't run multiple times on starting
	@ $(WATCHING) "watching test files"
	@ watchexec --quiet --no-vcs-ignore --exts node,js --watch $(DIR_BUILD) -- \
		$(MAKE) $(WATCHFLAGS) --quiet test
