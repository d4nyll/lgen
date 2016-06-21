Template.AttendanceRecordAdd.onCreated(function(){
    this.subscribe('userRelationships', Meteor.userId());
    this.subscribe('mySchools');
    this.subscribe('allSchoolUsersPerRole', UI._globalHelpers['getCurrentSchoolName']());
});

Template.AttendanceRecordAdd.events({
    'click .apply-leave-btn': function () {
        var schoolDoc = SmartixSchoolsCol.findOne({
            shortname: UI._globalHelpers['getCurrentSchoolName']()
        });
        var applyLeaveObj = {
            namespace: schoolDoc._id,
            leaveReason: $('#leave-reason').val(),
            startDate: $('#start-date').val(),
            startDateTime: $('#start-date-time').val(),
            endDate: $('#end-date').val(),
            endDateTime: $('#end-date-time').val(),
            studentId: document.getElementById("children-id").value,
            studentName: document.getElementById('children-id').selectedOptions[0].text
        };

        //log.info(applyLeaveObj);
        var transformObj = {
            namespace: applyLeaveObj.namespace,
            studentId: applyLeaveObj.studentId,
            reporterId: Meteor.userId(),
            dateFrom: moment(applyLeaveObj.startDate + " " + applyLeaveObj.startDateTime + "+0800").unix(),
            dateTo: moment(applyLeaveObj.endDate + " " + applyLeaveObj.endDateTime + "+0800").unix(),
            message: applyLeaveObj.leaveReason,
            startDate: moment(applyLeaveObj.startDate + " " + applyLeaveObj.startDateTime + "+0800").format("LLLL"),
            endDate: moment(applyLeaveObj.endDate + " " + applyLeaveObj.endDateTime + "+0800").format("LLLL"),
            studentName: applyLeaveObj.studentName
        };
        //log.info(transformObj);
        if (transformObj.dateFrom > transformObj.dateTo) {
            toastr.info(TAPi18n.__("absence.StartBeforeEnd"));
            return;
        }
        if (!transformObj.message) {
            toastr.info(TAPi18n.__("absence.ReasonLeave"));
            return;
        }
        IonPopup.show({
            title: TAPi18n.__("absence.ConfirmToApplyLeaveFor") + " for " + transformObj.studentName,
            subTitle: "From " + transformObj.startDate + '\nTo ' + transformObj.endDate,
            buttons: [
                {
                    text: TAPi18n.__("Cancel"),
                    type: 'button-grey',
                    onTap: function () {
                        IonPopup.close();
                    }
                },                
                {
                    text: TAPi18n.__("Confirm"),
                    type: 'button-positive',
                    onTap: function () {
                        IonPopup.close();
                        //add record here
                        Meteor.call('smartix:absence/registerExpectedAbsence', transformObj, function (err, result) {
                            if (err) {
                                toastr.error(TAPi18n.__("absence.LeaveNoticeFailed"));
                                log.error(err);
                            } else {
                                toastr.info(TAPi18n.__("absence.LeaveNoticeOK"));
                                $('#leave-reason').val("");
                            }
                        });
                    }
                }

            ]
        });
    }
});

Template.AttendanceRecordAdd.helpers({
    getTodayDate : function(){
        var date = new Date();
        var formattedDate = moment(date).format('YYYY-MM-DD');
        return formattedDate;
    },
    getCurrentTime : function(){
        var date = new Date();
        var formattedTime = moment(date).format('HH:mm');
        return formattedTime;
    },
    getDefaultStartDateTime:function(){
      return "08:00";  
    },

    getDefaultEndDateTime:function(){
      return "17:00"
    },

    getAllChildrens:function(){
        var childs = [];
        var findChilds = Smartix.Accounts.Relationships.Collection.find({ parent: Meteor.userId(),
            namespace: UI._globalHelpers['getCurrentSchoolId']() }).fetch();
        //log.info('findParents', findParents);
        findChilds.map(function (relationship) {
            childs.push(relationship.child);
        });
        return childs;     
    },
    getUserById: function(userId) {
        var targetUserObj = Meteor.users.findOne(userId);
        return targetUserObj;
    }
});