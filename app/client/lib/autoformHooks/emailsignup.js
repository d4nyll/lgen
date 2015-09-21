var postHooks = {
  before: {
    method: function (doc) {
      doc.role = Router.current().params.role;
      return doc;
    }
  },
  onSuccess: function (operation, result, template) {

  },
  onError: function (formType, error) {
    alert(error.reason);
  }
};

AutoForm.addHooks('signupform', postHooks);
