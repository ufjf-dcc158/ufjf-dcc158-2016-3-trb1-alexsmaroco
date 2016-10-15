var http = require("http")
var url = require("url")

function start(roteador) {
	http.createServer(onRequest).listen(8000)
	console.log("Ouvindo conexoes na porta 8000")

	function onRequest(request,response) {
		console.log("Requisiçao recebida!")
		roteador.rotear(url.parse(request.url).pathname, request,response)
	}
}
module.exports.start = start
