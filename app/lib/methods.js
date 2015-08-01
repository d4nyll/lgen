/*****************************************************************************/
/* Client and Server Methods */
/*****************************************************************************/
Meteor.methods({
  /*
   * Example:
   *
   * '/app/items/insert': function (item) {
   *  if (this.isSimulation) {
   *    // do some client stuff while waiting for
   *    // result from server.
   *    return;
   *  }
   *
   *  // server method logic
   * }
   */
   'user/char/update':function(char){
     console.log(char);
     Meteor.users.update(Meteor.userId(),{$set:{"char":char}},function(err){
          if(err)
            console.log(err);
       });
   }
});
