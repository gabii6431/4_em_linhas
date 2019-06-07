class MiniMax{
    alfa = -5000; //MAX
    beta = 5000; //MIN  

    minimax(estado){
        let terminou = estado.terminou();
        let max = -10000;
        let melhorJogada;
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
        console.log(melhorJogada)
        return melhorJogada.acao;
    }

    max(estado,nivel){
        let terminou = estado.terminou();
        let max = -10001;
        let dificuldade = 3
        // let dificuldade = localStorage.getItem('dificuldade');
        if (terminou != -1){
            return terminou;
        }

        if(nivel >= dificuldade){
            return estado.calculaNota();
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
        let min = 10001;
        let dificuldade = 3
        // let dificuldade = localStorage.getItem('dificuldade')
        if (terminou != -1){
            return terminou;
        }

        if(nivel >= dificuldade){
            return estado.calculaNota();
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