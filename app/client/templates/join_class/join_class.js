var joinform;
/*****************************************************************************/
/* JoinClass: Event Handlers */
/*****************************************************************************/
Template.JoinClass.events({
  'click .joinBtn':function(){

    Meteor.call("class/search", $(".classCodeInput").val().trim(), function(error, result){
      if(error){
        console.log("error", error);
      }
      if(!result){
         alert("No class found");
      }else{
        IonLoading.show();
        $(joinform).submit();

        if(Meteor.user().profile.firstclassjoined){
          analytics.track("First Class Joined", {
            date: new Date(),
          });

          Meteor.call("updateProfileByPath", 'profile.firstclassjoined',false);
        }

      }
    });

  },
  'click .leaveBtn':function(e){
      var classId= $(e.target).attr("data-classId");
      Meteor.call('class/leave',classId);
  }
});

/*****************************************************************************/
/* JoinClass: Helpers */
/*****************************************************************************/
Template.JoinClass.helpers({
  leaveClassSchema : Schema.leaveClass,
  joinClassSchema : Schema.joinClass,
  joinClassArr: function(){
    return Classes.find({joinedUserId:{$in:[Meteor.userId()]}});
  }
});

/*****************************************************************************/
/* JoinClass: Lifecycle Hooks */
/*****************************************************************************/
Template.JoinClass.created = function () {
};

Template.JoinClass.rendered = function () {
  joinform = this.$("#joinClassForm");



};

Template.JoinClass.destroyed = function () {
};

Template.ionNavBar.events({
  'click .doneClassBtn':function(e,template){
      Router.go('TabClasses')
    }
  });
