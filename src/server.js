const HTTP = require('http');
const url = require('url');
// const XMLHandler = require('./XMLResponses.js');
const JSONHandler = require('./JSONResponses.js');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

/*
const URLPairings = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCss,
  '/success': JSONHandler.getSuccess,
  notFound: JSONHandler.getMissing,
};
*/

const onRequest = (request, response) => {
  console.log(request.url);
  // URLPairings[request.url].call(request, response);

  const { query } = url.parse(request.url, true);

  switch (url.parse(request.url, false).pathname) {
    case '/':
      htmlHandler.getIndex(request, response, query);
      break;
    case '/style.css':
      htmlHandler.getCss(request, response, query);
      break;
    case '/success':
      JSONHandler.getSuccess(request, response, query);
      break;
    case '/badRequest':
      JSONHandler.getBadRequest(request, response, query);
      break;
    case '/unauthorized':
      JSONHandler.getUnauthorized(request, response, query);
      break;
    case '/forbidden':
      JSONHandler.getForbidden(request, response, query);
      break;
    case '/internal':
      JSONHandler.getInternal(request, response, query);
      break;
    case '/notImplemented':
      JSONHandler.getNotImplemented(request, response, query);
      break;
    default:
      JSONHandler.getMissing(request, response, query);
      break;
  }
};

HTTP.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1:${port}`);
