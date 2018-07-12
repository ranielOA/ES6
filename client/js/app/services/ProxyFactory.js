class ProxyFactory{

	static create(objeto, props, acao){//recebe o objeto, as propriedades dele, e a ação que será chamada

		return new Proxy(objeto,{

            get(target, prop, receiver) {//o target eh o objeto, prop suas propriedades e receiver o proxy
                if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])){
                	return function(){
	                    console.log(`a propriedade "${prop}" foi interceptada`);//aqui pode ser executado algun código antes da função do objeto ser chamada(por exemplo antes de adicionar ou esvaziar a tabela)
	                    Reflect.apply(target[prop], target, arguments);// aqui aplica a função do objeto(pode ser a ListaNegociacoes.adiciona() por exemplo
	                    return acao(target); //aqui ele chama a função que ta lá no construtor quando faz o ProxyFactory.create()
	                }
                }

                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver){//o target eh o objeto, prop suas propriedades, value o novo valor que a propriedade receberá e receiver o proxy

            	if(props.includes(prop)){
            		target[prop] = value;//atribuindo o novo valor a propriedade(exemplo: Mensagem[texto] = novo texto)
            		acao(target);// então chama a função que foi colocada no construtor quando faz o ProxyFactory.create()
            	}
            	return Reflect.set(target, prop, value, receiver);
            }
        });
	}

	static _ehFuncao(func) {

    	return typeof(func) == typeof(Function);
	}
}