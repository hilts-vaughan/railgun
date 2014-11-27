/**
        Help Me! Laurier
        ---------------


        The MIT License (MIT)

        Copyright (c) <year> <copyright holders>

        Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the "Software"), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions:

        The above copyright notice and this permission notice shall be included in
        all copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
        THE SOFTWARE.


        This file is responsible for bootstraping the Restify platform and creating a rich API for usage
        within the Help Me! Laurier client. All setup for the application will be done here.

 */

// Imports
var restify = require('restify');
var mongoose = require('mongoose');

var path = require('path')



function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();

server
  .use(restify.fullResponse())
  .use(restify.bodyParser())

//mongoose.connect('mongodb://localhost/test');




var normalizedPath = path.join(__dirname, "routes");

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./routes/" + file)(server);
});


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
