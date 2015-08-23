
randomString = function (length, chars) {
    chars ="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}


lodash.mixin({
  'findByValues': function(collection, property, values) {
    return lodash.filter(collection, function(item) {
      return lodash.includes(item[property],values);
    });
  }
});

lodash.mixin({
  'findByValuesNested': function(collection, property,secproperty, values) {
    return lodash.filter(collection, function(item) {
      return lodash.includes(item[property][secproperty],values);
    });
  }
});


getClassCode = function(className){
  var beforeHash = Meteor.user().email + className + new Date().getTime().toString();
  return CryptoJS.SHA1(randomString(10),beforeHash).toString().substring(0,6);
}
