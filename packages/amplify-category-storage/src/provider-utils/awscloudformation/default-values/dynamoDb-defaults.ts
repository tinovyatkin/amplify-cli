// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'uuid'.
const uuid = require('uuid');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getAllDefa... Remove this comment to see the full error message
const getAllDefaults = (project: any) => {
  const name = project.projectConfig.projectName.toLowerCase();
  const [shortId] = uuid().split('-');
  const defaults = {
    resourceName: `dynamo${shortId}`,
    tableName: `${name}${uuid().replace(/-/g, '')}`,
  };

  return defaults;
};

module.exports = {
  getAllDefaults,
};
