Meteor.startup(function () {
	if (Meteor.isCordova) {
		window.alert = navigator.notification.alert;
	}
  //todo add 'startup' listener
	Push.addListener('message', function(notification) {
		// Called on every message
		console.log(JSON.stringify(notification));
		var payload = notification.payload;
    if (payload.type == "chat") {
      if (Router.current().route.getName() !== "TabChat") {
        var badge = Session.get("chatUnreadNumber");
        badge++;
        Session.set("chatUnreadNumber", badge);
      }
      else {
        Session.set("chatUnreadNumber", 0);
      }
    }
  });
});

AutoForm.setDefaultTemplate('plain');

AutoForm.submitFormById = function (id) {
  $(id).submit();
};

Accounts.onEmailVerificationLink(function (token) {
  Accounts.verifyEmail(token, function (err) {
    err ? alert(err.reason) : Router.go('TabClasses');
  });
});

Accounts.onLogin(function (argument) {
  // analytics.track("Login", {
  //   date: new Date(),
  // });
});

// Meteor.AppCache.config({
//   chrome: true,
//   firefox: true,
// 	chromium:true,
// 	chromeMobileIOS:true,
// 	mobileSafari:true,
// 	safari:true
// });