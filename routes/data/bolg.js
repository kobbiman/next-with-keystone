const keystone = require('keystone')

exports = module.exports = function(req, res) {
  const getPostCategoryData = () => {
    return new Promise((resolve, reject) => {
      keystone.list('PostCategory').model.find().sort('name').exec((err, result) => {
        resolve(result)
      })
    })
  }

  const getPostsData = () => {
    return new Promise((resolve, reject) => {

      const returnPostData = (p) => {
        p.exec((err, result) => {
          resolve(result)
        })
      }

      let p = keystone.list('Post').paginate({
  			page: req.query.page || 1,
  			perPage: 10,
  			maxPages: 10,
  			filters: {
  				state: 'published',
  			},
  		}).sort('-publishedDate').populate('author categories')



      if (req.query.category) {
        keystone.list('PostCategory').model.findOne({key: req.query.category}).exec((err, result) => {
          p.where('categories').in([result])
          returnPostData(p)
        })
      } else {
        returnPostData(p)
      }
    })
  }

  const setFormatGategory = (res) => {
    return res.map(({key, name}) => {
      return {
        key,
        name
      }
    })
  }
  const setFromatPost = (res) => {
    res.results = res.results.map(({author, content, slug, title}) => {
      return {
        author: {
          name: {
            first: author.name.first,
            last: author.name.last
          }
        },
        content: {
          brief: content.brief
        },
        id: slug,
        title

      }
    })
    return res
  }

  Promise.all([getPostCategoryData(), getPostsData()]).then((results)=> {
    res.send(JSON.stringify({
      PostCategory: setFormatGategory(results[0]),
      Posts: setFromatPost(results[1])
    }))
  })

}
