

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

function calcularMov(dimensao,x,y) {
	var vetorPontos = []
	if(x != undefined && y != undefined) {
		if(y-2 >= 0) {
			if(x-1 >= 0) {
				vetorPontos.push(new coordenada(x-1,y-2))
			}
			if(x+1 < dimensao) {
				vetorPontos.push(new coordenada(x+1,y-2))
			}
		}
		if(y+2 < dimensao) {
			if(x-1 >= 0) {
				vetorPontos.push(new coordenada(x-1,y+2))
			}
			if(x+1 < dimensao) {
				vetorPontos.push(new coordenada(x+1,y+2))
			}
		}
		if(x-2 >= 0) {
			if(y-1 >= 0) {
				vetorPontos.push(new coordenada(x-2,y-1))
			}
			if(y+1 < dimensao) {
				vetorPontos.push(new coordenada(x-2,y+1))
			}
		}
		if(x+2 < dimensao) {
			if(y-1 >= 0) {
				vetorPontos.push(new coordenada(x+2,y-1))
			}
			if(y+1 < dimensao) {
				vetorPontos.push(new coordenada(x+2,y+1))
			}
		}
	}
	return vetorPontos
}


function desenhar(dimensao, x, y) {
	var html = "<table width='" + 4*dimensao*dimensao + "' height=' " + 4*dimensao*dimensao + "' border='2'>"
	var vetorPontos = calcularMov(dimensao,x,y)
	
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

function montarjson(dimensao, x, y) {

	var obj = {
		"dimensao" : dimensao,
		"posCavalo" : [x,y],
		"movimentos" : [],
		"tabuleiro" : new Array(dimensao)
		
	}
	for(var i=0; i < dimensao; i++) {
		obj.tabuleiro[i] = new Array(dimensao)
	}
	
	obj.movimentos = calcularMov(dimensao,x,y)
		
	
	for(var linha=0; linha<dimensao;linha++) {
		var desenhaCavalo = false
		var marcaMov = false
		for(var coluna=0;coluna<dimensao;coluna++) {
			desenhaCavalo = comparar2d(x,y,linha,coluna)
			marcaMov = marcar(obj.movimentos,linha,coluna)
			
			if(coluna%2==linha%2) {
				if(desenhaCavalo) {
					obj.tabuleiro[linha][coluna]='C'
					desenhaCavalo = false
				} else if(marcaMov) {
					obj.tabuleiro[linha][coluna]='M'
				} else {
					obj.tabuleiro[linha][coluna]='W'
				}
			} else {
				if(desenhaCavalo) {
					obj.tabuleiro[linha][coluna]='C'
					desenhaCavalo = false
				} else if(marcaMov) {
					obj.tabuleiro[linha][coluna]='M'
				} else {
					obj.tabuleiro[linha][coluna]='B'
				}
			}
		}
	}
	console.log(obj)
	var json = JSON.stringify(obj)
	console.log(json)
	console.log(JSON.parse(json))
	return json
}


exports.montarjson = montarjson
exports.desenhar = desenhar
