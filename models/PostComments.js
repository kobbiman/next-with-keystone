var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PostCategory Model
 * ==================
 */

var PostComments = new keystone.List('PostComments', {
	label: 'Comments',
});

PostComments.add({
	// author: { type: Types.Relationship, initial: true, ref: 'User', index: true },
	post: { type: Types.Relationship, initial: true, ref: 'Post', index: true },
	commentState: { type: Types.Select, options: ['published', 'draft', 'archived'], default: 'published', index: true },
	publishedOn: { type: Types.Date, default: Date.now, noedit: true, index: true },
});

PostComments.add('Content', {
	content: { type: Types.Textarea, height: 300 },
});


PostComments.defaultColumns = 'author, post, publishedOn, commentState, content';

PostComments.register();
