import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('lesMessagesDuchat', function() {
    return leChat.find({}, { sort: { created: -1 }});
  });
});

Meteor.methods({
  insererMessageDeChat: function(nouveauDocumentChat) {
    const id = leChat.insert(nouveauDocumentChat);
    if (id) {
      return {id: id};
    } else {
      throw new Meteor.Error('Impossible d\'insérer le nouveau message chat');
    }
  }
});
