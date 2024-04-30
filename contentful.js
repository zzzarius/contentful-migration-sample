// @ts-nocheck
const contentful = require('contentful')
const contetfulManagement = require("contentful-management");
require("dotenv").config();

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
});

async function getCMA() {
  const cmaClient = contetfulManagement.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  });

  const space = await cmaClient.getSpace(process.env.CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment(
    process.env.CONTENTFUL_ENVIRONMENT_ID
  );
  return {
    cmaClient,
    space,
    environment,
  };
}

module.exports = {
  getMigrationOptions,
  client,
  getCMA,
};
