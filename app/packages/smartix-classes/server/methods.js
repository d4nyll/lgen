Meteor.methods({

    addClassMail: function(to, id) {
        var classObj = Smartix.Groups.Collection.findOne({
            _id: id
        });
        if (lodash.get(Meteor.user(), "emailNotifications")) {
            try {
                log.info("newClassMail:" + classObj.classCode);
                //retrieveContent("en");
                this.unblock();
                Smartix.newClassMailTemplate(to, classObj.className, classObj.classCode);
            }
            catch (e) {
                log.error("add class mail: " + e);
            }
        }
    },

    getFullNameById: function(id) {
        var userObj = Meteor.users.findOne({
            _id: id
        });
        if (typeof userObj === 'undefined') {
            log.warn("getFullNameById", "cannot find user", id);
            return "";
        }
        if (userObj && userObj.profile) {
            return userObj.profile.firstName + " " + userObj.profile.lastName;
        }
        return "";
    },
    
    getAvatarById: function(id) {
        var userObj = Meteor.users.findOne({ _id: id });

        if (userObj && userObj.profile && userObj.profile.avatarValue) {
            return userObj.profile.avatarValue;
        } else {
            return "green_apple";
        }

    },
    getAvatarTypeId: function(id) {
        var userObj = Meteor.users.findOne({ _id: id });

        if (userObj && userObj.profile && userObj.profile.avatarType) {
            return userObj.profile.avatarType;
        } else {
            return "emoji";
        }

    },

    'smartix:classes/createClass': function(schoolName, classObj) {
        //global does not have school doc
        // if (schoolName === 'smartix') {
        //     classObj.namespace = 'global';
        // } else {
            var schoolDoc = SmartixSchoolsCol.findOne({
                shortname: schoolName
            });
            if (schoolDoc) {
                classObj.namespace = schoolDoc._id;
            }
        // }
        let result = Smartix.Class.createClass(classObj, this.userId);
        //log.info(result);
        if (result === "no-right-create-class") {
            log.info('throw err');
            throw new Meteor.Error("no-right-create-class", "No right to create class in this school");
        }
    },

    'smartix:classes/editClass': function(modifier, documentId) {
        Smartix.Class.editClass(documentId, modifier['$set'], this.userId);
    },
    'smartix:classes/removeClasses':function(classIds){
        Smartix.Class.deleteClasses(classIds);     
    },
    'smartix:classes/removeUsers': function(classId, usersToRemove) {
        Smartix.Class.removeUsersFromClass(classId, usersToRemove, this.userId);
    },
    'smartix:classes/removeAdmins': function(classId, adminsToRemove) {
        Smartix.Class.removeAdminsFromClass(classId, adminsToRemove, this.userId);
    },
    'smartix:classes/addDistributionLists': function(classId, listsToAdd) {
        Smartix.Class.addListsToClass(classId, listsToAdd, this.userId);
    },
    'smartix:classes/removeDistributionLists': function(classId, listsToRemove) {
        Smartix.Class.removeListsFromClass(classId, listsToRemove, this.userId);
    },

    'smartix:classes/join': function(doc, userToAdd) {
        check(userToAdd, Match.Maybe(String));
        // Get the `_id` of the currently-logged in user
        if (!(userToAdd === null)) {
            userToAdd = userToAdd || this.userId || Meteor.userId();
        }
        if (doc && doc.classCode) {
            log.info("smartix:classes/join:" + doc.classCode.trim());
            var classCode = doc.classCode.trim();
            var regexp = new RegExp("^" + classCode.trim() + "$", "i");
            var resultset = Smartix.Groups.Collection.findOne({ "classCode": { $regex: regexp } });//OK
            //TODO STOP MIXING NAMESPACE=ID AND SHORTNAME. THIS MAKES THE CODE VERY BUGGY AND DIFFICULT TO MAINTAIN
            var targetSchoolNamespace = doc.schoolName;
            if(doc.schoolName){ // TODO dead code probably (as targetSchoolNamespace = doc.schoolName is never passed)
                // if (doc.schoolName === 'smartix' ) {
                //     targetSchoolNamespace = 'global';
                // } else {
                    var targetSchool = SmartixSchoolsCol.findOne({ shortname: doc.schoolName });
                    targetSchoolNamespace = targetSchool._id;
                // }
            }
            if (resultset) {
                //if schoolNamespace is not passed, we skip checking of class-different-namespace
                //TODO I don't think this is ever user as targetSchoolNamespace = doc.schoolName is never passed
                if(targetSchoolNamespace){
                    if (resultset.namespace !== targetSchoolNamespace) {
                        log.error('smartix:classes/join: cannot join the class of a different namespace');
                        throw new Meteor.Error("class-different-namespace", "Can't join the group in different school");
                    }                    
                }
                if (resultset.admins.indexOf(userToAdd) > -1) {
                    log.warn("smartix:classes/join: can't join the class you own:" + classCode + ":from user:" + userToAdd);
                    throw new Meteor.Error("class-you-own", "Can't join a class you own");
                }
                else {
                    log.info("User " + userToAdd + " attempting to join class " + doc.classCode);
                    Smartix.Class.addUsersToClass(resultset._id, [userToAdd]);
                    return true;
                }
            }
            else { //class is not found
                log.warn("classcode '" + classCode + "' not found");
                throw new Meteor.Error("class-not-found", "Can't find the class");
            }
        }
        else {
            log.warn("smartix:classes/join", "classcode missing");
        }
        return false;
    },

    'smartix:classes/joinAsAdmin': function(doc, userToAdd) {
        check(userToAdd, Match.Maybe(String));
        // Get the `_id` of the currently-logged in user
        if (!(userToAdd === null)) {
            userToAdd = userToAdd || this.userId || Meteor.userId();
        }

        if (doc && doc.classCode) {
            log.info("smartix:classes/join:" + doc.classCode.trim());
            var classCode = doc.classCode.trim();
            var regexp = new RegExp("^" + classCode.trim() + "$", "i");
            var resultset = Smartix.Groups.Collection.findOne({ "classCode": { $regex: regexp } });//OK

            var targetSchoolNamespace = doc.schoolName;
            // if (doc.schoolName === 'smartix' ) {
            //     targetSchoolNamespace = 'global';
            // } else {
                var targetSchool = SmartixSchoolsCol.findOne({ shortname: doc.schoolName });
                targetSchoolNamespace = targetSchool._id;
            // }

            if (resultset) {

                if (resultset.namespace !== targetSchoolNamespace) {
                    log.error('smartix:classes/join: cannot join the class in different namespace');
                    throw new Meteor.Error("class-different-namespace", "Can't join the class in different school");
                }

                else {
                    log.info("User " + userToAdd + " attempting to join class " + doc.classCode);
                    //log.info("Server?"+Meteor.isServer);
                    //this was the trick to make it case insensitive

                    Smartix.Class.addAdminsToClass(resultset._id, [userToAdd], this.userId);

                    //   Smartix.Groups.Collection.update(
                    //     {"classCode": {$regex: regexp}},
                    //     {
                    //       $addToSet: {admins: userToAdd}
                    //     });
                    return true;
                }
            }
            else { //class is not found
                log.info("classcode '" + classCode + "' not found");
                throw new Meteor.Error("class-not-foun", "Can't find the class");
            }
        }
        else {
            log.warn("there is no input");
        }
        return false;
    },
    
  'class/search': Smartix.Class.searchForClassWithClassCode,

  //todo remove redundant API function
  'class/searchExact': Smartix.Class.searchForClassWithClassCode,

  'class/leave': function (classId) {
    Smartix.Groups.Collection.update({_id: classId}, {$pull: {users: Meteor.userId()}});
  },

  'class/leaveByCode': function (classCode) {
    Smartix.Groups.Collection.update({classCode: classCode}, {$pull: {users: Meteor.userId()}});
  },

  'class/deleteUser': function (classObj, userid) {
    Smartix.Groups.Collection.update(classObj, {$pull: {users: userid}});
  },

  'class/deleteAllUser': function (classObj) {
    Smartix.Groups.Collection.update(classObj, {$set: {users: []}});
  },

  'class/delete': function (classObj) {
    Smartix.Groups.Collection.remove(classObj);
  },

  'class/update': function (doc) {
    Smartix.Groups.Collection.update({_id: doc._id}, {$set: doc});
  }
});