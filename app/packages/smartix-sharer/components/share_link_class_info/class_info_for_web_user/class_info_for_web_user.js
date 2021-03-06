/*! Copyright (c) 2015 Little Genius Education Ltd.  All Rights Reserved. */
Session.setDefault("search", "");
Session.setDefault("Referral", false);

/* Home: Event Handlers */
Template.ClassInformationForWebUser.events({
	'click .loginBtn': function () {
		if (Meteor.user()) {
			//log.info("user is logged in=" + Meteor.userId());
			var doc = {};
			doc.classCode = Session.get("search");
			//if existing user, help user to join class directly and router go to the class page
			Meteor.call("smartix:classes/join", doc, function (error, result) {
				if (error) {
					log.error("error", error);
				}
				else {
					//log.info("Redirecting you to the class");
					Router.go("ClassJoined", {classCode: doc.classCode});
				}
			});
		}
		else {
			//log.info("user is NOT logged in");
			Meteor.loginWithPassword($('.email').val(), $('.password').val(), function (err) {
				if (err) {
					toastr.error(TAPi18n.__("Admin.UserNotFound"));
					log.error(err);
				}
				else {
					//log.info("login:meteor:" + Meteor.userId());
					Smartix.helpers.routeToTabClasses();
				}
			});
		}
	},

	'click .signUpBtn': function () {
		if (Meteor.user()) {
			//log.info("user is logged in=" + Meteor.userId());
			var doc = {};
			doc.classCode = Session.get("search");
			//if existing user, help user to join class directly and router go to the class page
			Meteor.call("smartix:classes/join", doc, function (error, result) {
				if (error) {
					log.error("error", error);
				}
				else {
					//log.info("Redirecting you to the class");
					Router.go("ClassJoined", {classCode: doc.classCode});
				}
			});
		}
		else {
			log.warn("user is NOT logged in");
			var role = ""; //role would be chosen by user later on
			var fn = $('.first-name').val();
			var ln = $('.last-name').val();
			var email = $('.email').val();
			var pw = $('.password').val();
			Smartix.helpers.registerNewUser(email, fn, ln, pw);
		}
	},

	'click .signUpGmailBtn': function () {
		if (Meteor.user()) {
			log.info("user is logged in");
			var doc = {};
			doc.classCode = Session.get("search");
			//if existing user, help user to join class directly and router go to the class page
			Meteor.call("smartix:classes/join", doc, function (error, result) {
				//log.info(error);
				//log.info(result);
				if (error) {
					log.error("error", error);
				}
				else {
					//log.info("Redirecting you to the class");
					Router.go("ClassJoined", {classCode: doc.classCode});
				}
			});
		}
		else {
			log.warn("user is NOT logged in");
			Smartix.Accounts.registerOrLoginWithGoogle();
		}
	}
});

/* Home: Helpers */
Template.ClassInformationForWebUser.helpers({
	classCode: function () {
		if (Router.current().params.classCode !== undefined) {
			return Router.current().params.classCode;
		}
		else {
			return "";
		}
	},

	notFound: function () {
		var classCode = new RegExp('^' + Session.get("search"), 'i');
		return Smartix.Groups.Collection.find({
			type: 'class',
			classCode: classCode
		}).count() > 0 || Session.get("search") === "" ? false : true;
	},

	ableClick: function () {
		var classCode = Session.get("search");
		//log.info(classCode);
		//log.info(Smartix.Groups.Collection.find({
		//    type: 'class'
		//}).count());
		// log.info(Smartix.Groups.Collection.find({
		//     type: 'class',
		//     classCode:classCode
		// }).count());
		return Smartix.Groups.Collection.find({
			type: 'class',
			classCode: classCode
		}).count() > 0 ? "" : "disabled";
	},

	classOwnName: function () {
		var classCode = Session.get("search");
		var classObj = Smartix.Groups.Collection.findOne({
			type: 'class',
			classCode: classCode
		});
		if (classObj === undefined) {
			return "Enter";
		}
		else {
			var teacher = Meteor.users.findOne({
				_id: {
					$in: classObj.admins
				}
			});
			return "Join " + teacher.profile.firstName + " " + teacher.profile.lastName + "'s " + classObj.className + " class";
		}
	},

	isSchoolClass: function () {
		var classCode = Router.current().params.classCode;
		var classObj = Smartix.Groups.Collection.findOne({
			type: 'class',
			classCode: classCode
		});
		//log.info('isSchoolClass',classObj);    
		return (classObj) ? true: false;
		// {
		// 	return classObj.namespace !== 'global'
		// }
	},
	isDisable: function () {
		return Router.current().params.classCode ? "disabled" : "";
	}

});

/* Home: Lifecycle Hooks */
Template.ClassInformationForWebUser.onCreated(function () {
	this.subscribe('smartix:classes/adminsOfClass', Router.current().params.classCode),
	this.subscribe('smartix:classes/classByClassCode', Router.current().params.classCode)
});

Template.ClassInformationForWebUser.onRendered(function () {
	//if the classcode in the path is not existed(i.e no result return from suscription), redirect user to find you class page instead.
	if (Smartix.Groups.Collection.find({
			type: 'class'
		}).count() < 1) {
		log.info(Smartix.Groups.Collection.find({
			type: 'class'
		}).count());
		Router.go('ClassSearchInformationForWebUser');
	}

	if (Router.current().params.classCode) {
		//log.info(Router.current().params.classCode);
		Session.set("search", Router.current().params.classCode);
	}

	if (Router.current().params.query.rid) {
		Session.set('Referral', true);
		log.info('Referral');
		analytics.track("Referral", {
			date: new Date(),
			userId: Router.current().params.query.rid
		});
		Meteor.call("addReferral", Router.current().params.query.rid, function (error, result) {
			if (error) {
				log.info("error", error);
			}
			if (result) {
			}
		});
	}
});

Template.ClassInformationForWebUser.onDestroyed(function () {
});
