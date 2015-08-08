Classes = new Mongo.Collection('classes');


Classes.attachSchema(new SimpleSchema({
  className: {
    type: String,
    label: "Class name",
    optional: false,
    regEx: /[a-z0-9]/

  },
  classCode: {
    type: String,
    label: "Class code",
    optional: true,
    unique: true

  },
  anyoneCanChat: {
    type: Boolean,
    optional: false,
    autoform: {
      afFieldInput: {
        type: "boolean-checkbox2",
      },
    }
  },
  higherThirteen: {
    type: Boolean,
    optional: false,
    autoform: {
      afFieldInput: {
        type: "boolean-checkbox2",
      },
    }
  },
  joinedUserId:{
    type:[String],
    optional:true
  },
  createBy:{
    type:String,
    optional:false,
    autoform:{
      omit:true
    },
    autoValue:function(){
      if(this.isInsert)
        return Meteor.userId();
    }

  },
  createdAt:{
    type:Date,
    autoform:{
      omit:true
    },
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    }
  }



}));




if (Meteor.isServer) {
  Classes.allow({
    insert: function (userId, doc) {
      console.log("asd");
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });
}
