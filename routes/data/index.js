const data = {
  bolg: require('./bolg'),
  post: require('./post')
}


exports = module.exports = function(req, res) {
  console.log(req.params.type)
  if(data[req.params.type]) {
    data[req.params.type](req, res)
  } else {
    res.send(404, 'Sorry, we cannot find that!')
  }
}
