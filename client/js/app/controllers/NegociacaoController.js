class NegociacaoController {

	constructor(){
		let $ = document.querySelector.bind(document); //bind para manter o contexto do document

		this._inputData = $("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputValor = $("#valor");
	}

	adiciona(event){
		event.preventDefault();		

		//utilizando spread(...) e arrow function(ao invés de function(item, indice) fica (item, indice) =>)
		//let data = new Date(
		//			...this._inputData.value // ... = spread operator, decompõe o array nos itens contidos nele
		//			.split("-")
		//			.map((item, indice) => { //map -> iterar sobre os itens(aqui funcionando tipo um forEach)
		//				if(indice == 1)
		//					return item - 1;

		//				return item; // com a arrow function se a função tiver apenas uma instrução 
									 // pode-se até apagar as chaves e omitir o return como abaixo
		//			}));

		let data = new Date(
					...this._inputData.value
					.split("-")
					.map((item, indice) => indice == 1 ? item - 1 : item)); //utilizando programação funcional
										 //indice é 1? se sim retorna item - 1, senão retorna item

		console.log(data);

		//let dataString = '17-05-2016';
		//let data = new Date(dataString.split('-').reverse().join('/')); //inverte a data e adiciona /, fica(2016/05/17)
		//console.log(data);
	}
}