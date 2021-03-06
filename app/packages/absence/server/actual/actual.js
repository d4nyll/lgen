function isValidDate(value) {
    var dateWrapper = new Date(value);
    return !isNaN(dateWrapper.getDate());
}


var convertAttendanceFormat = function (originalRecord, namespace) {
    var newRecord = {};
    newRecord.studentId = Smartix.Accounts.School.getStudentId(originalRecord.studentId, namespace);
    if(newRecord.studentId === false) {
        return "Student with the name " + originalRecord.name + " could not be found";
    }
    newRecord.date = moment(originalRecord.date, ["DD/MM/YYYY", "DD-MM-YYYY", "DD-MM-YY", "DD/MM/YY"]).unix();
    if(!newRecord.date) {
        return "The date " + originalRecord.date + " for the record with student name " + originalRecord.name + " could not be parsed";
    }
    newRecord.clockIn = Smartix.Utilities.getMinutesSinceMidnight(originalRecord.clockIn);
    newRecord.namespace = namespace;
    return newRecord;
};

Smartix.Absence.attendanceRecordsSchema = new SimpleSchema({
    name: {
        type: String
    },
    date: {
        type: String
    },
    clockIn: {
        type: String,
        optional: true
    },
    late: {
        type: String,
        optional: true
    },
    absent: {
        type: String,
        optional: true
    },
    department: {
        type: String
    }
});

var attendanceRecordsPattern = {
    studentId: String,
    name: String,
    date: String,
    clockIn: Match.Maybe(String),
    late: Match.Maybe(String),
    absent: Match.Maybe(String),
    department: String
};

Smartix.Absence.updateAttendanceRecord = function (records, schoolName, currentUser) {
    check(records, Match.OneOf(attendanceRecordsPattern, [attendanceRecordsPattern]));
    check(schoolName, String);
    check(currentUser, Match.Maybe(String));
    let namespace =  SmartixSchoolsCol.findOne({
                shortname: schoolName
    })._id;
    
    // Get the `_id` of the currently-logged in user
    if(!(currentUser === null)) {
        currentUser = currentUser || Meteor.userId();
    }
    
    var errors = [];
    var insertCount = 0;
    var dayOfRecords;

    if(!(Array.isArray(records))){
        records = [records];
    }
    if(Array.isArray(records)) {
        dayOfRecords = records[0].date;
        records = _.map(records, function (record) {
            var convertedRecord = convertAttendanceFormat(record, namespace);
            if(typeof convertedRecord === "string") {
                errors.push(convertedRecord);
                return null;
            }
            return convertedRecord;
        }).filter(Boolean);
        // log.info("Converted Record", records);
        _.each(records, function(record) {
            let studentObj = Meteor.users.findOne({
                studentId: record.studentId,
                schools: [namespace]
            });
            //if studentObj exists take the unique id else continue with the record.studentId
            if(studentObj){
                record.studentId = studentObj._id;
            }
            Smartix.Absence.Collections.actual.upsert({
                studentId: record.studentId,
                date: record.date,
                namespace: namespace
            }, record, {
                multi: false
            });
        });
    }

    // Add a delay of 100 miliseconds to ensure all records are updated
    Meteor.setTimeout(function () {
        Smartix.Absence.processAbsencesForDay(namespace, dayOfRecords, undefined, true, currentUser);
    }, 100);
    
    return {
        insertCount: records.length,
        errors: errors
    };
};