// @ts-nocheck
const contentful = require('contentful')
require('dotenv').config()

const getMigrationOptions = (migrationFunction) => ({
  migrationFunction,
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  environmentId: process.env.CONTENTFUL_ENVIRONMENT_ID,
  requestBatchSize: process.env.REQUEST_BATCH_SIZE,
});

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT_ID,
})


module.exports = {
  getMigrationOptions,
  client,
}
