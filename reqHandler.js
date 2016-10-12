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
					response.write("<p> Resultado da equacao: </p>")
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

function xadrez(request,response) {
	response.writeHead(200,{"Content-Type": "text/html"})
	var param = url.parse(request.url, true).query
	var x = parseInt(param.X)
	var y = parseInt(param.Y)
	response.write(criaTabuleiro(8,x,y))
	response.end()
}

function coordenada(x,y) {
	this.x = x
	this.y = y
}

function comparar2d(x1,y1, x2, y2) {
	if(x1 == x2 && y1 == y2) return true
	else return false
}

function marcar(pontos, x, y) {
	for(var i=0; i < pontos.length; i++) {
		if(pontos[i].x == x && pontos[i].y == y) return true
	}
	return false
}

function criaTabuleiro(dimensao, x, y) {
	var html = "<table width='" + 4*dimensao*dimensao + "' height=' " + 4*dimensao*dimensao + "' border='2'>"
	
	var pontos = {
		"movCimaEsq" : null,
		"movCimaDir" : null,
		"movBaixoEsq" : null,
		"movBaixoDir" : null,
		"movEsqCima" : null,
		"movEsqBaixo" : null,
		"movDirCima" : null,
		"movDirBaixo" : null
	}
	
	var vetorPontos = []
	
	
	if(x != NaN && y != NaN) {
		if(y-2 >= 0) {
			if(x-1 >= 0) {
				pontos.movCimaEsq = new coordenada(x-1,y-2)
				vetorPontos.push(new coordenada(x-1,y-2))
			}
			if(x+1 < dimensao) {
				pontos.movCimaDir = new coordenada(x+1,y-2)
				vetorPontos.push(new coordenada(x+1,y-2))
			}
		}
		if(y+2 < dimensao) {
			if(x-1 >= 0) {
				pontos.movBaixoEsq = new coordenada(x-1,y+2)
				vetorPontos.push(new coordenada(x-1,y+2))
			}
			if(x+1 < dimensao) {
				pontos.movBaixoDir = new coordenada(x+1,y+2)
				vetorPontos.push(new coordenada(x+1,y+2))
			}
		}
		if(x-2 >= 0) {
			if(y-1 >= 0) {
				pontos.movEsqBaixo = new coordenada(x-2,y-1)
				vetorPontos.push(new coordenada(x-2,y-1))
			}
			if(y+1 < dimensao) {
				pontos.movEsqCima = new coordenada(x-2, y+1)
				vetorPontos.push(new coordenada(x-2,y+1))
			}
		}
		if(x+2 < dimensao) {
			if(y-1 >= 0) {
				pontos.movDirBaixo = new coordenada(x+2,y-1)
				vetorPontos.push(new coordenada(x+2,y-1))
			}
			if(y+1 < dimensao) {
				pontos.movDirCima = new coordenada(x+2,y+1)
				vetorPontos.push(new coordenada(x+2,y+1))
			}
		}
	}
	for(var linha=0; linha<dimensao;linha++) {
		html = html + "<tr>"
		var desenhaCavalo = false
		var marcaMov = false
		for(var coluna=0;coluna<dimensao;coluna++) {
			
			desenhaCavalo = comparar2d(x,y,linha,coluna)
			marcaMov = marcar(vetorPontos,linha,coluna)
			
			if(coluna%2==linha%2) {
				if(desenhaCavalo) {
					html = html+"<td id bgColor='green'/>"
					desenhaCavalo = false
				} else if(marcaMov) {
					html = html+"<td id bgColor='red'/>"
				} else {
					html = html+"<td id bgColor='white'/>"
				}
			} else {
				if(desenhaCavalo) {
					html = html+"<td id bgColor='green'/>"
					desenhaCavalo = false
				} else if(marcaMov) {
					html = html+"<td id bgColor='red'/>"
				} else {
					html = html+"<td id bgColor='black'/>"
				}
			}
		}
		html = html + "</tr>"
	}
	html = html + "</table>"
	return html
}

exports.xadrez = xadrez
exports.equacao = equacao
exports.primos = primos
exports.aleatorios = aleatorios
exports.notfound = notfound
exports.listar = listar
exports.sobre = sobre
