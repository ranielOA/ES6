class View {

	constructor(elemento){
		this._elemento = elemento;
	}

	template(){
		throw new Error("O método template deve ser implementado"); //para obrigar a classe filha a implementar esse método
	}

	update(model){
		this._elemento.innerHTML = this.template(model);
	}
}