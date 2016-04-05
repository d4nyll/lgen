/*! Copyright (c) 2015 Little Genius Education Ltd.  All Rights Reserved. */
/*****************************************************************************/
/* Dob: Event Handlers */
/*****************************************************************************/
Template.Dob.events({
  'click .Confirm': function (argument) {
    var user = Meteor.user();
    lodash.set(user, 'profile.dob', $("#dobInput").val());
    Meteor.call("profileUpdateByObj", user, function (error, result) {
      if (error) {
        log.error("error", error);
      } else {
        Router.go('TabClasses');
      }

    });
  }
});

/*****************************************************************************/
/* Dob: Helpers */
/*****************************************************************************/
Template.Dob.helpers({});

/*****************************************************************************/
/* Dob: Lifecycle Hooks */
/*****************************************************************************/
Template.Dob.created = function () {
};

Template.Dob.rendered = function () {
};

Template.Dob.destroyed = function () {
};