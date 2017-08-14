var keystone = require('keystone');

keystone.init({
  'name': 'next app',
  'mongo': 'mongodb://127.0.0.1:27017',
  'session': true,
  'auth': true,
  'user model': 'User',
	'static': 'public',
  'cookie secret': '(your secret here)',
  'auto update': true
})

keystone.import('models');

keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	users: 'users',
});

const routus = require('./routes');
keystone.set('routes', routus.routes);

routus.views.prepare().then(() => {
  keystone.start();
})
