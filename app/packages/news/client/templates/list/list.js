

Template.NewsgroupsNewsList.onCreated(function(){
   
   var self = this;
   self.subscribe('newsgroupsForUser',null,null,Session.get('pickedSchoolId'),function(){
       self.subscribe('newsForUser',null,null,Session.get('pickedSchoolId'));    
       self.subscribe('smartix:distribution-lists/listsInNamespace',Session.get('pickedSchoolId'));
   });      

});

Template.NewsgroupsNewsList.helpers({
    
    getNews:function(){
        var newsgroupsIds = [];
        
        
        var newsgroupsByUserArray =  Smartix.Groups.Collection.find({ type: 'newsgroup', users: Meteor.userId() }).fetch(); 
        var newsgroupsByUserArrayIds = lodash.map(newsgroupsByUserArray,'_id');
        
        var distributionListsUserBelong = Smartix.Groups.Collection.find({type: 'distributionList', users: Meteor.userId() }).fetch();
        var distributionListsUserBelongIds = lodash.map(distributionListsUserBelong,'_id');
        
        console.log('distributionListsUserBelongIds',distributionListsUserBelongIds);
        
        var newsgroupsBydistributionLists =  Smartix.Groups.Collection.find({ type: 'newsgroup', distributionLists: {$in : distributionListsUserBelongIds } , optOutUsersFromDistributionLists :{  $nin : [Meteor.userId()] } }).fetch();      
        var newsgroupsBydistributionListsIds = lodash.map(newsgroupsBydistributionLists,'_id');
        
        console.log('newsgroupsBydistributionListsIds',newsgroupsBydistributionListsIds);
        
        newsgroupsIds = newsgroupsIds.concat(newsgroupsByUserArrayIds,newsgroupsBydistributionListsIds);
        
        console.log('newsgroupsIds',newsgroupsIds);
        
        return Smartix.Messages.Collection.find({ group: { $in: newsgroupsIds } }, {sort: {createdAt: -1 } } );
    },
    getGroupName:function(groupId){
        console.log('getGroupName',groupId);
       return Smartix.Groups.Collection.findOne(groupId).name;
    }
    
});


Template.NewsgroupsNewsList.onDestroyed(function(){
   
 Meteor.call('setAllNewsAsRead',Session.get('pickedSchoolId'));

});

