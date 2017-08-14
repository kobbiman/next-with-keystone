exports = module.exports = {
  getAbsoluteUrl (req, url) {
    return req ? `http://${req.headers.host}${url}` : url
  },
  setQS (url, queryStrings) {
    let params = queryStrings;
    let esc = encodeURIComponent;
    let query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    return `${url}?${query}`;
  }
}
