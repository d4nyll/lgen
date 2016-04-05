/*! Copyright (c) 2015 Little Genius Education Ltd.  All Rights Reserved. */
//console.log('lib-helpers-client','is Smartix exist?',Smartix || {});
Smartix = Smartix || {};
Smartix.helpers = Smartix.helpers || {};

//Desktop Notification
//https://developer.mozilla.org/en/docs/Web/API/notification
//https://developer.mozilla.org/en-US/docs/Web/API/Notification/close
Smartix.helpers.spawnDesktopNotification = function(theBody,theIcon,theTitle,pathToRouteObj) {
        var options = {
            body: theBody,
            icon: theIcon
        }
        var n = new Notification(theTitle,options);
        n.onclick = function(){
            if(pathToRouteObj){
                if(pathToRouteObj.routeName){
                    if(pathToRouteObj.params){
                    if(pathToRouteObj.query){
                        Router.go(pathToRouteObj.routeName,pathToRouteObj.params,pathToRouteObj.query);
                    }else{
                        Router.go(pathToRouteObj.routeName,pathToRouteObj.params);   
                    }  
                    }else{
                        Router.go(pathToRouteObj.routeName);                 
                    }                      
                }
            }
            
            n.close();
        }
    };



    Smartix.helpers.isChinese = function(lang) {
        return lang.toLowerCase().includes("zh")
        || lang.toLowerCase().includes("han");
    };

    Smartix.helpers.isHan = function(lang)     { return lang.toLowerCase().includes("han"); };
    
    
    Smartix.helpers.isAndroid = function() {
    //https://github.com/apache/cordova-plugin-device/blob/master/src/android/Device.java
    //http://stackoverflow.com/questions/32076642/meteor-device-detection-android-or-ios
    return Meteor.isCordova && (device.platform.toLowerCase().indexOf("android") > -1);
    };

    Smartix.helpers.isIOS = function() {
    //http://stackoverflow.com/questions/32076642/meteor-device-detection-android-or-ios
    return Meteor.isCordova && (device.platform.toLowerCase().indexOf("ios") > -1);
    };

    Smartix.helpers.isCordova = function(){
    return Meteor.isCordova;
    };

    //how to create a global function in meteor template
    //http://stackoverflow.com/questions/29364591/how-to-create-a-global-function-in-meteor-template
    //You need to make your function a global identifier to be able to call it across multiple files :

    //if user has pending class to join, join and redirect user to tab classes.
    //else, just redirect use to tab classes
    Smartix.helpers.routeToTabClasses = function(){
        var classToBeJoined = Session.get("search");
        log.info("routeToTabClasses:searching class:"+ classToBeJoined);
        if (classToBeJoined) {
        var doc = {classCode: classToBeJoined};
        //help user to join class
        Meteor.call("class/join", doc, function (error, result) {
            if (error) {
            log.error("class/join:error", error);
            } else {
            Session.set("search","");
            }
        });
        }
        Router.go("TabClasses");
    };

    Smartix.helpers.registerNewUser = function(email,firstname,lastname,password){
        var userObj = {};
        userObj.profile = {};
        userObj.email = email;
        userObj.profile.firstname = firstname;
        userObj.profile.lastname = lastname;
        userObj.profile.role = ""; //role would be chosen by user later

        if (!Smartix.helpers.validateEmail(userObj.email)) {
        toastr.error("Incorrect Email");
        } else if (password.length < 4) {
        toastr.error("At least 3 characters Password");
        } else {
        Accounts.createUser({
            email: userObj.email,
            password: password,
            profile: userObj.profile
        }, function (err) {
            if (err) {
            toastr.error(err.reason);
            log.error(err);
            } else{
            //if create user is successful, user than needs to choose their role
            Router.go('role');
            }
        });
        }

    };


    Smartix.helpers.playAudio = function(url, callback) {
        
        // Play the audio file at url
            log.info(callback);
        var my_media = new Media(url,
            // success callback
            function () {
            log.info("playAudio():Audio Success");
            callback();
            log.info("calledback");
            },
            // error callback
            function (err) {
            log.error("playAudio():Audio Error: " + err);
            }
        );
        // Play audio
        my_media.play({
            numberOfLoops: 1
        });
    };

    Smartix.helpers.registerOrLoginWithGoogle = function(){
        Meteor.loginWithGoogle(
        {
            forceApprovalPrompt: true,
            requestPermissions: ['email'],
            loginStyle: 'popup',
            requestOfflineToken: true
        }
        ,function (err) { // <-- the callback would NOT be called. It only works if loginStyle is popup
                            //see https://github.com/meteor/meteor/blob/devel/packages/accounts-oauth/oauth_client.js Line 16

            var loginServicesConfigured = Accounts.loginServicesConfigured();
            log.info('loginServicesConfigured='+loginServicesConfigured);
            if (err) {
            // set a session variable to display later if there is a login error
            Session.set('loginError', 'reason: ' + err.reason + ' message: ' + err.message || 'Unknown error');
            //alert(err.message + ":" + err.reason);
            toastr.error('Sorry. Google Login is not available at the moment because it is unable to connect to the Internet.')
            log.error('login:google:'+ err.reason +" msg="+ err.message);
            }
            else {
            log.info("login:google:" + Meteor.userId());
            if (Meteor.user().profile.role !== ""){
                log.info("user has role");
                Smartix.helpers.routeToTabClasses();
            }
            else{
                //first time user
                log.info("user does not have role");
                Router.go('role');
            }
            }
        });   
    };

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

