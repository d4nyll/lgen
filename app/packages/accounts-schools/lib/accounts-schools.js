Smartix = Smartix || {};
Smartix.Accounts = Smartix.Accounts || {};
Smartix.Accounts.School = Smartix.Accounts.School || {};

Smartix.Accounts.School.getStudentIdFromName = function (name, namespace) {
    check(name, String);
    check(namespace, String);
    
    var separatedName;
    
    // Try to separate the names based on commas or spaces,
    // And trims them afterwards
    var commaSeparatedName = name.split(',').map(Function.prototype.call, String.prototype.trim);
    
    // .filter(Boolean) removes any empty strings
    var spaceSeparatedName = name.split(' ').filter(Boolean);
    
    if(commaSeparatedName.length > 1) {
        separatedName = commaSeparatedName;
    } else {
        separatedName = spaceSeparatedName;
    }
    
    var lastName = separatedName[0];
    
    // Removes the lastName
    separatedName.splice(0,1);
    
    var firstName = separatedName.join(' ');    
    
    var userCursor = Meteor.users.find({
        "profile.lastName": lastName,
        "profile.firstName": firstName,
    });
    
    if(userCursor.count() < 1) {
        userCursor = Meteor.users.find({
            "profile.lastName": lastName
        });
        if(userCursor.count() !== 1) {
            return false;
        }
    }
    
    if(userCursor.count() === 1) {
        var user = userCursor.fetch()[0];
        return user._id;
    }
    return false;
}