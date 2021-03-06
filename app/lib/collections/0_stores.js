Stores = {};

// var imageStore = new FS.Store.S3("images", {
//   accessKeyId: Meteor.settings.accessKeyId, //required
//   secretAccessKey: Meteor.settings.secretAccessKey, //required
//   bucket: Meteor.settings.imageStoreBucket //required
// });

// var anyStore = new FS.Store.S3("any", {
//   accessKeyId: Meteor.settings.accessKeyId, //required
//   secretAccessKey: Meteor.settings.secretAccessKey, //required
//   bucket: Meteor.settings.anyStoreBucket //required
// });

Stores.images = new FS.Store.GridFS("images");
Stores.sounds = new FS.Store.GridFS("sounds", {
  // beforeWrite:function(fileObj){
  //   log.info("start Transform");
  //
  //
  //     // fileObj.extension("wav");
  //     // fileObj.type("audio/wav");
  //
  // },
  // beforeRead:function (fileObj) {
  //   // fileObj.extension("wav");
  //   // fileObj.type("audio/wav");
  //
  // }
});
Stores.thumbs = new FS.Store.GridFS("thumbs", {
  beforeWrite: function (fileObj) {
    // We return an object, which will change the
    // filename extension and type for this store only.
    return {
      extension: 'png',
      type: 'image/png'
    };
  },
  transformWrite: function (fileObj, readStream, writeStream) {
    // Transform the image into a 60px x 60px PNG thumbnail
    gm(readStream).resize(300).stream('PNG').pipe(writeStream);
    // The new file size will be automatically detected and set for this store
  }
});

Stores.any = new FS.Store.GridFS("any");

Stores.documents = new FS.Store.GridFS("documents");
