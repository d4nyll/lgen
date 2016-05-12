Template.AttendanceHome.helpers({
    getCurrentSchoolName: function() {
        return Router.current().params.school;
    },
    attendanceRecordProcessedRequests:function(){
       var schoolDoc = SmartixSchoolsCol.findOne({
           username: Router.current().params.school
       });               
       
       return Smartix.Absence.Collections.processed.find({namespace:schoolDoc._id,status:'missing'});        
    }
});

Template.AttendanceHome.onCreated(function(){
    var self = this;
    
    self.subscribe('userRelationships', Meteor.userId());
    self.subscribe('mySchools',function(){
       var schoolDoc = SmartixSchoolsCol.findOne({
           username: Router.current().params.school
       });        
      self.subscribe('smartix:absence/parentGetChildProcessed',schoolDoc._id); 
    });    
    self.subscribe('allSchoolUsersPerRole',Router.current().params.school);
        
});

Template.AttendanceHome.events({
   
   'click .i-dont-know-btn':function(event,template){
     var processId = $(event.target).data('id');  
     //TODO: do something
    } 
});