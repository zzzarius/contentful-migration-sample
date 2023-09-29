#!/bin/bash
set -o allexport; source .env; set +o allexport
./node_modules/.bin/contentful space migration migrate.js  -s $CONTENTFUL_SPACE_ID -e $CONTENTFUL_ENVIRONMENT_ID --mt $CONTENTFUL_MANAGEMENT_ACCESS_TOKEN
