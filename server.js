var keystone = require('keystone');

keystone.init({
  'name': 'next app',
  'mongo': 'mongodb://127.0.0.1:27017',
  'session': true,
  'auth': true,
  'user model': 'User',
	'static': 'public',
  'cookie secret': '(your secret here)',
  'auto update': true,
  'wysiwyg images': true,
  // 'wysiwyg cloudinary images': true,
  'cloudinary config': 'cloudinary://285573442532891:ile_fG7bcv1GOFYtJc1AvJsXNBw@dlaf2azhv'
})

keystone.import('models');
//
keystone.set('nav', {
	posts: ['posts', 'post-categories', 'post-comments'],
	users: 'users',
});

const routus = require('./routes');
keystone.set('routes', routus.routes);

routus.views.prepare().then(() => {
  keystone.start();
})
