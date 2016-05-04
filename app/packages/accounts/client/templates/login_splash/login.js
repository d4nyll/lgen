/*! Copyright (c) 2015 Little Genius Education Ltd.  All Rights Reserved. */
/*****************************************************************************/
/* Login: Event Handlers */
/*****************************************************************************/

Template.LoginSplash.events({
  'click .gmailLoginBtn': function () {
    log.info("Meteor user /logged in ?");
    log.info( Meteor.user());
    //if (!
    //for details see, http://www.helptouser.com/code/29008008-meteor-js-google-account-filter-email-and-force-account-choser.html
    //and also https://github.com/meteor/meteor/wiki/OAuth-for-mobile-Meteor-clients
    
    Smartix.Accounts.registerOrLoginWithGoogle();

  }
});

/*****************************************************************************/
/* Login: Helpers */
/*****************************************************************************/
Template.LoginSplash.helpers({
  //I18N : function(key) {
  //  log.info("I18N:" + key);
  //  log.info("I18N:" + key);
  //  return TAPi18n.__(key);
  //}
});

/*****************************************************************************/
/* Login: Lifecycle Hooks */
/*****************************************************************************/
Template.LoginSplash.created = function () {
  // alert("created");
  if (Meteor.userId()) {
     //debugger;
     Router.go('TabClasses');
     
  }
};

Template.LoginSplash.rendered = function () {
  // videojs('bg-video').Background();
  // alert("rendered");
  
  /* Populate select dropdown list and then allow user to switch lang on web. TODO
  var languagesObj = TAPi18n.getLanguages();
  lodash.forOwn(languagesObj,function(eachLangObj,key){
      log.info(eachLangObj);
      log.info(key);
      $('#selectLangDropdownList').append($('<option>').text(eachLangObj.name).attr('value', key));
  });*/
  
};

Template.LoginSplash.destroyed = function () {
};
