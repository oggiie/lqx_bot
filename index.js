"use strict";
var http = require("http");
var port = process.env.PORT || 3001;
require = require("./bot.js");
/* */
http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify({ name: "lqx_bot", ver: "0.0.1" }));
    response.end();
  })
  .listen(port);
