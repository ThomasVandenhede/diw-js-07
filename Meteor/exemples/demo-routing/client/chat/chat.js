import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

// import { ReactiveVar } from 'meteor/reactive-var';

Meteor.subscribe('lesMessagesDuchat');

Template.chat.events({
  // 'submit #formulaire-de-chat'(event) {
  'submit #formulaire-de-chat': function(event) {
    event.preventDefault();
    //console.log('Envoi du formulaire...');
    var message = $('[name="message"]').val();
    Meteor.call('insererMessageDeChat', {
      message: message,
      created: new Date()
    }, function(error, success) {
      if(error) {
        console.log('Erreur de insererMessageDeChat', error);
      } else {
        console.log('Youpi insererMessageDeChat', success);
      }
    
    })
    //console.log(username, message);
    /*leChat.insert({
      username: username,
      message: message,
      created: new Date()
    })*/
  }
})

Template.chat.helpers({
  tousLesMessages: function() {
    return leChat.find({}, { sort: { created: -1 }});
  }
});

