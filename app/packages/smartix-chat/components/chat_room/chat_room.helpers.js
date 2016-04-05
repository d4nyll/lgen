/*! Copyright (c) 2015 Little Genius Education Ltd.  All Rights Reserved. */

/*****************************************************************************/
/* ChatRoom: Helpers */
/*****************************************************************************/
Template.ChatRoom.helpers({
  chatRoomProfile: function () {
    
    var currentChatObj =  Chat.findOne({_id: Router.current().params.chatRoomId});
    if(!currentChatObj){
       return; 
    }
    //log.info('getMessagesObj',classObj);
    if (currentChatObj.messagesObj.length > 0) { 
        
       //log.info('loadedItems',loadedItems.get());
       var rangeFrom = currentChatObj.messagesObj.length - Template.instance().loadedItems.get();
       var rangeTo   = currentChatObj.messagesObj.length;       
       var extraFilterMessages = lodash.filter(currentChatObj.messagesObj,function(num,currentIndex){
           if(currentIndex > rangeFrom && currentIndex < rangeTo){
               return true;
           }
       });       
       extraFilterMessage = lodash.sortBy(extraFilterMessages,['sendAt']);
     
      
          Template.instance().localChatMessagesCollection = new Meteor.Collection(null);
      
       
       for(var i = 0; i < extraFilterMessages.length; i++){
                var currentFilterMsg = extraFilterMessages[i];
                if(i == 0 || extraFilterMessages.length == 1){
                    currentFilterMsg.showTimestamp = true;
                }
                else if(extraFilterMessages.length > 1){
                   
                    var prevFilterMsg = extraFilterMessages[i-1];
                    
                    //log.info('currentFilterMsg',currentFilterMsg);
                    //log.info('nextFilterMsg',nextFilterMsg);           
                    var currentDate = moment.unix(currentFilterMsg.sendAt.substr(0,10)).format("YYYY-MM-DD");
                    var prevDate = moment.unix(prevFilterMsg.sendAt.substr(0,10)).format("YYYY-MM-DD");
                    
                    //log.info('currentDate',currentDate);
                    //log.info('nextDate',nextDate);
                    if(currentDate != prevDate){
                        currentFilterMsg.showTimestamp = true;
                    }else{
                        currentFilterMsg.showTimestamp = false;
                    }
                }else{
                     currentFilterMsg.showTimestamp = false;
                }
             
                Template.instance().localChatMessagesCollection.insert(currentFilterMsg);
                            
       }
       //log.info('extraFilterMessages',extraFilterMessages);
          
      //log.info('localClassMessagesCollection:count:',localClassMessagesCollection.find().count());

      return Template.instance().localChatMessagesCollection.find({},{sort:{"sendAt":1}});
    } else {
      return false;
    }    
  },
  withExtraRightPadding:function(){
    if(!Meteor.isCordova){
      return "padding-right:40px;"
    }else{
      return "";
    }
  },
  isMine: function () {
    return this.from === Meteor.userId() ? "mine" : "notmine";
  },
  isMineBoolean: function (currentUserId) {
    return currentUserId === Meteor.userId() ? true : false;
  },
  userProfile: function () {
    //get another person's user object in 1 to 1 chatroom.     
    var userObj = Smartix.helpers.getAnotherUser();
    return userObj
  },
  getGroupOrCorrespondentAvatar : function () {
    var chat = Chat.findOne({_id: Router.current().params.chatRoomId});
    if(chat){
        if(chat.chatRoomAvatar){
            return chat.chatRoomAvatar;       
        }else{
            //get other person's avatar
            var userObj = Smartix.helpers.getAnotherUser();
            return userObj && userObj.profile && userObj.profile.useravatar;        
        }
    }else{
        return "";
    }
  },
  getUserById:function(userId){
    var targetUserObj = Meteor.users.findOne(userId);
    return targetUserObj;      
  },
  getChatRoomName: function () {
    //we display the name of the chat room or the correspondent or the people in the group chat depending on the context
    if(getTotalChatRoomUserCount() > 2){
       var chat = Chat.findOne({_id: Router.current().params.chatRoomId});  
       if(chat.chatRoomName){
           return chat.chatRoomName;
       }else{
            var maxNumberOfDisplayName = 2;
            var userObjArr =  Smartix.helpers.getAllUser();
            var names = [];
            var generatedString= "";
            if(userObjArr.length > 2){
                lodash.forEach(userObjArr, function (el, index) {
                        if( index < maxNumberOfDisplayName){
                            var name = Smartix.helpers.getFirstName_ByProfileObj(el.profile);
                          names.push(name);
                        }
                });
                if(userObjArr.length > maxNumberOfDisplayName){
                  //var finalStr = TAPi18n.__("And_amp")+ (userObjArr.length - maxNumberOfDisplayName) + "...";
                  var finalStr = TAPi18n.__("And_amp")+ "...";
                  generatedString = names.toString() + finalStr;
                }
                else {
                  generatedString = names.toString(); //lodash(names).toString()
                }
            }
            else{
                lodash.forEach(userObjArr, function (el, index) {
                if (el._id !== Meteor.userId()) {
                    var name = Smartix.helpers.getFullNameByProfileObj(el.profile);
                  names.push(name);
                }
                });
              generatedString = names.toString();
            }
            return generatedString;
       }  
    }else{
        var userObj = Smartix.helpers.getAnotherUser();
        return userObj &&  Smartix.helpers.getFullNameByProfileObj(userObj.profile);        
    }
  },

  isText: function () {
    return this.text !== "";
  },

  isImage: function () {
    return this.image && this.image !== "";
  },

  isSound: function (argument) {
    return this.sound && this.sound !== "";
  },
  
  isDocument: function(){
    return this.document && this.document !== "";  
  },
  
  getDocument: function(){
    var DocumentId = this.document;
    return Documents.findOne(DocumentId);    
  },
  
  getImage: function () {
    var ImageId = this.image.replace("/cfs/files/images/", "");
    return Images.findOne(ImageId);
  },

  isWorkOff: function (argument) {
    
    //get another person's user object in 1 to 1 chatroom.     
    var targetUserObj = Smartix.helpers.getAnotherUser();

  },

  targertWorkingTime: function (argument) {  
    var currentChat = Chat.findOne({_id: Router.current().params.chatRoomId});
    var target;
    var displayOffline = false;
        
    //if it is a group chat
    if(currentChat.chatRoomModerator){
        if(currentChat.chatRoomModerator == Meteor.userId()){  
            //if current user is the moderator of the chatroom,
            //this user is not limited by the office hour.
            return displayOffline;      
        }else{
         target = Meteor.users.findOne( currentChat.chatRoomModerator );             
        }

    }else{ //if it is a one-to-one chat
        target = Smartix.helpers.getAnotherUser();
    }

    if (target.profile.role === "Teacher") {
      if (target.profile.chatSetting && target.profile.chatSetting.workHour) {
        
        
        var workHourTime = target.profile.chatSetting.workHourTime;
        var dayOfWeek = moment().day();
        
        var currentDate = new Date();
        var currentHour = currentDate.getHours();
        var currentMinute = currentDate.getMinutes();
        
        var fromHour = workHourTime.from.split(':')
        var fromMomentHour = parseInt(fromHour[0]);
        var fromMomentMinute = parseInt(fromHour[1]);
        
        var toHour = workHourTime.to.split(':');
        var toMomentHour = parseInt(toHour[0]);
        var toMomentMinute = parseInt(toHour[1]);
        
        //not using range plugin to do the calcuation since the api is not available when usingg i18n moment
        //var fromMoment = moment(workHourTime.from, "HH:mm");
        //var toMoment = moment(workHourTime.to, "HH:mm");
        //var range = moment.range(fromMoment, toMoment);

        //if today is not in work day
        if(!workHourTime.weeks[dayOfWeek-1]){
            displayOffline = true;
        }           
        //if too early
        if (currentHour < fromMomentHour || (currentHour ==  fromMomentHour &&  currentMinute < fromMomentMinute) ) {
            displayOffline = true;
        }
        //if too late
        if( currentHour > toMomentHour ||  (currentHour ==  toMomentHour && currentMinute > toMomentMinute) ){
             displayOffline = true;
        }

     
      }
    }  
    return displayOffline;
  },

  getSound: function (argument) {
    // var SoundId = this.image.replace("/cfs/files/sounds/","");
    return Sounds.findOne(this.sound);
  },

  soundsCollection: function (argument) {
    return Sounds.find();
  },
  
  isNewMessage:function(sendAt){   
     var result = Notifications.findOne({"eventType":"newchatroommessage",'messageCreateTimestampUnixTime':sendAt});       
     //backward comptability
     if(!result){
         return "";
     }  
     if(result.hasRead == false){
         return 'ion-record';
     }else{
         return "";
     }
  },
  isLoadMoreButtonShow: function(){
      var currentChat= Chat.findOne({_id: Router.current().params.chatRoomId});
      
      //log.info('reachTheEnd:loadedItems',loadedItems.get(),'classObjMessages',currentClass.messagesObj.length,'initialLoadItems',initialLoadItems.get());
      if(Template.instance().loadedItems.get() > currentChat.messagesObj.length ){
          return "hidden";
      }else{
          return "";
      }
  }

});

////get another person's user object in 1 to 1 chatroom. call by chatroom helpers
function getAnotherUser(){
  //find all userids in this chat rooms
  var query = Chat.findOne({_id: Router.current().params.chatRoomId});
  if (query) {
    var arr = query.chatIds;
    //find and remove the userid of the current user
    var currentUserIdIndex = arr.indexOf(Meteor.userId());
    arr.splice(currentUserIdIndex, 1);

    //return another user's user object
    var targetUserObj = Meteor.users.findOne(arr[0]);
    return targetUserObj;
  }
}

function getAllUser(){
            //find all userids in this chat rooms
            var arr = Chat.findOne({_id: Router.current().params.chatRoomId}).chatIds;
            //log.info(arr);
            //return all user objects
            var targetUsers =  Meteor.users.find({
                 _id :{ $in: arr}
            }).fetch();
            return targetUsers;
          
}

function getTotalChatRoomUserCount(){
            var chatObj = Chat.findOne({_id: Router.current().params.chatRoomId});
            if(chatObj){
                //find all userids in this chat rooms
                var arr = chatObj.chatIds;
                // log.info(arr);    
                return arr.length;
            }else{
                return -1;
            }  
}