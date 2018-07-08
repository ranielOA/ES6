class MensagemView extends View{

	constructor(elemento){ //pode omitir o construtor da classe filha se tiver exatamente o mesmo construtor da classe mãe
		super(elemento);
	}

	template(model){
		return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : "<p></p>";
	}
}