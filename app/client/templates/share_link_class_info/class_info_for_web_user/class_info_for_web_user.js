Session.setDefault("search","");
Session.setDefault("Referral",false);
/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.ClassInformationForWebUser.events({
  'keyup .classSearch':function(e){
    Session.set("search",$(e.target).val().trim());
  },
  'click .enterBtn':function () {
    
    if(Meteor.user()){
      log.info("user is logged in");
      
      var doc = {};
      doc.classCode = Session.get("search");
      
      //if existing user, help user to join class directly and router go to the class page
      Meteor.call("class/join", doc , function (error, result) {
        
        log.info(error);
        log.info(result);
        if (error) {
          log.error("error", error);
        }else{
         
          log.info("Redirecting you to the class");
          Router.go("classDetail",{classCode : doc.classCode});          
        }
      });

    }else{
      log.info("user is NOT logged in");
      
      //Router.go('Login');
      //redirect user to login page
    }
    
    //Router.go('email',{classCode:Session.get('search')});
  }
});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.ClassInformationForWebUser.helpers({
  classCode:function(){
    if(Router.current().params.classCode!==undefined){
      return Router.current().params.classCode;
    }else{
      return "";
    }
  },
  notFound:function(){

      var classCode =  new RegExp('^'+Session.get("search"),'i');
      return Classes.find({classCode:classCode}).count()>0 || Session.get("search")==="" ?false:true;

  },
  ableClick:function(){
    var classCode =  Session.get("search");
    log.info(classCode);
    log.info(Classes.find().count());
    log.info(Classes.find({classCode:classCode}).count());
    
    return Classes.find({classCode:classCode}).count()>0?"":"disabled";
  },
  classOwnName:function() {
    var classCode =  Session.get("search");
    var classObj = Classes.findOne({classCode:classCode});
    if(classObj===undefined){
      return "Enter";
    }else{
      var teacher =  Meteor.users.findOne({_id:classObj.createBy});
      return "Join "+teacher.profile.firstname+" "+ teacher.profile.lastname+"'s "+ classObj.className + " class";
    }

  },
  isDisable:function () {
    return Router.current().params.classCode?"disabled":"";
  }

});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.ClassInformationForWebUser.onCreated(function () {
});

Template.ClassInformationForWebUser.onRendered(function () {
  if(Router.current().params.classCode){
    Session.set("search",Router.current().params.classCode);
  }
  if(Router.current().params.query.rid){
    
    Session.set('Referral',true);
    log.info('Referral');
    analytics.track("Referral", {
        date: new Date(),
        userId : Router.current().params.query.rid
      });
    Meteor.call("addReferral", Router.current().params.query.rid, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){

      }
    });

  }
  
});

Template.ClassInformationForWebUser.onDestroyed(function () {
});
