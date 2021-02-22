const HTTP = require('http');
const url = require('url');
const JSONHandler = require('./responses.js');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const URLPairings = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCss,
  '/success': JSONHandler.getSuccess,
  '/badRequest': JSONHandler.getBadRequest,
  '/unauthorized': JSONHandler.getUnauthorized,
  '/forbidden': JSONHandler.getForbidden,
  '/internal': JSONHandler.getInternal,
  '/notImplemented': JSONHandler.getNotImplemented,
  missing: JSONHandler.getMissing,
};

const onRequest = (request, response) => {
  console.log(request.url);

  const path = url.parse(request.url);
  const accept = request.headers.accept.split(',');

  if (URLPairings[path.pathname]) {
    URLPairings[path.pathname](request, response, accept);
  } else {
    URLPairings.missing(request, response, accept);
  }
};

HTTP.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1:${port}`);
