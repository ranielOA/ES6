class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoes() {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {
            let negociacoes = periodos.reduce((dados, periodo) => dados.concat(periodo), []);

            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        });


		/*
		service.obterNegociacoesDaSemana()
				.then(negociacoes => {
					negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
					this._mensagem.texto = "Negociações importadas com sucesso";
				})
				.catch(erro => this._mensagem.texto = erro);

		service.obterNegociacoesDaSemanaAnterior()
				.then(negociacoes => {
					negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
					this._mensagem.texto = "Negociações importadas com sucesso";
				})
				.catch(erro => this._mensagem.texto = erro);
		
		service.obterNegociacoesDaSemanaRetrasada()
				.then(negociacoes => {
					negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
					this._mensagem.texto = "Negociações importadas com sucesso";
				})
				.catch(erro => this._mensagem.texto = erro);
		*/
    }

    obterNegociacoesDaSemana() {

        return this._http.get("negociacoes/semana") //retornando a promise do HttpService
            .then(
                negociacoes => {
                    console.log(negociacoes);
                    return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)); //troca resolve por return
                })
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível obter as negociações da semana"); //troca reject por trhow new Error
            });

        /* return new Promise((resolve, reject) => { //retornando uma nova promise

            this._http.get("negociacoes/semana")
                        .then(
                            negociacoes => {
                                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                            })
                        .catch(erro => {
                            console.log(erro);
                            reject("Não foi possível obter as negociações da semana")
                        })
        }) */
    }

    obterNegociacoesDaSemanaAnterior(cb) {

        return this._http.get("negociacoes/anterior")
            .then(
                negociacoes => {
                    console.log(negociacoes);
                    return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                })
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível obter as negociações da semana");
            })
    }

    obterNegociacoesDaSemanaRetrasada(cb) {

        return this._http.get("negociacoes/retrasada")
            .then(
                negociacoes => {
                    console.log(negociacoes);
                    return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                })
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível obter as negociações da semana");
            })
    }
}