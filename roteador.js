var handler = require("./reqHandler")
var reqMap = {
	"/" : handler.listar,
	"/index.html" : handler.listar,
	"/sobre.html" : handler.sobre,
	"/aleatorios.html" : handler.aleatorios,
	"/primos.html" : handler.primos,
	"/equacao.html" : handler.equacao,
	"/xadrez.html" : handler.xadrez,
	"/xadrez.json" : handler.xadrezjson,
	"/notfound.html" : handler.notfound
}

function rotear(pathname, request, response) {
	console.log("Roteando para: " + pathname)

	if(reqMap[pathname]) {
		reqMap[pathname](request,response)
	} else {
		handler.notfound(request,response)
	}
	
}

exports.rotear = rotear
