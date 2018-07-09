class ListaNegociacoes{

	constructor(armadilha){ //recebendo o contexto do NegociacaoController e uma função
		this._negociacoes = [];
		this._armadilha = armadilha;
	}

	adiciona(negociacao){
		this._negociacoes.push(negociacao);
		this._armadilha(this);
		//Reflect.apply(this._armadilha, this._contexto, [this]); //usando reflection para trocar o contexto da função presente no NegociacaoController, que seria o da ListaNegociacao mas agora passa a ser o da NegociacaoController mesmo.
					//ordem construtor Reflect.Apply(função, contexto da função, parametros no construtor da função):
					//função que quer chamar, 
					//o contexto em que a função está presente(neste caso a função esta no NegociacaoController, por isso foi passado seu contexto para ca pelo construtor (constructor(contexto, armadilha) tinha esse construtor antes usar arrow function)),
					//os parametros do construtor da função dentro de um array, nesse caso ela recebe o model(que é a ListaNegociacoes)
	}

	esvazia(){
		this._negociacoes = [];
		this._armadilha(this);
		//Reflect.apply(this._armadilha, this._contexto, [this]);
	}

	get negociacoes(){
		return [].concat(this._negociacoes); //concatenando um array vazion com a lista da classe para evitar
											 //que outras classes possam ter acesso a lista interna
		
	}
}