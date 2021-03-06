Package.describe({
    name: 'smartix:groups',
    version: '0.0.1',
    summary: 'Internal package. Provides the concept of groups to other packages such as `smartix:newsgroups` and `smartix:classes`.',
    git: '',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');
    api.use('ecmascript');
    api.use('mongo');
    api.use('check');
    api.use('accounts-base');

    //use smartix core as Smartix namespace is init there
    api.use('smartix:core')
    api.use('stevezhu:lodash@4.6.1');
    api.use('smartix:accounts@0.0.1');
    api.use('smartix:accounts-utilities@0.0.1');
    api.addFiles('lib/collections.js', ['client', 'server']);
    api.addFiles('server/groups.js', ['server']);
    api.export('Smartix');
});