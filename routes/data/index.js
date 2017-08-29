const data = {
  bolg: require('./bolg'),
  post: require('./post'),
  addcomment: require('./addcomment')
}


exports = module.exports = function(req, res) {
  if(data[req.params.type]) {
    data[req.params.type](req, res)
  } else {
    res.send(404, 'Sorry, we cannot find that!')
  }
}
