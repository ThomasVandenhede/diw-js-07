import { Template } from 'meteor/templating';
// import { Accounts } from 'meteor/accounts-base';
// import { ReactiveVar } from 'meteor/reactive-var';


Template.login.events({
  'submit #login': function(event) {
    event.preventDefault();
    var username = $('[name="login[username]"]').val();
    var password = $('[name="login[password]"]').val();
    Meteor.loginWithPassword(username, password, function(error) {
      if (error) {
        console.error(error);
      }
    })
  }
});
