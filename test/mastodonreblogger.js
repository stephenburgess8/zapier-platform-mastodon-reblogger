'use strict';
const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('reblogger', () => {

  it('should reblog a status', (done) => {
    const bundle = {
      inputData: {
        term: 'css',
        searchHost: 'mastodon.social',
        searchHostBearerToken: '[enter your token here]',
        reblogHost: '[reblog host]',
        reblogHostBearerToken: '[reblog host token]'
      }
    };
    appTester(App.creates.mastodonreblogger.operation.perform, bundle)
      .then((response) => {
        const content = JSON.parse(response.content);
        should.exist(content.acct);
        done();
      })
      .catch(done);
  });
});
