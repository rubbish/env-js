#!/bin/sh

# Usage: test-prototype.sh [version]
# Currently supported versions: 1.6.0.3
#
# This script will check out the jQuery development tree from Subversion if necessary,
# massage the testing scripts as necessary, copy our latest version of env.js into place,
# and then run the test scripts.

if [ -n "$1" ]; then VERSION="$1"; else VERSION="1.6.0.3"; fi
PROTOTYPE_DIR="test/vendor/prototype/"

ant concat

if [ ! -d "$PROTOTYPE_DIR" ]; then
  git clone git://github.com/sstephenson/prototype.git $PROTOTYPE_DIR
fi

mkdir -p $PROTOTYPE_DIR/build
cp dist/env.rhino.js $PROTOTYPE_DIR/build/env.js
cp rhino/js.jar $PROTOTYPE_DIR/build/js.jar
cp bin/prototype-testrunner.js $PROTOTYPE_DIR/build/testrunner.js

cd $PROTOTYPE_DIR
git submodule init
git submodule update
#git checkout $VERSION
rake test:build

# remove unnecessary script tags in test files

java -jar build/js.jar build/testrunner.js
