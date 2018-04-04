import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.routing.events({
  'click #logout': function(event) {
    console.log('demande de déconnexion...');
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