var http = require("http")
var roteador = require("./roteador")

var server  = require("./serverClass")
server.start(roteador)
