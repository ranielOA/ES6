class ListaNegociacoes{

	constructor(){
		this._negociacoes = [];
	}

	adiciona(negociacao){
		this._negociacoes.push(negociacao);
	}

	get negociacoes(){
		return [].concat(this._negociacoes); //concatenando um array vazion com a lista da classe para evitar
											 //que outras classes possam ter acesso a lista interna
	}
}