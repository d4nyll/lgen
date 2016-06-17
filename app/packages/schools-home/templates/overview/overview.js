Template.MobileSchoolHome.helpers({
    toUpperI18N:function(key) {
        return TAPi18n.__(key).toUpperCase();
    },

    schoolLogoUrl:function(){
        var schoolLogoId;
        var schoolDoc = SmartixSchoolsCol.findOne({                                                    
            username: Router.current().params.school                                                                     
        });
        //log.info('schoolDoc',schoolDoc);
        if(schoolDoc) {
            schoolLogoId = schoolDoc.logo;
        
        }
        //log.info(schoolLogoId);
        return Images.findOne(schoolLogoId);
    },
    
    schoolFullName:function(){
        var schoolLogoId;
        var schoolDoc = SmartixSchoolsCol.findOne({                                                    
            username: Router.current().params.school                                                                     
        });
        if(schoolDoc){
         return schoolDoc.name;             
        }
    },

    getSlidingNews:function(){
        var newsgroupsIds = [];
        var newsgroupsByUserArray =  Smartix.Groups.Collection.find({ type: 'newsgroup', users: Meteor.userId() }).fetch(); 
        var newsgroupsByUserArrayIds = lodash.map(newsgroupsByUserArray,'_id');
        var distributionListsUserBelong = Smartix.Groups.Collection.find({type: 'distributionList', users: Meteor.userId() }).fetch();
        var distributionListsUserBelongIds = lodash.map(distributionListsUserBelong,'_id');
        //log.info('distributionListsUserBelongIds',distributionListsUserBelongIds);
        var newsgroupsBydistributionLists =  Smartix.Groups.Collection.find({ type: 'newsgroup', distributionLists: {$in : distributionListsUserBelongIds } , optOutUsersFromDistributionLists :{  $nin : [Meteor.userId()] } }).fetch();      
        var newsgroupsBydistributionListsIds = lodash.map(newsgroupsBydistributionLists,'_id');
        //log.info('newsgroupsBydistributionListsIds',newsgroupsBydistributionListsIds);
        newsgroupsIds = newsgroupsIds.concat(newsgroupsByUserArrayIds,newsgroupsBydistributionListsIds);
        //log.info('newsgroupsIds',newsgroupsIds);
        Template.instance().canGetSlidNews.set(true);
        return Smartix.Messages.Collection.find({$or:[
            {
                group: { $in: newsgroupsIds },
                hidden : false,
                deletedAt:""
            },
            {
                group: { $in: newsgroupsIds },
                hidden: false,
                deletedAt: { $exists: false }
            }
        ]}
        , {sort: {createdAt: -1 }, reactive: false }
        );
    },
    
    needMaskImageFallback:function(){
      return (document.documentElement.style['-webkit-mask-image'] !== undefined) ? "" : "mask-image-fallback"
    },
    getSchoolBannerBackground:function(){

        var schoolBackgroundImageId;
        var schoolDoc = SmartixSchoolsCol.findOne({
            username: Router.current().params.school
        });
        var customStyle;
        //log.info('schoolDoc',schoolDoc);
        if(schoolDoc) {
            schoolBackgroundImageId = schoolDoc.backgroundImage;
        }
        //log.info('schoolBackgroundImageId',schoolBackgroundImageId);
        //log.info(schoolLogoId);
        if(schoolBackgroundImageId){
            var  bgObj =  Images.findOne(schoolBackgroundImageId);
            //log.info('bgObj',bgObj);

             customStyle = `
                                <style>                        
                                    .school-banner-wrapper .school-banner-background{
                                    background-image: url('${bgObj.url()}');
                                    }                                                                    
                                </style>
                            `;
        }else{
             customStyle = `
                                <style>                        
                                    .school-banner-wrapper .school-banner-background{
                                    background-image: url('/packages/smartix_accounts/client/asset/graduation_ceremony_picture@1x.jpg');
                                    }                                                                    
                                </style>
                            `;
        }


        return customStyle;
    },
    customizeTheme: function() {
        
        /*
        var pickSchool = SmartixSchoolsCol.findOne(Session.get('pickedSchoolId'));

        if (!pickSchool) {
            return "";
        }

        if (pickSchool.preferences.schoolBackgroundColor && pickSchool.preferences.schoolTextColor) {
            var schoolBackgroundColor = pickSchool.preferences.schoolBackgroundColor;
            var schoolTextColor = pickSchool.preferences.schoolTextColor;
            if (schoolBackgroundColor && schoolTextColor) {
                var customStyle = `
                                    <style>                        
                                         .school-logo-wrapper .school-logo img{
                                              border: 3px solid ${schoolBackgroundColor};
                                         }                                                                        
                                    </style>
                                `;

                return customStyle;
            } else {
                return "";
            }
        } else {
            return "";
        }*/


    },
    
    
});

Template.MobileSchoolHome.onDestroyed(function(){
   
   this.canGetSlidNews = new ReactiveVar(false);
     
})

Template.MobileSchoolHome.onCreated(function(){
   
   this.canGetSlidNews = new ReactiveVar(false);
   var self = this;
   self.subscribe('newsgroupsForUser',null,null, Router.current().params.school,function(){
    self.subscribe('newsForUser',null,null, Router.current().params.school);       
   });
   self.subscribe('images', Router.current().params.school, 'school', Router.current().params.school);
})

Template.MobileSchoolHome.onRendered(function(){
    var self = this;


    self.autorun(function(){
        if(self.canGetSlidNews.get()){
            self.$('.ion-slide-box').slick({
                infinite: true,
                autoplay: true,
                autoplaySpeed: 4000,
                arrows: false,
                dots: false,
                dotsClass: 'slider-pager',
                initialSlide: 0,
                customPaging: function(slider, i) {
                return '<span class="slider-pager-page icon ion-record"></span>';
                }
            });            
        }
    })
        

  




})

Template.MobileSchoolHome.onDestroyed(function(){   


})