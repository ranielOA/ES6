class Negociacao{

	constructor(data, quantidade, valor){
		this._data = new Date(data.getTime());
		this._quantidade = quantidade;
		this._valor = valor;
		Object.freeze(this); //congela o objeto não permitindo fazer alterações no mesmo(poém não congela propriedades 
						//de um atributo que é um objeto, como a data, que pode mudar o dia pelo data.setDate(nroDia))
	}

	get data(){
		return new Date(this._data.getTime());
	}

	get quantidade(){
		return this._quantidade;
	}

	get valor(){
		return this._valor;
	}

	get volume(){
		return this._quantidade * this._valor;
	}
}