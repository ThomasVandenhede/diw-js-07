import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
// import { ReactiveVar } from 'meteor/reactive-var';


Template.body.events({
  'click #logout': function(event) {
    event.preventDefault();
    Meteor.logout(function(error) {
      if (error) {
        console.error(error);
      } else {
        console.log('déconnexion réussie')
      }
    });
  }
});

Template.connect.events({
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
  },
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
