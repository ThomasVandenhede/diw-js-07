import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';

Template.signup.events({
  'submit #signup': function(event) {
    event.preventDefault();
    var username = $('[name="signup[username]"]').val();
    var password = $('[name="signup[password]"]').val();
    Accounts.createUser({
      username: username,
      email: username,
      password: password
    }, function(error) {
      if (error) {
        console.error(error);
      }
    })
  }
});