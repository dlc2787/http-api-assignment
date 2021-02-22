const url = require('url');
// construct json response
const constructResponse = (request, response, code, json) => {
  response.writeHead(code, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(json));
  response.end();
};

// construct XML response
const XMLResponse = (request, response, code, xml) => {
  response.writeHead(code, { 'Content-Type': 'text/xml' });
  response.write(xml);
  response.end();
};

// success message
const getSuccess = (request, response, accept) => {
  const message = 'Successful Response!';

  if (accept[0] === 'text/xml') {
    return XMLResponse(request, response, 200, `<response><message>${message}</message></response>`);
  }
  return constructResponse(request, response, 200, { message: `${message}` });
};

// not found message
const getMissing = (request, response, accept) => {
  const message = "The page you are looking for doesn't exist!";
  const id = 'Page not Found';

  if (accept[0] === 'text/xml') {
    return XMLResponse(request, response, 404, `<response><message>${message}</message><id>${id}</id></response>`);
  }
  return constructResponse(request, response, 404, { id: `${id}`, message: `${message}` });
};

// badRequest message
const getBadRequest = (request, response, accept) => {
  const { query } = url.parse(request.url, true);
  const goodMessage = 'Valid was Set to True';
  const badMessage = 'Missing valid parameter equal to true';
  const id = 'Bad Request';

  if (accept[0] === 'text/xml') {
    if (query.valid && query.valid === 'true') {
      return XMLResponse(request, response, 200, `<response><message>${goodMessage}</message></response>`);
    }
    return XMLResponse(request, response, 400, `<response><message>${badMessage}</message><id>${id}</id></response>`);
  } if (query.valid && query.valid === 'true') {
    return constructResponse(request, response, 200, { message: `${goodMessage}` });
  }
  return constructResponse(request, response, 400, { id: `${id}`, message: `${badMessage}` });
};

// unauthorized message
const getUnauthorized = (request, response, accept) => {
  const { query } = url.parse(request.url, true);
  const goodMessage = 'You\'ve logged in and seen the content!';
  const badMessage = 'You have not authenticated';
  const id = 'Unauthorized';

  if (accept[0] === 'text/xml') {
    if (query.loggedIn && query.loggedIn === 'yes') {
      return XMLResponse(request, response, 200, `<response><message>${goodMessage}</message></response>`);
    }
    return XMLResponse(request, response, 401, `<response><message>${badMessage}</message><id>${id}</id></response>`);
  } if (query.loggedIn && query.loggedIn === 'yes') {
    return constructResponse(request, response, 200, { message: `${goodMessage}` });
  }
  return constructResponse(request, response, 401, { id: `${id}`, message: `${badMessage}` });
};

// forbidden message
const getForbidden = (request, response, accept) => {
  const message = 'Successful Response!';
  const id = 'Forbidden';

  if (accept[0] === 'text/xml') {
    return XMLResponse(request, response, 403, `<response><message>${message}</message><id>${id}</id></response>`);
  }
  return constructResponse(request, response, 403, { id: `${id}`, message: `${message}` });
};

// internal message
const getInternal = (request, response, accept) => {
  const message = 'The server encountered an unforseen error';
  const id = 'Internal Server Error';

  if (accept[0] === 'text/xml') {
    return XMLResponse(request, response, 500, `<response><message>${message}</message><id>${id}</id></response>`);
  }
  return constructResponse(request, response, 500, { id: `${id}`, message: `${message}` });
};

// notimplemented message
const getNotImplemented = (request, response, accept) => {
  const message = 'The requested resource has not yet been implemented';
  const id = 'Not Implemented';

  if (accept[0] === 'text/xml') {
    return XMLResponse(request, response, 501, `<response><message>${message}</message><id>${id}</id></response>`);
  }
  return constructResponse(request, response, 501, { id: `${id}`, message: `${message}` });
};

module.exports = {
  getSuccess,
  getMissing,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternal,
  getNotImplemented,
};
