const reblog = require('./creates/mastodonreblogger');

const handleHTTPError = (response, z) => {
  if (response.status >= 400) {
    throw new Error(`Unexpected status code ${response.status}`);
  }
  return response;
};

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  afterResponse: [
    handleHTTPError
  ],
  resources: {},
  searches: {},
  creates: {
    [reblog.key]: reblog,
  }
};

module.exports = App;
