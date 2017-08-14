var keystone = require('keystone'),
    User = keystone.list('User');

exports = module.exports = function(done) {

    new User.model({
        name: { first: 'Zhao', last: 'Chen' },
        email: 'chen@cheri.cc',
        password: 'admin123',
        canAccessKeystone: true
    }).save(done);

};
