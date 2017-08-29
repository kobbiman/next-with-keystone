const keystone = require('keystone')

exports = module.exports = function(req, res) {
  const getPost = () => {
    return new Promise((resolve, reject) => {
      keystone.list('Post').model.findOne({slug: req.query.id}).populate('author categories').exec((err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
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
      content: {
        extended
      },
      author: {
        name: {
          first,
          last
        }
      },
      image: {
        secure_url
      },
      categories: categories.map(({name, key}) => {return {name, key}})
    }
  }

  if (req.query.id) {
    getPost().then((result) => {
      res.send(JSON.stringify(getFormatPost(result)))
    }).catch((err) => {
      res.send('nothing be finded')
    })
  } else {
    res.send('nothing be finded')
  }


}
