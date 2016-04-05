/*! Copyright (c) 2015 Little Genius Education Ltd.  All Rights Reserved. */
//console.log('lib-helpers-shared','is Smartix exist?',Smartix || {});
Smartix = Smartix || {};
Smartix.helpers = Smartix.helpers || {};
 
    Smartix.helpers.getTotalUnreadNotificationCount =  function(currentUserId) {
        if (currentUserId) {
            return Notifications.find({ 'userId': currentUserId, 'hasRead': false }).count();
        } else {
            return Notifications.find({ 'userId': Meteor.userId(), 'hasRead': false }).count();
        }
    };

    Smartix.helpers.getUserLanguage = function() {
        // Put here the logic for determining the user language

        var pattern = /-.*/g;
        log.info("getUserLanguage");

        navigator.globalization.getPreferredLanguage(
            function(language) {
                // alert('language: ' + language.value + '\n');
                log.info("getPreferredLanguage:" + language);
                var lang = language.value.replace(pattern, "");
                return lang;
            },
            function() {
                log.error('Error getting language\n');
            }
        );


    };

    Smartix.helpers.randomString = function(length, chars) {
        chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    };





    Smartix.helpers.getClassCode = function(className) {
        var beforeHash = Meteor.user().email + className + new Date().getTime().toString();
        return CryptoJS.SHA1(Smartix.helpers.randomString(10), beforeHash).toString().substring(0, 6);
    };

    Smartix.helpers.getClassCodeNew = function(className) {
        var firstname = Meteor.user().profile.firstname;
        var lastname = Meteor.user().profile.lastname;
        var name = firstname.substring(0, 1) + lastname.substring(0, 4);
        var fullname = name + className;
        return fullname.toLowerCase();
    };

    Smartix.helpers.getLastnameOfCurrentUser = function(requiredCharLength) {

        var userProfile = Meteor.user().profile;
        var trimlastname;
        if (userProfile) {
            if (userProfile.lastname.length < requiredCharLength) {
                trimlastname = userProfile.lastname;
            } else {
                trimlastname = userProfile.lastname.substr(0, requiredCharLength);
            }
        } else {
            trimlastname = "";
        }
        return trimlastname.toLowerCase();
    };


    Smartix.helpers.getFullNameByProfileObj = function(profile) {
        if (!profile) {
            return "";
        }
        return profile.firstname + " " + profile.lastname;
    };

    Smartix.helpers.getFirstName_ByProfileObj = function(profile) {
        if (!profile) {
            return "";
        }
        return profile.firstname;
    };

    Smartix.helpers.getFullNameOfCurrentUser = function() {
        var profile = Meteor.user().profile;
        return profile.firstname + " " + profile.lastname;
    };

    Smartix.helpers.validateEmail = function(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    };


    Smartix.helpers.getNewRecordFile = function() {

        var src = moment().format('x') + ".wav";
        mediaRec = new Media(src,
            // success callback
            function() {
                log.info("recordAudio():Audio Success");
            },

            // error callback
            function(err) {
                log.error("recordAudio():Audio Error: " + err.code);
            }
        );

        return mediaRec;

    };


    Smartix.helpers.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    ////get another person's user object in 1 to 1 chatroom. call by chatroom helpers
    Smartix.helpers.getAnotherUser = function() {

        //find all userids in this chat rooms
        var query = Chat.findOne({ _id: Router.current().params.chatRoomId });
        if (query) {
            var arr = query.chatIds;
            //find and remove the userid of the current user
            var currentUserIdIndex = arr.indexOf(Meteor.userId());
            arr.splice(currentUserIdIndex, 1);

            //return another user's user object
            var targetUserObj = Meteor.users.findOne(arr[0]);
            return targetUserObj;
        }
    };

    Smartix.helpers.getAllUser = function() {
        //find all userids in this chat rooms
        var arr = Chat.findOne({ _id: Router.current().params.chatRoomId }).chatIds;
        //log.info(arr);
        //return all user objects
        var targetUsers = Meteor.users.find({
            _id: { $in: arr }
        }).fetch();
        return targetUsers;

    };

    Smartix.helpers.getAllUserExceptCurrentUser = function() {

        //find all userids in this chat rooms
        var arr = Chat.findOne({ _id: Router.current().params.chatRoomId }).chatIds;
        //log.info(arr);
        //return all user objects
        var targetUsers = Meteor.users.find({
            _id: { $in: arr }
        }).fetch();

        var index = lodash.findIndex(targetUsers, { '_id': Meteor.userId() });
        if (index > -1) {
            targetUsers.splice(index, 1);
        }

        return targetUsers;

    };



lodash.mixin({
  'findByValues': function (collection, property, values) {
    return lodash.filter(collection, function (item) {
      return lodash.includes(item[property], values);
    });
  }
});

lodash.mixin({
  'findByValues2': function (collection, property, values) {
    return lodash.filter(collection, function (item) {
      return item[property] == values;
    });
  }
});

lodash.mixin({
  'findByValuesNested': function (collection, property, secproperty, values) {
    return lodash.filter(collection, function (item) {
      return lodash.includes(item[property][secproperty], values);
    });
  }
});