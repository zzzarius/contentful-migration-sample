module.exports = async function (migration, context) {
  const subjects = await context.makeRequest({
    method: 'GET',
    url: `/entries?content_type=subject`
  })
  const subjectsMap = new Map(subjects.items.map((item) => [item.sys.id, item]));

  migration.transformEntries({
    contentType: 'course',
    from: ['primarySubject'],
    to: ['learnPage'],
    transformEntryForLocale: ({ primarySubject:primarySubjectWithLocale }, currentLocale) => {
      const primarySubject = primarySubjectWithLocale?.[currentLocale];
      if (!primarySubject) {
        return;
      }
      const learnPage = subjectsMap.get(primarySubject.sys.id).fields.learnPage[currentLocale];
      return {
        learnPage
      };
    },
  });
}
