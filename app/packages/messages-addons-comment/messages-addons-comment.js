Smartix = Smartix || {};

Smartix.Messages = Smartix.Messages || {};

Smartix.Messages.Addons = Smartix.Messages.Addons || {};

Smartix.Messages.Addons.ValidTypes = Smartix.Messages.Addons.ValidTypes || [];

Smartix.Messages.Addons.Comment = {};

Smartix.Messages.Addons.Comment.Type = 'comment';

Smartix.Messages.Addons.ValidTypes.push(Smartix.Messages.Addons.Comment.Type);

Smartix.Messages.Addons.Comment.Schema = new SimpleSchema({
    type:{
        type:String
    },
    comments: {
        type: [Object]
    },
    "comments.$.createdBy": {
        type: String
    },
    "comments.$.createdAt": {
        type: Date
    },    
    "comments.$.isShown": {
        type: Boolean,
        defaultValue:true
    },       
    "comments.$.comment": {
        type: String
    },   
    allowComment:{
        type:Boolean,
        defaultValue:true
    }
});

Smartix.Messages.Addons.Comment.addNewComment = function (messageId, commentObj, schoolId) {
    check(commentObj,Smartix.Messages.Addons.Comment.Schema);
    Smartix.Messages.Addons.Comment.Schema.clean(commentObj);
    //TODO add canUpdateNewCommentChecking
    Smartix.Messages.Collection.update({
        _id: messageId
    }, {
        $pull: {
            addons: {
                type: Smartix.Messages.Addons.Comment.Type
            }
        }
    }, function (error, n) {
        if(!error) {
            Smartix.Messages.Collection.update({
                _id: messageId
            }, {
                $push: {addons: commentObj}
            },function(err,success){
                if(!err){
                    var msgObj = Smartix.Messages.Collection.findOne({_id:messageId});
                    var groupObj = Smartix.Groups.Collection.findOne({_id:msgObj.group});
                    //log.info(commentObj);
                    groupObj.admins.map(function(eachAdmin){     
                        Meteor.call('insertNotification', {
                            eventType: "newclasscomment",
                            namespace: schoolId,//add namespace here
                            userId: eachAdmin,
                            hasRead: false,
                            groupId: groupObj._id,
                            messageCreateTimestamp: lodash.last(commentObj.comments).createdAt,
                            messageCreateByUserId: Meteor.userId()
                        });                        
                    });
                }
            });
        }
    });
};