Template.registerHelper('isFirstMessageInADate',function(index){
    //if it is the first item in the messages's subarray
    if(index == 0){
        return true;
    }else{
        return false;
    }    
});

Template.registerHelper('messagesGroupByDate',function(messages){
      var tempArr = [];  
      messages.map(function(message){
        //log.info(message);
        var date = moment.unix(message.sendAt.substr(0,10)).format("YYYY-MM-DD");
        message.date = date;
        tempArr.push(message)
      });
       
      var result = lodash.groupBy(tempArr,'date');
      var resultArray = [];
      resultArray = lodash.values(result);
      //log.info(resultArray);
      return resultArray;     
});
Template.registerHelper('isAndroid', Smartix.helpers.isAndroid);
Template.registerHelper('isIOS', Smartix.helpers.isIOS);
Template.registerHelper('isCordova', Smartix.helpers.isCordova);

var googleDocsURLToEmbedReadyURLHTML = function(originalURL){
           var fileURL = originalURL;
           var outputHTML = "";
           //if it is a google word
           if( lodash.startsWith(fileURL,"https://docs.google.com/document") ){
                if( lodash.endsWith(fileURL,"pub") ){
                    outputHTML =  "<iframe src='"+ fileURL + "?embedded=true'></iframe>";                    
                }else{
                      //if the URL is not embed ready,we need to do some modification
                      /*var modifiedFileURL =  fileURL.replace("edit","pub");
                      outputHTML =  "<iframe src='"+ modifiedFileURL + "?embedded=true'></iframe>"; */
                      
                      //the above does not work well. so there will be no preview.
                      //do nothing             
                }       
           //if it is a google excel
           }else if( lodash.startsWith(fileURL,"https://docs.google.com/spreadsheets")  ){
              if(lodash.endsWith(fileURL,"pub")){        
               outputHTML =  "<iframe src='https://docs.google.com/viewer?url=" + fileURL + "?output=pdf&embedded=true'></iframe>";                 
              }else if(lodash.endsWith(fileURL,"pubhtml")){
                    var nohtmlurl = fileURL.replace("pubhtml","pub")
                    outputHTML =  "<iframe src='https://docs.google.com/viewer?url=" + nohtmlurl + "?output=pdf&embedded=true'></iframe>";   
              }
              else{
               //the above does not work well. so there will be no preview.
               //do nothing                                   
              }
           //if it is a google powerpoint
           }else if( lodash.startsWith(fileURL,"https://docs.google.com/presentation") ){
              if(lodash.endsWith(fileURL,"embed")){
                outputHTML =  "<iframe src='" + fileURL + "&embedded=true'></iframe>";                          
              }else if(fileURL.indexOf("pub") !=-1){
                outputHTML =  "<iframe src='" + fileURL.replace("pub","embed") + "&embedded=true'></iframe>";                   
              }
              else{          
               //the above does not work well. so there will be no preview.
               //do nothing                                                 
              }     
           }else{
               //something not yet support. do nothing
           }
        return outputHTML;
};


