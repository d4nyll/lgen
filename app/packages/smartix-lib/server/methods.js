/*! Copyright (c) 2015 Little Genius Education Ltd.  All Rights Reserved. */
/* Server Only Methods */

Meteor.methods({
   /* Example:
   * '/app/items/insert': function (item) {}
   */

  ping: function () {
    this.unblock();
    try {
     log.info(Mandrill.users.ping());
    }
    catch (e) {
      log.error(e);
    }
  },

  ping2: function () {
    this.unblock();
    try {
      log.info(Mandrill.users.ping2());
    }
    catch (e) {
      log.error(e);
    }
  },

  testEmail: function () {
    try {
      Mandrill.messages.send(Smartix.testMail("", ""));
    }
    catch (e) {
      log.error(e);
    }
  },

  feedback: function (content) {
    // feedback@littlegenius.io
    try {
      Mandrill.messages.send(Smartix.feedback(content));
    }
    catch (e) {
      log.error(e);
    }
  },
  chatroomEmail: function(recipientUsers,orginateUser,content){
    //log.info(recipientUsers);
    //log.info(orginateUser);
    //log.info(content);
    
    //1. we filter and retain user who is opted to receive email
    //2. we filter and retain user whose email is verified
    //3. group recipient users by their lang, if they dont have lang, default it as en.
    //4. Then we send email in batch per each lang
    
    var optInUsersGroupByLang = lodash.chain(recipientUsers)
                                      .filter(function(user){
                                        if(user.profile.email){
                                            if(user.emails[0].verified || user.services.google.verified_email){
                                                return true;
                                            }   
                                        }else{
                                            return false;
                                        }
                                      })
                                      .groupBy('profile.lang')
                                      .value();
    
    log.info(optInUsersGroupByLang);
    
    for(var lang in optInUsersGroupByLang){
        
        var chatRoomRecepientArr = []; 
        optInUsersGroupByLang[lang].map(function(eachUser){
            var chatRoomRecepient = { 
                email: eachUser.emails[0].address,
                name:  eachUser.profile.firstname+ " " + eachUser.profile.lastname
            }
            chatRoomRecepientArr.push(chatRoomRecepient);            
        });
        
        log.info(chatRoomRecepientArr);
        log.info(lang);
        
        
            try {
              var emailTemplateByUserLangs = Smartix.messageEmailTemplate(chatRoomRecepientArr, orginateUser, content, {
                                                type:'chat',
                                                lang:lang
                                             });  
              Mandrill.messages.send(emailTemplateByUserLangs);       
            }
            catch (e) {
              log.error(e);
            }
               
    }
  },




  getUserCreateClassesCount: function(){
      return Classes.find({createBy: Meteor.userId()}).count();
  },


  pushTest: function (userId) {
    Push.send({
      from: 'push',
      title: 'Hello',
      text: 'world',
      query: {
        userId: userId
      }
    });
  },

  serverNotification: function (notificationObj,inAppNotifyObj) {
  
    var notificationObjType;
    var filteredUserIdsWhoEnablePushNotify = [];
    
    //if is an object. i.e userId: {$in: flattenArray}
    if(lodash.isPlainObject(notificationObj.query.userId) ){
            notificationObjType="multiple";      
            //only keep users who want to receive push notification
                filteredUserIdsWhoEnablePushNotify = notificationObj.query.userId.$in.filter(function(eachUserId){
                var userObj = Meteor.users.findOne(eachUserId);
                if (lodash.get(userObj, 'profile.push')) {
                   return true;
                }else{
                   return false;
                }    
            });
            notificationObj.query.userId.$in = filteredUserIdsWhoEnablePushNotify;
            Push.send(notificationObj);


    }else{
    //else if is just one userid
        notificationObjType="single";
        var userId = notificationObj.query.userId;
        var userObj = Meteor.users.findOne(userId);
        if (lodash.get(userObj, 'profile.push')) {
            filteredUserIdsWhoEnablePushNotify.push(userId);
            notificationObj.badge = Smartix.helpers.getTotalUnreadNotificationCount(userId);
            Push.send(notificationObj);
        }             
    }
    
    if(inAppNotifyObj && notificationObj.payload.type == 'chat'){
        
        var userIds = filteredUserIdsWhoEnablePushNotify;
        
        //send notification via websocket using Streamy
        userIds.map(function(userId){
            //log.info("streamy:newchatmessage:"+userId);
            var socketObj = Streamy.socketsForUsers(userId);
            //log.info(socketObj);
            
            socketObj._sockets.map(function(socket){
                Streamy.emit('newchatmessage', { from: notificationObj.from,
                                                text: notificationObj.text,
                                                chatRoomId: inAppNotifyObj.chatRoomId                                  
                }, socket); 
            });
        });        
    }

  },

  insertImageTest: function (filePath) {
    Images.insert(filePath, function (err, fileObj) {
      if (err)log.error(err);
      else {
        log.info(fileObj);
      }
    });
  },

  addInvitedPplId: function (id) {
    var profile = "";
    if (!Meteor.user().profile['invitedContactIds']) {
      profile = Meteor.user().profile;
      var contactsIds = [];
      contactsIds.push(id);
      profile.contactsIds = contactsIds;
      Meteor.users.update(Meteor.userId(), {$set: {profile: profile}});
    } else {
      profile = Meteor.user().profile;
      var contactsIds = Meteor.user().profile.contactsIds.push(id);
      profile.contactsIds = contactsIds;
      log.info(profile);
      Meteor.users.update(Meteor.userId(), {$set: {profile: profile}});
    }
  },

  getShareLink: function (classCode) {
  //not in use
    return Meteor.settings.public.SHARE_URL + "/" + classCode;
  },

  giveComment: function (commentObj) {
    var selector = {};
    selector.userId = commentObj.userId;
    selector.classId = commentObj.classId;
    Commend.upsert(selector, {
      $set: {
        comment: commentObj.comment
      }
    });
  },

  'class/removeStd': function (dataObject) {
    var selector = {};
    selector.userId = dataObject.userId;
    selector.classId = dataObject.classId;

    log.info(dataObject);
    log.info(dataObject.userId);
    log.info(dataObject.classId);
    // Commend.remove(dataObject);
    Classes.update({_id: dataObject.classId}, {$pull: {joinedUserId: dataObject.userId}});
  },

  getPpLink: function (lang) {
    //this is broken and not called
    return Meteor.settings.public.SHARE_URL + "/legal/" + lang + ".privacy.html";
  },

  updateProfileByPath: function (path, value) {
    // var obj = {};
    // obj = lodash.set(obj,path,value);
    var user = Meteor.user();
    lodash.set(user, path, value);
    Meteor.users.update(Meteor.userId(), user);
  },

  updateProfileByPath2: function (path, fuc) {
    var value = lodash.get(Meteor.user(), 'profile.' + path) || "";
    var newValue = fuc(value);
    var updateObj = {};
    updateObj['profile' + path] = newValue;
    Meteor.users.update(Meteor.userId(), {$set: updateObj});
  },

  addReferral: function (userId) {
    Meteor.users.update(Meteor.userId(), {$inc: {'profile.referral': 1}});
  },

  getUserList:function(){
    if(Meteor.user().admin){
      var result = Meteor.users.find({}).fetch();
      return result;
    }else{
      return "";
    }
  },
  getClassList:function(){
    if(Meteor.user().admin){
      var result = Classes.find({}).fetch();
      return result;
    }else{
      return "";
    }    
  },
  getSetting:function(){
    if(Meteor.user().admin){
      var result = Meteor.settings.public;
      var resultWrapInArray = [];
      resultWrapInArray.push(result);
      
      return resultWrapInArray;
    }else{
      return [];
    }    
  }

});


