Smartix = Smartix || {};

Smartix.Absence = Smartix.Absence || {};

//Notification from admin to parent to ask for student attendance detail
Smartix.Absence.notificationToParentForDetail = function (parentIds, processId, currentUserId) {

    check(parentIds, [String]);
    check(processId, String);
    check(currentUserId, String);

    var currentUser = Meteor.users().findOne(currentUserId);

    var processObj = Smartix.Absence.Collections.processed.findOne(processId);
    parentIds.each(function (parentId) {
        //1. add to notification obj
        Notifications.insert({
            eventType: 'attendanceToParent',
            userId: parentId,
            hasRead: false,
            processId: processId,
            namespace: processObj.namespace,
            messageCreateTimestamp: message.createdAt,
            messageCreateByUserId: Meteor.userId()
        });

        //2. send push and in-app notification                  
        var notificationObj = {
            from: Smartix.helpers.getFullNameByProfileObj(currentUser.profile),
            title: 'TBD We need more detail about your children attendance',
            text: 'TBD We need more detail about your children attendance',
            payload: {
                type: 'attendanceToParent',
                id: processId
            },
            query: { userId: parentId },
            badge: Smartix.helpers.getTotalUnreadNotificationCount(parentId)
        };
        Meteor.call("doPushNotification", notificationObj);
    });

}

//Notification from admin to parent to display approval of leave application
Smartix.Absence.notificationToParentApprovedNotice = function (expectedId, currentUserId) {

    check(expectedId, String);
    check(currentUserId, String);

    var expectedObj = Smartix.Absence.Collections.expected.findOne(expectedId);
    
    var currentUser = Meteor.users.findOne(currentUserId);
    
    var parents = Smartix.Accounts.Relationships.getParentOfStudent(expectedObj.studentId, expectedObj.namespace)
    var parentIds = lodash.map(parents,'parent');
    console.log('Smartix.Absence.notificationToParentApprovedNotice',parentIds);
    parentIds.map(function (parentId) {

        //1. add to notification obj
        Notifications.insert({
            eventType: 'attendanceApproved',
            userId: parentId,
            hasRead: false,
            expectedId: expectedId,
            namespace: expectedObj.namespace,
            messageCreateTimestamp: new Date(),
            messageCreateByUserId: Meteor.userId()
        });

        //2. send push and in-app notification              
        var notificationObj = {
            from: Smartix.helpers.getFullNameByProfileObj(currentUser.profile),
            title: 'TBD We have approved your leave application',
            text: 'TBD We have approved your leave application',
            payload: {
                type: 'attendanceApproved',
                id: expectedId
            },
            query: { userId: parentId },
            badge: Smartix.helpers.getTotalUnreadNotificationCount(parentId)
        };
        Meteor.call("doPushNotification", notificationObj);
    });

}

//Notification from parent to admin about request of leave application
Smartix.Absence.notificationToAdminApprovalRequest = function (adminIds, expectedId, currentUserId) {

    check(adminIds, [String]);
    check(expectedId, String);
    check(currentUserId, String);

    var currentUser = Meteor.users().findOne(currentUserId);
    var expectedObj = Smartix.Absence.Collections.expected.findOne(expectedId);


    adminIds.each(function (adminId) {

        //1. add to notification obj
        Notifications.insert({
            eventType: 'attendanceSubmission',
            userId: adminId,
            hasRead: false,
            expectedId: expectedId,
            namespace: expectedObj.namespace,
            messageCreateTimestamp: message.createdAt,
            messageCreateByUserId: Meteor.userId()
        });

        //2. send push and in-app notification   

        var notificationObj = {
            from: Smartix.helpers.getFullNameByProfileObj(currentUser.profile),
            title: 'TBD A Parent has submitted a leave application',
            text: 'TBD A Parent has submitted a leave application',
            payload: {
                type: 'attendanceSubmission',
                id: expectedId
            },
            query: { userId: adminId },
            badge: Smartix.helpers.getTotalUnreadNotificationCount(adminId)
        };
        Meteor.call("doPushNotification", notificationObj);
    });

}

//Notification from parent to admin about response from parent of student attendance    
Smartix.Absence.notificationToAdminForDetailReply = function (adminIds, processId, currentUserId) {

    check(adminIds, [String]);
    check(processId, String);
    check(currentUserId, String);

    var currentUser = Meteor.users().findOne(currentUserId);

    var processObj = Smartix.Absence.Collections.processed.findOne(processId);

    adminIds.each(function (adminId) {
        //1. add to notification obj
        Notifications.insert({
            eventType: 'attendanceToAdmin',
            userId: adminId,
            hasRead: false,
            processId: processId,
            namespace: processObj.namespace,
            messageCreateTimestamp: message.createdAt,
            messageCreateByUserId: Meteor.userId()
        });

        //2. send push and in-app notification 

        var notificationObj = {
            from: Smartix.helpers.getFullNameByProfileObj(currentUser.profile),
            title: 'Parent has replied about children attendance',
            text: 'Parent has replied about children attendance',
            payload: {
                type: 'attendanceToAdmin',
                id: processId
            },
            query: { userId: adminId },
            badge: Smartix.helpers.getTotalUnreadNotificationCount(adminId)
        };
        Meteor.call("doPushNotification", notificationObj);
    });

}