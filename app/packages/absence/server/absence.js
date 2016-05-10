Smartix = Smartix || {};

Smartix.Absence = Smartix.Absence || {};

//Notification from admin to parent to ask for student attendance detail
Smartix.Absence.notificationToParentForDetail = function(parentIds,processId, currentUserId){
       
       check(parentIds, [String]);
       check(processId, String);
       check(currentUserId, String);
       
       var currentUser = Meteor.users().findOne(currentUserId);
       //1. add to notification obj
       //TODO
             
       //2. send push and in-app notification
       parentIds.each(function(parentId){
           
            var notificationObj = {
                    from : Smartix.helpers.getFullNameByProfileObj(currentUser.profile),
                    title : 'TBD We need more detail about your children attendance',
                    text:   'TBD We need more detail about your children attendance',
                    payload:{
                        type: 'attendanceToParent',
                        id:   processId
                    },
                    query:{userId:parentId},
                    badge: Smartix.helpers.getTotalUnreadNotificationCount(parentId)
            };
           Meteor.call("doPushNotification", notificationObj);                 
       });
  
}

//Notification from admin to parent to display approval of leave application
Smartix.Absence.notificationToParentApprovedNotice = function(parentIds,expectedId, currentUserId){

       check(parentIds, [String]);
       check(expectedId, String);
       check(currentUserId, String);
           
       var currentUser = Meteor.users().findOne(currentUserId);    
       //1. add to notification obj
       //TODO
              
       //2. send push and in-app notification   
       parentIds.each(function(parentId){
           
            var notificationObj = {
                    from : Smartix.helpers.getFullNameByProfileObj(currentUser.profile),
                    title : 'TBD We have approved your leave application',
                    text:   'TBD We have approved your leave application',
                    payload:{
                        type: 'attendanceApproved',
                        id:   expectedId
                    },
                    query:{userId:parentId},
                    badge: Smartix.helpers.getTotalUnreadNotificationCount(parentId)
            };
           Meteor.call("doPushNotification", notificationObj);               
       });
   
}

//Notification from parent to admin about request of leave application
Smartix.Absence.notificationToAdminApprovalRequest = function(adminIds,expectedId, currentUserId){

       check(adminIds, [String]);
       check(expectedId, String);
       check(currentUserId, String);
           
       var currentUser = Meteor.users().findOne(currentUserId);      
       //1. add to notification obj
       //TODO
              
       //2. send push and in-app notification   
       adminIds.each(function(adminId){
           
            var notificationObj = {
                    from : Smartix.helpers.getFullNameByProfileObj(currentUser.profile),
                    title : 'TBD A Parent has submitted a leave application',
                    text:   'TBD A Parent has submitted a leave application',
                    payload:{
                        type: 'attendanceSubmission',
                        id:   expectedId 
                    },
                    query:{userId:adminId},
                    badge: Smartix.helpers.getTotalUnreadNotificationCount(adminId)
            };
             Meteor.call("doPushNotification", notificationObj);                            
       });
  
}

//Notification from parent to admin about response from parent of student attendance    
Smartix.Absence.notificationToAdminForDetailReply = function(adminIds,processId, currentUserId){

       check(adminIds, [String]);
       check(processId, String);
       check(currentUserId, String);
           
       var currentUser = Meteor.users().findOne(currentUserId);      
       //1. add to notification obj
       //TODO
       
       //2. send push and in-app notification   
       adminIds.each(function(adminId){
           
            var notificationObj = {
                    from : Smartix.helpers.getFullNameByProfileObj(currentUser.profile),
                    title : 'Parent has replied about children attendance',
                    text:   'Parent has replied about children attendance',
                    payload:{
                        type: 'attendanceToAdmin',
                        id:   processId 
                    },
                    query:{userId:adminId},
                    badge: Smartix.helpers.getTotalUnreadNotificationCount(adminId)
            };
           Meteor.call("doPushNotification", notificationObj);                 
       });
 
}