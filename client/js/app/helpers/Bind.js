class Bind{

	constructor(model, view, ...props){// ... aqui como REST operator(tipo o params em C#)

		let proxy = ProxyFactory.create(model, props, model => view.update(model));

		view.update(model);

		return proxy;//em javascript eh possivel retornar outra classe no construtor
	}
}