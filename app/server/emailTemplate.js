addClassMailTemplate = function(to,classname) {
  return {
    "message": {
      "merge_language": "handlebars",
      "html": "<p class=\"p1\" style=\"margin: 0.0px 0.0px 0.0px 0.0px;font: 30.0px Helvetica;color: #008f00;\">little genius<\/p> <p class=\"p2\" style=\"margin: 0.0px 0.0px 0.0px 0.0px;font: 30.0px \'Helvetica Neue Light\';color: #343b42;\">{{classname}} is ready for you to use<\/p> <p class=\"p3\" style=\"margin: 0.0px 0.0px 0.0px 0.0px;font: 16.0px \'Helvetica Neue\';color: #a3a3a3;\">Here are instructions\u00A0you can forward to or print for your class to start receiving your messages.<\/p> <p class=\"p4\" style=\"margin: 0.0px 0.0px 0.0px 0.0px;font: 16.0px \'Helvetica Neue\';color: #a3a3a3;min-height: 18.0px;\"><br><\/p> <p class=\"p5\" style=\"margin: 0.0px 0.0px 0.0px 0.0px;text-align: center;font: 20.0px \'Helvetica Neue\';color: #008f00;\">Get PDF instructions for {{classname}}<\/p> <p class=\"p3\" style=\"margin: 0.0px 0.0px 0.0px 0.0px;font: 16.0px \'Helvetica Neue\';color: #a3a3a3;\">Or share this link with your students and parents: <a href=\"http:\/\/www.littlegenius.io\/join\/jsebbmath\/%3Ctoken%3E\"><span class=\"s1\" style=\"color: #2ba6cb;\">http:\/\/www.littlegenius.io\/join\/jsebbmath<\/span><\/a><\/p>",
      "text": "Example text content",
      "subject": "new class ready!",
      "from_email": "message.from_email@example.com",
      "from_name": "little genius",
      "to": [{
        "email": to,
        "name": "Recipient Name",
        "type": "to"
      }],
      "global_merge_vars": [{
        "name": "classname",
        "content": classname
      }]
    }
  }
}
