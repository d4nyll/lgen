Package.describe({
    name: 'smartix:accounts',
    version: '0.0.1',
    summary: 'Account Management for the Smartix platform.',
    git: '',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');

    api.use('ecmascript');
    api.use('check');
    api.use('accounts-base');
    //api.use('accounts-google');
    //api.use('accounts-oauth');
    api.use('stevezhu:lodash@4.6.1');
    api.use('accounts-password');
    api.use('alanning:roles');

    //template dependency
    api.use('tap:i18n@1.8.0');
    api.use('templating');
    api.use('iron:router');
    api.use('aldeed:collection2');
    api.use('aldeed:simple-schema');
    api.use('reactive-var', 'client');
    api.use('session');
    api.use('smartix:core');

    // template dependency ends
    api.use('smartix:accounts-system');
    api.use('smartix:accounts-global');
    api.use('smartix:accounts-schools');
    api.use('smartix:accounts-usernames');
    
    api.use('smartix:utilities');

    // temporary comment out, as there is circular dependency
    api.use('smartix:schools', null, { unordered: true });

    api.addFiles('lib/accounts.js', ['client', 'server']);
    api.addFiles('client/accounts.js', 'client');
    api.addFiles('server/core-config.js', 'server');
    api.addFiles('server/accounts.js', 'server');
    api.addFiles('server/publications.js', 'server');
    api.addFiles('server/methods.js', 'server');

    api.addFiles([
        'client/templates/login_splash/login.html',
        'client/templates/login_splash/login.css',
        'client/templates/login_splash/login.js',
        'client/templates/login_splash/loginResponsiveImageLandscape.css',
        'client/templates/login_splash/loginResponsiveImagePotrait.css'
    ], 'client');

    api.addFiles([
        'client/templates/dob/dob.html',
        'client/templates/dob/dob.js'
    ], 'client');

    api.addFiles([
        'client/templates/email_signin/email_signin.html',
        'client/templates/email_signin/email_signin.js'
    ], 'client');

    api.addFiles([
        'client/templates/email_signup/email_signup.html',
        'client/templates/email_signup/email_signup.js',
        'client/templates/email_signup/email_signup.css',
    ], 'client');

    api.addFiles([
        'client/templates/email_verification/email_verification.html',
        'client/templates/email_verification/email_verification.js'
        ], 'client');

    api.addFiles([
        'client/templates/email_forgetpwd/email_forgetpwd.html',
        'client/templates/email_forgetpwd/email_forgetpwd.js'
        ], 'client');

    api.addFiles([
        'client/templates/email_resetpwd/email_resetpwd.html',
        'client/templates/email_resetpwd/email_resetpwd.js'
        ], 'client');

    api.addFiles([
        'client/templates/school_pick/school_pick.html',
        'client/templates/school_pick/school_pick.js'
        ], 'client');

    api.addFiles([
        'client/templates/my_account/my_account.html',
        'client/templates/my_account/my_account.js'
        ], 'client');

    api.addFiles('lib/routes.js', ['client', 'server']);
    
    api.export('Smartix');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('smartix:accounts');
    api.addFiles('accounts-tests.js');
});
