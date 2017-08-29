const keystone = require('keystone')

exports = module.exports = function(req, res) {
  const getPost = () => {
    return keystone.list('Post').model
    .findOne({slug: req.query.id})
    .populate('author categories')
    .exec()
  }

  const getComments = (result) => {
    return keystone.list('PostComments').model.find()
      .where({post: result})
      .where('commentState', 'published')
      .populate('author')
			.sort('-publishedOn')
      .exec()
  }

  const getFormatPost = ({
    title,categories,
    content: { extended },
    author: {
      name: { first, last }
    },
    image: { secure_url }
  }) => {
    return {
      title,
      content: { extended },
      author: {
        name: { first, last }
      },
      image: {
        secure_url
      },
      categories: categories.map(({name, key}) => {return {name, key}})
    }
  }

  const getFormatComment = (comResult) => {
    return comResult.map(({content, publishedOn, user, author: { name: { first, last }}}) => {
      return {content, publishedOn, user, author: { name: { first, last }}}
    })
  }

  if (req.query.id) {
    getPost().then((postResult) => {
      getComments(postResult).then((comResult) => {
        let thePost = getFormatPost(postResult)
        thePost.comments = getFormatComment(comResult)

        //respones the JSON
        res.send(JSON.stringify(thePost))

      }).catch((err) => {
        throw err
      })
    }).catch((err) => {
      throw err
    })
  } else {
    res.send('nothing be finded')
  }


}
