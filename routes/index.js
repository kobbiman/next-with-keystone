const keystone = require('keystone');
const next = require('next');
const LRUCache = require('lru-cache')
const middleware = require('./middleware');

keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

const dev = process.env.NODE_ENV !== 'production';
const views = next({
  dir: './views',
  dev
});

const handle = views.getRequestHandler();

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
})


const importRoutes = keystone.importer(__dirname);
const data = importRoutes('./data');


// views.prepare().then(() => {
  exports = module.exports = {
    views: views,
    routes: function(app) {
      app.get('/', (req, res) => {
        renderAndCache(req, res, '/')
      })

      app.get('/bolg/:category', (req, res) => {
        renderAndCache(req, res, '/bolg', {
          category: req.params.category
        })
      })

      app.get('/post/:id', (req, res) => {
        renderAndCache(req, res, '/post', {
          id: req.params.id
        })
      })

      app.get('/data/:type', data.index)
      app.post('/data/:type', data.index)

      app.get('*', (req, res) => {
        handle(req, res)
      })
    }
  }
// })





function getCacheKey (req) {
  return `${req.url}`
}

function renderAndCache (req, res, pagePath, queryParams) {
  const key = getCacheKey(req)

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    console.log(`CACHE HIT: ${key}`)
    res.send(ssrCache.get(key))
    return
  }

  // If not let's render the page into HTML
  views.renderToHTML(req, res, pagePath, queryParams)
  .then((html) => {
    // Let's cache this page
    console.log(`CACHE MISS: ${key}`)
    ssrCache.set(key, html)

    res.send(html)
  })
  .catch((err) => {
    views.renderError(err, req, res, pagePath, queryParams)
  })
}
