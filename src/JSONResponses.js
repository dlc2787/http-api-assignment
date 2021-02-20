//construct json response
const constructResponse = (request, response, code, json) => {
  response.writeHead(code, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(json));
  response.end();
};

//construct XML response
const XMLResponse = (request, response, code, xml) => {
  response.writeHead(code, { 'Content-Type': 'text/XML' });
  response.write(xml);
  response.end();
};

//success message
const getSuccess = (request, response, query) => {
  const message = 'Successful Response!';

  if (query.type && query.type === 'text/xml') {
    XMLResponse(request, response, 200, `<response><message>${message}</message></response>`);
  } else {
    constructResponse(request, response, 200, { message: `${message}` });
  }
};

//not found message
const getMissing = (request, response, query) => {
  const message = "The page you are looking for doesn't exist!";
  const id = 'Page not Found';

  if (query.type && query.type === 'text/xml') {
    XMLResponse(request, response, 404, `<response><message>${message}</message><id>${id}</id></response>`);
  } else {
    constructResponse(request, response, 404, { id: `${id}`, message: `${message}` });
  }
};

//badRequest message
const getBadRequest = (request, response, query) => {
  const goodMessage = 'Valid was Set to True';
  const badMessage = 'Missing valid parameter equal to true';
  const id = 'Bad Request';

  if (query.type && query.type === 'text/xml') {
    if (query.valid && query.valid === 'true') {
      XMLResponse(request, response, 200, `<response><message>${goodMessage}</message></response>`);
    } else {
      XMLResponse(request, response, 400, `<response><message>${badMessage}</message><id>${id}</id></response>`);
    }
  } else if (query.valid && query.valid === 'true') {
    constructResponse(request, response, 200, { message: `${goodMessage}` });
  } else {
    constructResponse(request, response, 400, { id: `${id}`, message: `${badMessage}` });
  }
};

//unauthorized message
const getUnauthorized = (request, response, query) => {
  const goodMessage = 'You\'ve logged in and seen the content!';
  const badMessage = 'You have not authenticated';
  const id = 'Unauthorized';

  if (query.type && query.type === 'text/xml') {
    if (query.loggedIn && query.loggedIn === 'yes') {
      XMLResponse(request, response, 200, `<response><message>${goodMessage}</message></response>`);
    } else {
      XMLResponse(request, response, 401, `<response><message>${badMessage}</message><id>${id}</id></response>`);
    }
  } else if (query.loggedIn && query.loggedIn === 'yes') {
    constructResponse(request, response, 200, { message: `${goodMessage}` });
  } else {
    constructResponse(request, response, 401, { id: `${id}`, message: `${badMessage}` });
  }
};

//forbidden message
const getForbidden = (request, response, query) => {
    const message = 'Successful Response!';
    const id = 'Forbidden';

    if (query.type && query.type === 'text/xml') {
      XMLResponse(request, response, 403, `<response><message>${message}</message><id>${id}</id></response>`);
    } else {
        constructResponse(request, response, 403, { id: `${id}`, message: `${message}` });
    }
};

//internal message
const getInternal = (request, response, query) => {
    const message = 'The server encountered an unforseen error';
    const id = 'Internal Server Error';

    if (query.type && query.type === 'text/xml') {
      XMLResponse(request, response, 500, `<response><message>${message}</message><id>${id}</id></response>`);
    } else {
        constructResponse(request, response, 500, { id: `${id}`, message: `${message}` });
    }
};

//notimplemented message
const getNotImplemented = (request, response, query) => {
    const message = 'The requested resource has not yet been implemented';
    const id = 'Not Implemented';

    if (query.type && query.type === 'text/xml') {
      XMLResponse(request, response, 501, `<response><message>${message}</message><id>${id}</id></response>`);
    } else {
     constructResponse(request, response, 501, { id: `${id}`, message: `${message}` });
    }
};

module.exports.getSuccess = getSuccess;
module.exports.getMissing = getMissing;
module.exports.getBadRequest = getBadRequest;
module.exports.getUnauthorized = getUnauthorized;
module.exports.getForbidden = getForbidden;
module.exports.getInternal = getInternal;
module.exports.getNotImplemented = getNotImplemented;
