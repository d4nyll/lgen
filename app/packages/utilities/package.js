Package.describe({
  name: 'smartix:utilities',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('templating');
  api.use('stevezhu:lodash@4.6.1');
  api.use('smartix:core');
  api.addFiles('lib/utilities.js', ['client', 'server']);
  api.addFiles('client/helpers.js', 'client');
  api.export('Smartix');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('smartix:utilities');
  api.addFiles('utilities-tests.js');
});
