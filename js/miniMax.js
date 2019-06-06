class MiniMax{
    estado = new EstadoTabuleiro();
    alfa = -5000; //MAX
    beta = 5000; //MIN  

    constructor(estado){
        this.estado = estado;
    }

    minimax(estado){
        let terminou = estado.terminou();
        let max = -10000;
        if (terminou != -1){
            //redireciona para pagina de vitoria do jogador
        }
        let novosEstados = estado.filhos(1);

        for (let i = 0; i < novosEstados.length; i++) 
        {
            let filho = novosEstados[i];
            let candidato = this.min(filho, 1);

            if(candidato > max)
            {
                max = candidato;
                melhorJogada = filho;
            }
        }
        return melhorJogada.acao;
    }

    melhorJogada(){
        return this.minimax(this.estado);
    }

    max(estado,nivel){
        let terminou = estado.terminou();
        let max = -10000;
        if (terminou != -1){
            return terminou;
        }

        if(nivel >= dificuldade){
            return calculaNota();
        }
        let novosEstados = estado.filhos(1);

        for (let i = 0; i < novosEstados.length; i++) 
        {
            let filho = novosEstados[i];
            let candidato = this.min(filho, (nivel+1));

            if(candidato > max)
            {
                max = candidato;
            }
        }

        return max;

    }
    min(estado,nivel){
        let terminou = estado.terminou();
        let min = 10000;
        if (terminou != -1){
            return terminou;
        }

        if(nivel >= dificuldade){
            return calculaNota();
        }
        let novosEstados = estado.filhos(-1);

        for (let i = 0; i < novosEstados.length; i++) 
        {
            let filho = novosEstados[i];
            let candidato = this.max(filho, (nivel+1));

            if(candidato < min)
            {
                min = candidato;
            }
        }
        return min;
    }
    geraCombinações(){
        let arrayCombo = [];
        let combo = [];
        //primeiro pega as verticais
        for(let i = 0; i < estado.tamLinha - 3; i++){
            for(let j = 0; j < estado.tamColuna; j++){
                for(let k = 0; k < 4; k++){
                    combo[k] = matrizTabuleiro[i+k][j];
                }
                arrayCombo.push(combo.slice(0));
            }
        }

        //agora as horizontais
        for(let i = 0; i < estado.tamLinha; i++){
            for(let j = 0; j < estado.tamColuna - 3; j++){
                for(let k = 0; k < 4; k++){
                    let combo[k] = matrizTabuleiro[i][j+k];
                }
                arrayCombo.push(combo.slice(0));
            }
        }

        //diagonais segundo quadrante
        for(let i = 0; i < estado.tamLinha - 3; i++){
            for(let j = 0; j < estado.tamColuna - 3; j++){
                for(let k = 0; k < 4; k++){
                    let combo[k] = matrizTabuleiro[i+k][j+k];
                }
                arrayCombo.push(combo.slice(0));
            }
        }

        //diagonais primeiro quadrante
        for(let i = 3; i < estado.tamLinha; i++){
            for(let j = 0; j < estado.tamColuna - 3; j++){
                for(let k = 0; k < 4; k++){
                    let combo[k] = matrizTabuleiro[i-k][j+k];
                }
                arrayCombo.push(combo.slice(0));
            }
        }
        return arrayCombo;
    }
    calculaNota(){
		
		for(let j = 0; j < estado.tamColuna; j++) for(let i = estado.tamLinha - 1; i >=0 ; i--){
			if(matrizTabuleiro == 0) for(let count = 2 ; i>=0; i--, count++){
				matrizTabuleiro[i][j] = count;
			}
		}

		//X -> PC Z -> JOGADOR

		//XXX2 -> NOTA 5

		//XXX3 -> NOTA 2000

		//XXX4 -> NOTA 500

		//XXX(>5) -> NOTA 400

		//ZZZ2 -> NOTA -10000

		//ZZZ3 -> NOTA -4000
		
		//ZZZ4 -> NOTA -500

		//ZZZ(>5) NOTA -400

		//XX2(>1) -> NOTA 100

		//XX3(>1)  -> NOTA 1500

		//XX4(>1)  -> NOTA 

		//XX(>5)(>1)  -> NOTA 

		//ZZ2(>1)  -> NOTA 

		//ZZ3(>1)  -> NOTA 
		
		//ZZ4(>1)  -> NOTA 

		//ZZ(>5)(>1)  NOTA 

		//CASOS COM LACUNA

		//X00X

		//X0XX


		//AO FINALIZAR O CALCULO DE NOTA É MELHOR RETORNAR O TABULEIRO AO ESTADO ORIGINAL (nao sei se ele é usado pra gerar o novo deopois de calcular a nota ainda)
		for(let j = 0; j < estado.tamColuna; j++) for(let i = 0; i < estado.tamLinha; i++) if(matrizTabuleiro[i][j] > 1) matrizTabuleiro[i][j] = 0;

		return nota;
    }
    // max(estado, nivel)
    // {
    //     let possivelVencedor = estado.determinarVencedor();
    //     if(possivelVencedor != -2)
    //     {
    //         if(possivelVencedor == -3){
    //             estado.miniMax = 0;
    //             return estado;
    //         }

    //         estado.miniMax  = possivelVencedor;
    //         return estado;
    //     }

    //     if(nivel == 6){
    //         estado.miniMax = estado.contaPeca();
    //         return estado;
    //     }

    //     let novosEstados = estado.filhos(1);
    //     let max = -10;
    //     let melhor = null;
    //     for (let i = 0; i < novosEstados.length; i++) 
    //     {
    //         let filho = novosEstados[i];
    //         let possivelMelhor = this.min(filho, (nivel+1));

    //         if(possivelMelhor.miniMax > max)
    //         {
    //             melhor = possivelMelhor;
    //             max = possivelMelhor.miniMax;
    //         }

    //         //poda
    //         // if(possivelMelhor.miniMax > this.alfa){
    //         //     this.alfa = possivelMelhor.miniMax;
    //         //     if(this.alfa < this.beta)
    //         //     {
    //         //         break;
    //         //     }
    //         // }
          
    //     }
    //     //console.log("Acao: " + melhor.acao);
    //     if(estado.melhorAcao[0] == -1 && estado.melhorAcao[1] == -1){
    //         estado.melhorAcao = melhor.acao;
    //     }else{
    //         estado.melhorAcao = melhor.melhorAcao;
    //     }
    //     //console.log("Melhor acao:" + estado.melhorAcao);
    //     estado.miniMax = max;
    //     return estado;
    // }

    // min(estado, nivel)
    // {
    //     let possivelVencedor  = estado.determinarVencedor();  
    //     if(possivelVencedor != -2)
    //     {
    //         if(possivelVencedor == -3){
    //             estado.miniMax = 0;
    //             return estado;
    //         }

    //         estado.miniMax = possivelVencedor;
    //         return estado;
    //     }

    //     if(nivel == 6){
    //         estado.miniMax = estado.contaPeca();
            
    //         //console.log("Estado: " +estado.matrizTabuleiro);
    //         return estado;
    //     }

    //     let novosEstados = [];
    //     novosEstados = estado.filhos(-1);
    //     let min = 10;
    //     let melhor = null;

    //     for (let i = 0; i < novosEstados.length; i++)
    //     {
    //         let filho = novosEstados[i];

    //         let possivelMelhor = this.max(filho, (nivel+1));

    //         if(possivelMelhor.miniMax < min)
    //         {
    //             melhor = possivelMelhor;
    //             min = possivelMelhor.miniMax;
    //         }
    //         //poda
    //         // if(possivelMelhor.miniMax < this.beta){
    //         //     this.beta = possivelMelhor.miniMax;
    //         //     if(this.alfa > this.beta)
    //         //     {
    //         //         break;
    //         //     }
    //         // }
    
    //     }
    //     //console.log("Acao: " + melhor.acao);
    //     if(estado.melhorAcao[0] == -1 && estado.melhorAcao[1] == -1){
    //         estado.melhorAcao = melhor.acao;
    //     }else{
    //         estado.melhorAcao = melhor.melhorAcao;
    //     }

    //     //console.log("Melhor acao:" + estado.melhorAcao);
        
    //     estado.miniMax = min;
    //     return estado;

    // }

}