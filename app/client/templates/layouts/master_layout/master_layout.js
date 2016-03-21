/*! Copyright (c) 2015 Little Genius Education Ltd.  All Rights Reserved. */
Template.MasterLayout.helpers({});

Template.MasterLayout.events({});

Template.MasterLayout.onCreated(function () {
  
  log.info('master layout hi');
  log.info(Meteor.userId());
  // Use this.subscribe inside onCreated callback
  this.subscribe("notifications");
  
  //update total unread badge counter on IOS
  this.autorun(function(){
      var totalUnreadBadgeCount = getTotalUnreadNotificationCount();
      log.info('setTotalUnreadBadgeCount:'+totalUnreadBadgeCount);
      if(isIOS){
          Push.setBadge(totalUnreadBadgeCount);
      }  
  });
  
  this.subscribe('images');
  this.subscribe('sounds');
  this.subscribe('documents'); 
  this.subscribe('class',function(){
     
     
      
  });
  this.subscribe('getJoinedClassUser');   
 
  
});