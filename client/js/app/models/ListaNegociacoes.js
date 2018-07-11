class ListaNegociacoes{

	constructor(){
		this._negociacoes = [];
	}

	adiciona(negociacao){
		this._negociacoes.push(negociacao);
		//Reflect.apply(this._armadilha, this._contexto, [this]); //usando reflection para trocar o contexto da função presente no NegociacaoController, que seria o da ListaNegociacao mas agora passa a ser o da NegociacaoController mesmo.
					//ordem construtor Reflect.Apply(função, contexto da função, parametros no construtor da função):
					//função que quer chamar, 
					//o contexto em que a função está presente(neste caso a função esta no NegociacaoController, por isso foi passado seu contexto para ca pelo construtor (constructor(contexto, armadilha) tinha esse construtor antes usar arrow function)),
					//os parametros do construtor da função dentro de um array, nesse caso ela recebe o model(que é a ListaNegociacoes)
	}

	esvazia(){
		this._negociacoes = [];
	}

	get negociacoes(){
		return [].concat(this._negociacoes); //concatenando um array vazion com a lista da classe para evitar
											 //que outras classes possam ter acesso a lista interna
		
	}
}