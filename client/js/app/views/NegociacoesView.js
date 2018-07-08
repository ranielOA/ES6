class NegociacoesView extends View{

	constructor(elemento){//pode omitir o construtor da classe filha se tiver exatamente o mesmo construtor da classe mãe
		super(elemento);
	}

	template(model){
		return `
		<table class="table table-hover table-bordered">
	        <thead>
	            <tr>
	                <th>DATA</th>
	                <th>QUANTIDADE</th>
	                <th>VALOR</th>
	                <th>VOLUME</th>
	            </tr>
	        </thead>
	        
	        <tbody>
	        	${model.negociacoes
	        		.map(n => `

			        	<tr>
			        		<td>${DateHelper.dataParaTexto(n.data)}</td>
			        		<td>${n.quantidade}</td>
			        		<td>${n.valor}</td>
			        		<td>${n.volume}</td>
			        	</tr>
			        	
			        `).join("")
			   	}
	        </tbody>
	        
	        <tfoot>
	        	<td colspan="3"></td>
	        	<td>
	        		${
        				model.negociacoes.reduce((total, n) => total+=n.volume, 0.0) //função reduce para ir somando o volume, junto com programação funcional
	        		}
	        	</td>
	        </tfoot>
	    </table>
	    `;
	}
}