import { Meteor } from 'meteor/meteor';

Router.configure({
  layoutTemplate: 'routing'
});

Router.route('/', function() {
  this.render('home');
}, {
  name: 'page-home'
})

Router.route('/login', function() {
  if (!Meteor.user()) {
    this.render('login');
  } else {
    this.redirect('/');
  }
}, {
  name: 'page-login'
})

Router.route('/signup', function() {
  if (!Meteor.user()) {
    this.render('signup');
  } else {
    this.redirect('/');
  }
}, {
  name: 'page-signup'
})

Router.route('/chat', function() {
  if (Meteor.user()) {
    this.render('chat');
  } else {
    this.redirect('/');
  }
}, {
  name: 'page-chat'
})


