const MurmurHash3 = require("imurmurhash");

module.exports = async function (migration, context) {
  const subjects = await context.makeRequest({
    method: "GET",
    url: `/entries?content_type=subject`,
  });

  migration.transformEntries({
    contentType: "course",
    from: ["primarySubject"],
    to: ["learnPage"],
    transformEntryForLocale: (
      { primarySubject: primarySubjectWithLocale },
      currentLocale
    ) => {
      const primarySubject = primarySubjectWithLocale?.[currentLocale];
      if (!primarySubject) {
        return;
      }
      const learnPage = subjectsMap.get(primarySubject.sys.id).fields.learnPage[
        currentLocale
      ];
      return {
        learnPage,
      };
    },
  });

  // It doesn't update references in rich text fields.
  migration.transformEntriesToType({
    sourceContentType: "iframeSection",
    targetContentType: "githubGistSection",
    from: ["internalName", "embedCode"],
    shouldPublish: true,
    updateReferences: true,
    removeOldEntries: true,
    identityKey: function (fields) {
      const value = fields?.internalName?.["en-US"] + new Date().toISOString();
      console.log(`MurmurHash3(${value}) = ${MurmurHash3(value).result()}`);
      return MurmurHash3(value).result().toString();
    },
    transformEntryForLocale: function (fromFields, currentLocale, { id }) {
      if (!fromFields.embedCode[currentLocale]?.trim()?.startsWith("<script")) {
        return undefined;
      }
      return {
        originalId: id,
        internalName: fromFields.internalName[currentLocale],
        embedCode: fromFields.embedCode[currentLocale],
      };
    },
  });
};
