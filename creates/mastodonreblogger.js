
const perform = (z, bundle) => {
  const searchUrl = `https://${ bundle.inputData.searchHost }/api/v1/timelines/tag/${ bundle.inputData.term }`;
  const searchOptions = {
    headers: {
      authorization: 'Bearer ' + bundle.inputData.searchHostBearerToken
    }
  };
  return z.request(searchUrl, searchOptions)
    .then(response => {
      const content = JSON.parse(response.content);
      const findOptions = {
        headers: {
          authorization: 'Bearer ' + bundle.inputData.reblogHostBearerToken
        }
      };
      const status = content[0];
      const findUrl = `https://${ bundle.inputData.reblogHost }/api/v1/search?q=${ status.uri }`;
      return z.request(findUrl, findOptions);
    })
    .then(response => {
      const content = JSON.parse(response.content)
      if (content.statuses.length > 0) {
        const status = content.statuses[0];
        const noBot = status.account.note.indexOf('nobot') !== -1;
        const reblogOptions = {
          headers: {
            authorization: 'Bearer ' + bundle.inputData.reblogHostBearerToken
          },
          method: 'POST'
        };
        const reblogUrl = `https://${ bundle.inputData.reblogHost }/api/v1/statuses/${ status.id }/reblog`;
        if (!noBot) {
          return z.request(reblogUrl, reblogOptions);
        }
      }
      return {};
    })
    .then(response => {
      if (response.content) {
        const content = JSON.parse(response.content);
        const account = content.reblog.account.acct;
        const followOptions = {
          headers: {
            authorization: 'Bearer ' + bundle.inputData.reblogHostBearerToken
          },
          method: 'POST',
          body: {
            uri: account
          }
        };
        const followUrl = `https://${ bundle.inputData.reblogHost }/api/v1/follows`;
        return z.request(followUrl, followOptions);
      }
      return {};
    });
}


module.exports = {
  key: 'mastodonreblogger',
  noun: 'Mastodon Reblogger',
  display: {
    label: 'Mastodon Reblogger',
    description: 'Reblog from one Mastodon instance to another by hashtag'
  },
  operation: {
    inputFields: [
      {
        key: 'term',
        type: 'string',
        label: 'Search Term',
        helpText: 'Enter a term with no spaces to search for hashtags on the instance'
      },
      {
        key: 'searchHost',
        type: 'string',
        label: 'Search Host',
        helpText: 'Enter the simple domain of the host whose API you\'d like to use (e.g. Mastodon.Social)'
      },
      {
        key: 'searchHostBearerToken',
        type: 'string',
        label: 'Search Host Bearer Token',
        helpText: 'Enter your bearer token to use the API of the host you\'ve chosen'
      },
      {
        key: 'reblogHost',
        type: 'string',
        label: 'Reblog Host',
        helpText: 'Enter the simple domain of the host where you will be reblogging'
      },
      {
        key: 'reblogHostBearerToken',
        type: 'string',
        label: 'Reblog Host Bearer Token',
        helpText: 'Enter the bearer token to use the API of the host where you\'ll be reblogging'
      },
    ],
    perform: perform
  }
};
