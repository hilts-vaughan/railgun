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
var hooks = require("./hooks");

var Schema = mongoose.Schema;

var autoIncrement = require('mongoose-auto-increment');

var path = require('path')



function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer(
  {
   formatters: {
        "application/hal+json": function (req, res, body) {
            return res.formatters["application/json"](req, res, body);
        }
    }
  }
  );

var RESOURCES = Object.freeze({
    INITIAL: "/",
    TOKEN: "/token",
    PUBLIC: "/public",
    SECRET: "/secret",
    SCOPED: "/scoped"
});

// Setup some basic plugins and parsers for the restify server
server
  .use(restify.fullResponse())
  .use(restify.bodyParser({ mapParams: false }))
  .use(restify.queryParser())
  .use(restify.authorizationParser());


var dbConnection = mongoose.connect('mongodb://localhost/test');

// Ensure everything gets a unique incremented ID, like an old fashioned relational database
autoIncrement.initialize(dbConnection);
mongoose.plugin(autoIncrement.plugin);


// Attach mongoose onto the requests for usage
server.use(function(req, res, next){
  req.db = mongoose;
  next();
})

var restify = require("restify");
var restifyOAuth2 = require("restify-oauth2");


server.get(RESOURCES.INITIAL, function (req, res) {
    var response = {
        _links: {
            self: { href: RESOURCES.INITIAL },
            "http://localhost:8080/public": { href: RESOURCES.PUBLIC }
        }
    };

    if (req.clientId) {
        response._links["http://rel.example.com/secret"] = { href: RESOURCES.SECRET };

        if (req.scopesGranted.indexOf("two") !== -1) {
            response._links["http://rel.example.com/scoped"] = { href: RESOURCES.SCOPED };
        }
    } else {
        response._links["oauth2-token"] = {
            href: RESOURCES.TOKEN,
            "grant-types": "client_credentials",
            "token-types": "bearer"
        };
    }

    res.contentType = "application/hal+json";
    res.send(response);
});

server.get(RESOURCES.PUBLIC, function (req, res) {
    res.send({
        "public resource": "is public",
        "it's not even": "a linked HAL resource",
        "just plain": "application/json",
        "personalized message": req.clientId ? "hi, " + req.clientId + "!" : "hello stranger!"
    });
});

server.get(RESOURCES.SECRET, function (req, res) {
    if (!req.clientId) {
        return res.send("Hear be dragons! Rawr! 400");
    }

    var response = {
        "clients with a token": "have access to this secret data",
        _links: {
            self: { href: RESOURCES.SECRET },
            parent: { href: RESOURCES.INITIAL }
        }
    };

    res.contentType = "application/hal+json";
    res.send(response);
});

server.get(RESOURCES.SCOPED, function (req, res) {
    if (!req.clientId) {
        return res.sendUnauthenticated();
    }

    if (req.scopesGranted.indexOf("two") === -1) {
        return res.sendUnauthorized();
    }

    var response = {
        "clients with a token that is scoped correctly": "have access to this scoped data",
        _links: {
            self: { href: RESOURCES.SCOPED },
            parent: { href: RESOURCES.INITIAL }
        }
    };

    res.contentType = "application/hal+json";
    res.send(response);
});



// Setup all the routes
var normalizedPath = path.join(__dirname, "routes");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./routes/" + file)(server);
});


// Finally, begin listening.
server.listen(8080, function() {
  console.log('%s listening at %s and open for connections.', "Help Me! Laurier", server.url);
});
