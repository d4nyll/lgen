_ = lodash;

// Returns a cursor of all classes,
Meteor.publish('smartix:classes/allClasses', function () {
    return Smartix.Groups.Collection.find({
        type: 'class'
    });
});

// Returns a cursor of all classes,
Meteor.publish('smartix:classes/allClassesFromSchoolName', function (schoolName) {
    var schoolDoc = SmartixSchoolsCol.findOne({
        username: schoolName
    });
    if(schoolDoc) {
        return Smartix.Groups.Collection.find({
            namespace: schoolDoc._id,
            type: 'class'
        });
    } else {
        this.ready();
    }
    
});

// Returns a cursor of a single class,
// Identified by `_id`
Meteor.publish('smartix:classes/classById', function (id) {
    return Smartix.Groups.Collection.find({
        _id: id,
        type: 'class'
    });
});

// Returns a cursor of a single class,
// Identified by `classCode`
Meteor.publish('smartix:classes/classByClassCode', function (classCode) {
    return Smartix.Groups.Collection.find({
        classCode: classCode,
        type: 'class'
    });
});

// Returns a cursor of all classes where
// the current user is a member or an admin
Meteor.publish('smartix:classes/associatedClasses', function () {
    return Smartix.Groups.Collection.find({
        type: 'class',
        $or: [{
            users: this.userId
        }, {
            admins: this.userId
        }]
    });
});

// Returns a cursor of all classes where
// the current user is a member
Meteor.publish('joinedClasses', function () {
    return Smartix.Groups.Collection.find({
        type: 'class',
        users: this.userId
    });
});

Meteor.publish('smartix:classes/otherClassmates', function(classCode) {

    var group = Smartix.Groups.Collection.findOne({ classCode: classCode });
    if (group) {
        //remove user him/herself
        lodash.pull(group.users, this.userId);
        return Meteor.users.find({ _id: { $in: group.users } });
    }

});

// Returns a cursor of all users that have joined ANY one of the current teacher's classes
Meteor.publish('smartix:classes/allUsersWhoHaveJoinedYourClasses', function () {
    // Find all classes where the current user is an admin
    // Limit the fields returned to `users`
    // Fetch as an array
    var classes = Smartix.Groups.Collection.find({
    type: 'class',
    admins: this.userId 
    }, {
        fields: {
            users: 1
        }
    }).fetch();

    // Extract all the users from the `users` property
    // from all classes into another array  
    var users = _.flatMap(classes, 'users');

    // Remove the current user from the list of users
    users = _.pull(users, this.userId); 

    // Return a cursor of all users in the `users` array
    return Meteor.users.find({
    _id: {
        $in: users
    }
    });
});

// Return a cursor of all admins of classes you have joined
Meteor.publish('smartix:classes/adminsOfJoinedClasses', function (schoolName) {
    
    
    var joinedClasses;
    
    if(schoolName){
        var schoolDoc = SmartixSchoolsCol.findOne({
            username: schoolName
        });

        if(schoolName =='global'){
                joinedClasses = Smartix.Groups.Collection.find({
                    users: this.userId,
                    namespace: schoolName
                }).fetch();                
        }else{
            joinedClasses = Smartix.Groups.Collection.find({
                users: this.userId,
                namespace: schoolDoc._id
            }).fetch();            
        }         

         
    }else{
        joinedClasses = Smartix.Groups.Collection.find({
            users: this.userId
        }).fetch();        
    }
    
    
    //console.log('adminsOfJoinedClasses:joinedClasses',joinedClasses);

    // Extract all the users from the `users` property
    // from all classes into another array  
    var admins = _.flatMap(joinedClasses, 'admins');

    // Returns a cursor of all users in the `admins` array
    return Meteor.users.find({ 
        _id: {
            $in: admins 
        }
    });
});

// Returns a cursor of all admin users of a class
Meteor.publish('smartix:classes/adminsOfClass', function (classCode) {
    var targetClass = Smartix.Groups.Collection.findOne({
        type: 'class',
        classCode: classCode
    });
    if (targetClass) {
        return Meteor.users.find({
            _id: {
                $in: targetClass.admins
            }
        });
    } else {
        //http://stackoverflow.com/questions/25709362/stuck-on-loading-template
        //this.ready() indicates nothing return; you cannot use return "" or return null in such case
        this.ready();
    }
});