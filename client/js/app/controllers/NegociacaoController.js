class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document); //bind para manter o contexto do document
		let self = this;

		this._inputData = $("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputValor = $("#valor");

		this._listaNegociacoes = new Bind(
			new ListaNegociacoes(),
			new NegociacoesView($("#negociacoesView")),
			"adiciona", "esvazia", "ordena", "inverteOrdem");

		this._mensagem = new Bind(
			new Mensagem(),
			new MensagemView($("#mensagemView")),
			"texto");

		this._ordemAtual = "";
	}

	adiciona(event) {
		event.preventDefault();

		this._listaNegociacoes.adiciona(this._criaNegociacao());
		this._mensagem.texto = "Negociação adicionada com sucesso";
		this._limpaFormulario();

	}

	importaNegociacoes() {
		let service = new NegociacaoService();

		service.obterNegociacoes()
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
				this._mensagem.texto = "Negociações do período importadas com sucesso";
			})
			.catch(error => this._mensagem = error);
	}

	apaga() {
		this._listaNegociacoes.esvazia();
		this._mensagem.texto = "Negociações apagadas com sucesso";
	}

	_limpaFormulario() {
		this._inputData.value = "";
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0;

		this._inputData.focus();
	}

	_criaNegociacao() {
		return new Negociacao(
			DateHelper.textoParaData(this._inputData.value),
			this._inputQuantidade.value,
			this._inputValor.value);
	}

	ordena(coluna){
		if(this._ordemAtual == coluna)
			this._listaNegociacoes.inverteOrdem();
		else
			this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);//a[coluna] = (objeto[propriedade]), forma de acessar a propriedade de um objeto 
																		   //dinamicamente(neste caso pode ser por exemplo a data da negociação, ou quantidade, ou volume ou valor)
		this._ordemAtual = coluna;
	}
}