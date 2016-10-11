var http = require("http")
var roteador = require("./roteador")

var server  = require("./server")
server.start(roteador)