Template.registerHelper('docPreview',function(url){

    
    var linkList = [];
    Autolinker.link(url,{
      replaceFn : function(autolinker,match){
        switch(match.getType()){
          case 'url':
            linkList.push(match.getUrl());      
        }
      }
    });
    if(linkList.length>0){
         var fileURL = linkList[0];         
         //http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
         var youtubeId = youtube_parser(fileURL);
         
        //no document preview on android for now except it is a youtube link
        if(Smartix.helpers.isAndroid() == true && youtubeId == false){
            //do nothing since google docs viewer does not work on cordova android
            //see https://github.com/phonegap/phonegap/wiki/iFrame-Usage
            //it seems to due to the fact that in android corodva's iframe:
            //it Can't use XmlHttpRequests to set document data
            return "";
        }         
         //if it is a normal document url
         if( lodash.endsWith(fileURL,'pdf') 
             || lodash.endsWith(fileURL,'doc') || lodash.endsWith(fileURL,'docx')
             || lodash.endsWith(fileURL,'ppt') || lodash.endsWith(fileURL,'pptx')
             || lodash.endsWith(fileURL,'xls') || lodash.endsWith(fileURL,'xlsx')             
            ){
          return  "<iframe src='https://docs.google.com/viewer?url=" + fileURL + "&embedded=true'></iframe>";
         
         //if it is a google docs url      
         }else if(lodash.startsWith(fileURL,'https://docs.google.com/')){
           var embedReadyURLHTML =  googleDocsURLToEmbedReadyURLHTML(fileURL);
           return embedReadyURLHTML;
         }
         else if(youtubeId != false){
           
           log.info('yep...show user the youtube iframe')
           return '<iframe width="100%" height="360" src="https://www.youtube.com/embed/'+ youtubeId +'?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';
         }
         else{
          return ""; 
         }
    }else{
      return "";
    } 
});



Template.registerHelper('formatTimeFromNow', function(time) {
    var dateString="";
    var userLanguage = TAPi18n.getLanguage();
    moment.locale(userLanguage);    
    if(time){
      if( moment( new Date(time)).isValid() ){
           dateString = moment(time).fromNow();
      }else{
        //log.info(this);
        var fullUnixTime = time;
        if (fullUnixTime){
            var trimUnixTime = fullUnixTime.substr(0,10);
            dateString = moment.unix(trimUnixTime).fromNow();
        }  
          
      }
      
    }
    return dateString;
});

Template.registerHelper('formatTime', function(time) {
    var dateString="";
    if(time){
      if( moment( new Date(time)).isValid() ){
           dateString = moment(time).format('h:mm a');
      }else{
        //log.info(this);
        var fullUnixTime = time;
        if (fullUnixTime){
            var trimUnixTime = fullUnixTime.substr(0,10);
            dateString = moment.unix(trimUnixTime).format('h:mm a');
        }  
          
      }
      
    }
    return dateString;
});

Template.registerHelper('formatDate', function(time) {
    var dateString="";
    if(time){  
      //log.info(this);
      var fullUnixTime = time;
      if (fullUnixTime){
        var trimUnixTime = fullUnixTime.substr(0,10);
        var userLanguage = TAPi18n.getLanguage();
        moment.locale(userLanguage);
        
        dateString = moment.unix(trimUnixTime).format('LL');
      }       
    }
    return dateString;
});



function ping(ip, callback) {

    if (!this.inUse) {
        this.status = 'unchecked';
        this.inUse = true;
        this.callback = callback;
        this.ip = ip;
        var _that = this;
        this.img = new Image();
        this.img.onload = function () {
            _that.inUse = false;
            _that.callback('responded');

        };
        this.img.onerror = function (e) {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback('responded', e);
            }

        };
        this.start = new Date().getTime();
        this.img.src = ip;
        this.timer = setTimeout(function () {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback('timeout');
            }
        }, 1500);
    }
}