function enableCors(req, res, next) {
    //method provided by express js to add a header to a response.
    res.setHeader('Access-Control-Allow-Origin', '*'); //any other page can send requsts.
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS'); //available methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

module.exports = enableCors;

