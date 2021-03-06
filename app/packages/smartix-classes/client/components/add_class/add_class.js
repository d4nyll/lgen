/*! Copyright (c) 2015 Little Genius Education Ltd.  All Rights Reserved. */
var form;

//function substituteChar(charCode, tgt){
//  var keyEvt = document.createEvent("KeyboardEvent");
//  if(keyEvt.initKeyEvent){
//    keyEvt.initKeyEvent("keypress", true, true, null, false, false, false, false, 0, charCode);
//    tgt.dispatchEvent(keyEvt);
//    keyEvt.stopPropagation();
//  }
//}
/*****************************************************************************/
/* AddClass: Event Handlers */
/*****************************************************************************/
Template.AddClass.events({

    'keyup input[name=className]': function(event, template){

        var lastName = Smartix.helpers.getLastnameOfCurrentUser(3);
        var className = $(event.target).val();

        //if user deletes all input in class name, leave the class code field blank.
        if(className.length == 0 ){
            template.$("input[name=classCode]").val("");
            return;
        }
        var trimSpacesSuggestClassCode = className.replace(/\s/g, "");
        var first4Letters = trimSpacesSuggestClassCode.substr(0,4);
        var lowerCaseEngAndNumber = first4Letters.toLowerCase().replace(/[^a-z0-9]/g, "");
        var classCode = lastName + ""+ lowerCaseEngAndNumber;
        template.$("input[name=classCode]").val(classCode);
        //everytime user input in className, we do a validation to the class code
        var isValidate = AutoForm.validateField("insertClass","classCode");
    },

    'keypress input[name=classCode]': function(event, template){
        var origClassCode = $(event.target).val();
        //console.debug("add_class:keypress input:ori: '" +  origClassCode+'\'');
        //var key = event.which ||event.keyCode;
        //console.debug("add_class:keypress input:ori:key:"+ key );
        //if (!(
        //      //(key >= 48 ) && (key <= 57 ) || //0-9//48-57
        //      (key >= 97 ) && (key <= 122 )  //a-z//97-122
        //    ))
        //{
        //  event.preventDefault();
        //  event.stopPropagation(true);
        //  var charUp = String.fromCharCode(key);//Upper to lower
        //  var charLow = String.fromCharCode(key+32);//Upper to lower
        //  //event.charCode = key+32;event.which    = key+32; event.keyCode  = key+32;
        //  //console.debug("add_class:keypress input:char:"+charUp +" => "+ charLow);
        //  //substituteChar(charLow, event.target);
        //}
        //if user deletes all input in class name, leave the class code field blank.
        var newClassCode = origClassCode.trim().toLowerCase();
        //console.debug("add_class:keypress input:new: '" + newClassCode+'\'');
        template.$("input[name=classCode]").val(newClassCode);
        //everytime user input in className, we do a validation to the class code
        var isValidate = AutoForm.validateField("insertClass","classCode");
    },

    'click #pick-an-icon-btn':function(){
        var parentDataContext= {iconListToGet:"iconListForClass",sessionToBeSet:"chosenIconForNewClass"};
        IonModal.open("ClassIconChoose", parentDataContext);
    }
});

/*****************************************************************************/
/* AddClass: Helpers */
/*****************************************************************************/
Template.AddClass.helpers({

    getClassAvatar:function(){
        var chosenIcon = Session.get('chosenIconForNewClass');
        if(chosenIcon){
            return chosenIcon;
        }else{
            //default set as green apple
            return "green_apple";
        }
    },
    getCurrentNameSpace:function(){
        return Session.get('pickedSchoolId');
    },
    getAdmin:function(){
        return [Meteor.userId()];
    }
});

/* AddClass: Lifecycle Hooks */
Template.AddClass.onCreated( function() {
});

Template.AddClass.onRendered( function() {
    //var origClassCode = $this.$("input[name=classCode]").val();
    //if user deletes all input in class name, leave the class code field blank.
    //this.$("input[name=classCode]").val(origClassCode.trim().toLowerCase());

    form = this.$("#insertClass");
    $(".checked").attr("checked", "checked");
    //by default anyone canChat
    // $('#anyoneCanChat').attr("checked", "checked");
    $('#ageRestricted').attr("checked", "checked");
    //setTimeout(function(){ $('#pick-an-icon-help-btn').addClass('activated'); },1500)
    //setTimeout(function(){$('#pick-an-icon-help-btn').removeClass('activated'); },5000)
});

Template.AddClass.destroyed = function () {
    delete Session.keys['chosenIconForNewClass'];
};

Template.ionNavBar.events({
    'click .addClassBtn': function (e, template) {
        var newClassObj = {
            namespace: $('#namespace').val(),
            className: $('#className').val(),
            classCode: $('#classCode').val(),
            admins: [Meteor.userId()],
            classAvatar:$('#classAvatar').val(),
            ageRestricted:$('#ageRestricted').is(':checked')
            // ,anyoneCanChat:$('#anyoneCanChat').is(':checked')
        };
        Smartix.Class.Schema.clean(newClassObj);
        try{
            check(newClassObj, Smartix.Class.Schema);
        }
        catch(e) {
            toastr.warning(TAPi18n.__("ClassCodeErrorMessage"));
            return;
        }
        Meteor.call('smartix:classes/createClass',  UI._globalHelpers['getCurrentSchoolName'](), newClassObj,function(err,result){
            if(!err) {
                Router.go('TabClasses');
            }
            else if (err.error === "class-code-already-exist"){
                log.error("smartix:classes/createClass", err);
                toastr.error(TAPi18n.__("ClassAddFailed"));
            }
            else {
                toastr.warning(TAPi18n.__("ClassCodeErrorMessage"));
            }
        });
    }
});

