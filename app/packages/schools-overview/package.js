Package.describe({
  name: 'smartix:schools-overview',
  version: '0.0.1',
  summary: 'School Overview in mobile',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('templating'); 
  api.use('iron:router');
  api.use('aldeed:simple-schema');     
  api.use('aldeed:collection2');

  api.use('alanning:roles@1.2.15');
  api.use('reactive-var','client');
  api.use('smartix:schools');
  
  api.addAssets([
                 'icons/more.png',
                 
                 
                 'icons/attendance-black.svg',
                 'icons/calendar.svg',
                 'icons/class.svg',
                 'icons/contact.svg',
                 'icons/news.svg',
                              
                ],'client');
  api.addFiles(['templates/overview/overview.css','templates/overview/overview.html'],'client');
  api.addFiles('routes.js');
  
  

});

