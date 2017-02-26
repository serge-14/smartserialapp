#!/bin/bash

set -ev

if [ ${TRAVIS_OS_NAME} = "linux" ]; then
    npm run package-linux;
else
    npm run package-mac;
fi

cd release-builds/$APP_BIN_OUTPUT;
ls
zip -r $APP_BIN_OUTPUT.zip .;

exit 0;