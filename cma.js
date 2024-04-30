const { getCMA } = require("./contentful");

require("dotenv").config();

async function migrate() {
  const { environment } = await getCMA();

  const entries = await environment.getEntries({
    content_type: "iframeSection",
  });

  // Currently, contentful migrations do not update references in rich text fields.
  // So just replacing with new content type and preserving the id.
  // It's quick and dirty and I've ran it on test environment first.
  // To make it more robust, I would backup the content first.
  for (const entry of entries.items) {
    const entryId = entry.sys.id;
    const entryLocale = "en-US";
    const entryFields = entry.fields;
    const internalName = entryFields.internalName?.[entryLocale];
    const embedCode = entryFields.embedCode?.[entryLocale];

    if (!embedCode?.trim()?.startsWith("<script")) {
      continue;
    }

    const unpublishedEntry = await entry.unpublish();
    await unpublishedEntry.delete();
    const createdEntry = await environment.createEntryWithId(
      "githubGistSection",
      entryId,
      {
        fields: {
          internalName: {
            [entryLocale]: internalName,
          },
          embedCode: {
            [entryLocale]: embedCode,
          },
        },
      }
    );
    await createdEntry.publish();
  }
}
migrate();
