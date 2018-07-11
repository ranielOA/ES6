class NegociacaoController {

	constructor(){
		let $ = document.querySelector.bind(document); //bind para manter o contexto do document
		let self = this;

		this._inputData = $("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputValor = $("#valor");

		this._listaNegociacoes = new Proxy(new ListaNegociacoes(),{
            get (target, prop, receiver) {
                if(["adiciona", "esvazia"].includes(prop) && typeof(target[prop]) == typeof(Function)){
                	return function(){
	                    console.log(`a propriedade "${prop}" foi interceptada`);
	                    Reflect.apply(target[prop], target, arguments);
	                    self._negociacoesView.update(target);
	                }
                }

                return Reflect.get(target, prop, receiver);
            }
        });
		/*this._listaNegociacoes = new ListaNegociacoes(model =>	//o this na arrow function é léxico, então ele continua a se referir ao NegociacaoController
											this._negociacoesView.update(this._listaNegociacoes));
		*/
		//aqui é como teria que fazer com uma função normal ao invés de arrow function
		//this._listaNegociacoes = new ListaNegociacoes(this, function (model) { //cria uma função junto que irá atualizar a View(tabela)
		//	this._negociacoesView.update(this._listaNegociacoes);		//a function tem this dinamico, então este this sem utilizar o Reflect
		//});																//na ListaNegociacoes se refere a ListaNegociacoes

		this._negociacoesView = new NegociacoesView($("#negociacoesView"));
		this._negociacoesView.update(this._listaNegociacoes);

		this._mensagem = new Mensagem();
		this._mensagemView = new MensagemView($("#mensagemView"));
		this._mensagemView.update(this._mensagem);

	}

	adiciona(event){
		event.preventDefault();			

		this._listaNegociacoes.adiciona(this._criaNegociacao());

		this._mensagem.texto = "Negociação adicionada com sucesso";	
		this._mensagemView.update(this._mensagem);

		this._limpaFormulario();
		
	}

	apaga(){
		this._listaNegociacoes.esvazia();

		this._mensagem.texto = "Negociações apagadas com sucesso";	
		this._mensagemView.update(this._mensagem);
	}

	_limpaFormulario(){
		this._inputData.value = "";
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0;

		this._inputData.focus();
	}

	_criaNegociacao(){
		return new Negociacao(
				DateHelper.textoParaData(this._inputData.value),
				this._inputQuantidade.value,
				this._inputValor.value);
	}
}