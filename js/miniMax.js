class MiniMax{
    alfa = -5000; //MAX
    beta = 5000; //MIN    
    nivelDificuldade = parseInt(localStorage.getItem("dificuldade"));
    minimax(estado){
        let max = -1000000;
        let melhoresJogadas;
        if (estado.perdi()){
            alertify.confirm('Você ganhou!', function(){ window.location.href = "index.html" });
        }
        let novosEstados = estado.filhos(1);

        for (let i = 0; i < novosEstados.length; i++) 
        {
            let filho = novosEstados[i];
            let candidato = this.min(filho, 1);

            if(candidato > max)
            {
                max = candidato;
                melhoresJogadas = [];
                melhoresJogadas.push(filho);
            }else if(candidato == max){
                melhoresJogadas.push(filho);
            }
        }
        let rand = Math.floor(Math.random() * melhoresJogadas.length)
        console.log("possibilidades:"+melhoresJogadas.length)
        console.log("escolha:"+rand)
        
        return melhoresJogadas[rand].acao
    }

    max(estado,nivel){
        let terminou = estado.terminou();
        let max = -1000000;
        let dificuldade = this.nivelDificuldade;
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
        let min = 1000000;
        let dificuldade = this.nivelDificuldade;
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
   
}