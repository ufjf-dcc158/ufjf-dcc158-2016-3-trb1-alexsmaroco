var url = require("url")
var qs = require("querystring")

function listar(request,response) {
	response.writeHead(200,{"Content-Type": "text/html"	})
	response.write("<p><a href='sobre.html'> Sobre <a/></p>")
	response.write("<p><a href='aleatorios.html'> Numeros aleatorios <a/></p>")
	response.write("<p><a href='primos.html'> Numeros primos <a/></p>")
	response.write("<p><a href='equacao.html'> Equacoes <a/></p>")
	response.write("<p><a href='xadrez.html'> Xadrez <a/></p>")
	response.end()
}

function sobre(request,response) {
	response.writeHead(200,{"Content-Type": "text/html"	})
	response.write("<p>Nome: Alex da Silva Maroco</p>")
	response.write("<p>Matricula: 201235001</p>")
	response.write("<p>Email: alexsmaroco@gmail.com</p>")
	response.write("<p>Curso: Ciencia da Computação</p>")
	response.end()
}

function notfound(request,response) {
	response.writeHead(200,{"Content-Type": "text/html"})
	response.write("<h1> Pagina nao encontrada! </h1>")
	response.end()
}

function aleatorios(request, response) {
	response.writeHead(200,{"Content-Type": "text/html"})
	var listaImpares =[]
	var listaPares = []
	var rand = 0
	for(var i=0; i < 100; i++) {
		rand = Math.floor((Math.random() * 1000));
		if((rand%2)==0) {
		    listaPares.push(rand)
		} else {
		    listaImpares.push(rand)
		}
	}
	response.write("<p>Numeros pares: " + listaPares.toString() + "</p>")
	response.write("<p>Numeros impares: " + listaImpares.toString() + "</p>")
	response.end()
}

function primos(request,response) {
	response.writeHead(200,{"Content-Type": "text/html"})
	var param = url.parse(request.url, true).query
	
	var n1 = parseInt(param.N1)
	var n2 = parseInt(param.N2)
	var isPrimo = true
	if( n1 == NaN || n2 == NaN || n1 >= n2 || n2 > 100) {
		response.write("Intervalo invalido!")
	} else {
		response.write("<p>Primos no intervalo [" + n1 + "," + n2 + "]: </p>")
		for(var i=n1; i<n2; i++) {
			for(var j=2;j<i;j++) {
				if(i%j==0) {
					isPrimo = false
					break
				}
			}
			if(isPrimo) {
				response.write(i + ",")
			}
			isPrimo = true
		}
   }
   response.end()
}

function equacao(request,response) {
	response.writeHead(200,{"Content-Type": "text/html"})
	if(request.method == "GET") {
		response.write("<p> Resolva sua equacao de 2o grau </p>")
		response.write("<form method='post'>")
		response.write("<p> Valor de a: <input type='text' name='varA'/></p>")
		response.write("<p> Valor de b: <input type='text' name='varB'/></p>")
		response.write("<p> Valor de c: <input type='text' name='varC'/></p>")
		response.write("<p> <input type='submit'/></p>")
		response.write("</form>")
		response.end()
	} else if(request.method == "POST") {
		var stream = ""
		request.on('data', function(data){
			stream = stream+data
		})
		request.on('end', function() {
			var dados = qs.parse(stream)
			var a = dados.varA
			var b = dados.varB
			var c = dados.varC
			if(a == "" || b == "" || c == "") {
				response.write("<p> Parametros faltando! </p>")
			} else {
				a = parseFloat(a)
				b = parseFloat(b)
				c = parseFloat(c)
				if(a == NaN || b == NaN || c == NaN) {
					response.write("<p> Parametros invalidos! </p>")
				} else {
					response.write("<p> Resultado da equaçao: </p>")
					var delta = (b*b - 4*a*c)
					
					if(delta < 0) {
						response.write("<p> Sem solução! Delta negativo </p>")
					} else {
						var x1 = ((Math.sqrt(delta) - b)/(2*a))
						var x2 = ((0-Math.sqrt(delta) - b)/(2*a))
						response.write("<p> x1 = " + x1 + "</p>")
						response.write("<p> x2 = " + x2 + "</p>")
						response.end()
					}
				}
			}
		})
	}
}

exports.equacao = equacao
exports.primos = primos
exports.aleatorios = aleatorios
exports.notfound = notfound
exports.listar = listar
exports.sobre = sobre
