const { runMigration } = require('contentful-migration');
const { getMigrationOptions } = require('./contentful');

function migrationFunction(migration, context) {
  migration.transformEntries({
    contentType: 'searchRefinement',
    
    from: ['json'],
    to: ['json'],
    transformEntryForLocale: ({ json:jsonWithLocale}, currentLocale) => {
      const json = jsonWithLocale[currentLocale];
      if (!json?.locale) {
        json.locale = 'en';
        return {
          json
        };
      };
    },
  });
}

runMigration(getMigrationOptions(migrationFunction))
  .then(() => console.log('Migration Done!'))
  .catch((e) => console.error(e));
