class EstadoTabuleiro{
    //matriz que representa o estado do tabuleiro
    matrizTabuleiro = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ];
    tamLinha = 6;
    tamColuna = 7;
    minimax = 0; // valor de minimax de cada estado criado
    acao = []; // acao que foi realizada para chegar nesse estado (valor de i, j para posicionar uma peça)
    melhorAcao = [-1,-1]; // valores de i, j -> posicicao onde o estado realizara 
                          // a melhor jogada de acordo com o valor de minimax


    //Realizar jogada no tabuleiro
    realizarJogada(jogador, i, j) 
    {     
        //Verifica se a linha que sera realizada a jogada é nao e a ultima 
        if(i != 5)
        {
            //Verifica se a posicao onde se deseja realizar a jogada é invalida 
            //ou se abaixo dessa posicao nao existe uma peca
            if(this.matrizTabuleiro[i][j] != 0 || this.matrizTabuleiro[i + 1][j] == 0)
            {
                return false; //não foi possivel realizar a jogada
            }
        }
        //Verifica se a linha que sera realizada a jogada é a ultima
        else if(i == 5)
        {
            //Verifica se a posicao onde se deseja realizar a jogada é invalida
            if(this.matrizTabuleiro[i][j] != 0)
            {
                return false;//não foi possivel realizar a jogada
            }
        }

        //Caso seja possivel realizar a jogada
        this.acao = [i,j]; //seta a acao
        this.matrizTabuleiro[i][j] = jogador; //coloca o jogador no tabuleiro
        return true; //retorna que foi possivel realizar a jogada

            
    }

    geraCombinações(){
        let arrayCombo = [];
        let combo = [];
        //primeiro pega as verticais
        for(let i = 0; i < this.tamLinha - 3; i++){
            for(let j = 0; j < this.tamColuna; j++){
                for(let k = 0; k < 4; k++){
                    combo[k] = this.matrizTabuleiro[i+k][j];
                }
                arrayCombo.push(combo.slice(0));
            }
        }

        //agora as horizontais
        for(let i = 0; i < this.tamLinha; i++){
            for(let j = 0; j < this.tamColuna - 3; j++){
                for(let k = 0; k < 4; k++){
                    combo[k] = this.matrizTabuleiro[i][j+k];
                }
                arrayCombo.push(combo.slice(0));
            }
        }

        //diagonais segundo quadrante
        for(let i = 0; i < this.tamLinha - 3; i++){
            for(let j = 0; j < this.tamColuna - 3; j++){
                for(let k = 0; k < 4; k++){
                    combo[k] = this.matrizTabuleiro[i+k][j+k];
                }
                arrayCombo.push(combo.slice(0));
            }
        }

        //diagonais primeiro quadrante
        for(let i = 3; i < this.tamLinha; i++){
            for(let j = 0; j < this.tamColuna - 3; j++){
                for(let k = 0; k < 4; k++){
                    combo[k] = this.matrizTabuleiro[i-k][j+k];
                }
                arrayCombo.push(combo.slice(0));
            }
        }
        log.console(arrayCombo.toString());
        return arrayCombo;
    }
    calculaNota(){
		return 0;
    }


    set melhorAcao(melhorAcao) {
        this.melhorAcao = [melhorAcao[0],melhorAcao[1]];
    }

    get melhorAcao() {
        return this.melhorAcao;
    }

    set acao(acao) {
        this.acao = [acao[0],acao[1]];
    }
    
    set miniMax(valor) {
        this.minimax = valor;
    }
    get miniMax() {
        return this.minimax;
    }
    
    get acao(){
        return this.acao;
    }

    //Gerador de filhor a partir de um estado pai
    filhos(jogador) 
    {
        let filhos = []; // array de filhos
        
        //Percorre todo o tabuleiro
        for(let i = 0; i < this.tamLinha; i++) 
        {
            for(let j =0; j < this.tamColuna; j++) 
            {
                let e = this.clonar(); // clona o estado pai

                //tenta realizar a jogada
                //se for possivel guarda esse estado no array de filhos 
                //senao nao faz nada
                if(e.realizarJogada(jogador, i, j)) 
                {
                    filhos.push(e);
                    e.acao = [i,j];
                }
            }
        }
        return filhos; //retorna o vetor de filhos
    }

    //Clonar um estados
    clonar() 
    {
       let clone = new EstadoTabuleiro();
        for(let i = 0; i < this.tamLinha; ++i) 
        {
            for(let j = 0; j < this.tamColuna; ++j) 
            {
                clone.matrizTabuleiro[i][j] = this.matrizTabuleiro[i][j];
            }
        }
        return clone;
    }

    terminou(){

        let contador = 0;
        let jogador = 0;

        
        //horizontalmente
        for (let i = 0; i < this.tamLinha; i++) {
            for (let j = 0; j < this.tamColuna; j++) {
                if(this.matrizTabuleiro[i][j] == 0){
                    jogador = 0;
                    contador = 0;
                }else if(this.matrizTabuleiro[i][j] == jogador){
                    
                    contador++;
                    if(contador == 4) if(jogador == 1){return 10000;}else{return -10000;}
                }else{
                    jogador = this.matrizTabuleiro[i][j];
                    contador = 1;
                }
            }
            contador = 0;
        }
        
        //verticalmente
        for (let j = 0; j < this.tamColuna; j++) {
            for (let i = 0; i < this.tamLinha; i++) {
                if(this.matrizTabuleiro[i][j] == 0){
                    jogador = 0;
                    contador = 0;
                }else if(this.matrizTabuleiro[i][j] == jogador){
                    contador++;
                    if(contador == 4) if(jogador == 1){return 10000;}else{return -10000;}
                }else{
                    jogador = this.matrizTabuleiro[i][j];
                    contador = 1;
                }
            }
            contador = 0;
        }
        
        //diagonal a cima direita
        for (let k = 3; k < this.tamLinha; k++) {
            for (let i = k, j = 0; i >= 0&&j < this.tamColuna; i--, j++) {
                if(this.matrizTabuleiro[i][j] == 0){
                    jogador = 0;
                    contador = 0;
                }else if(this.matrizTabuleiro[i][j] == jogador){
                    contador++;
                    if(contador == 4) if(jogador == 1){return 10000;}else{return -10000;}
                }else{
                    jogador = this.matrizTabuleiro[i][j];
                    contador = 1;
                }
            }
            contador = 0;
        }
        let k = this.tamLinha-1;
        for (let w = 1; w < this.tamColuna-3; w++) {
            for (let i = k, j = w; i >= 0 && j < this.tamColuna; i--, j++) {
                if(this.matrizTabuleiro[i][j] == 0){
                    jogador = 0;
                    contador = 0;
                }else if(this.matrizTabuleiro[i][j] == jogador){
                    contador++;
                    if(contador == 4) if(jogador == 1){return 10000;}else{return -10000;}
                }else{
                    jogador = this.matrizTabuleiro[i][j];
                    contador = 1;
                }
            }
            contador = 0;
        }

        //diagonal pra baixo
        for (let k = this.tamLinha -4 ; k >= 0; k--) {
            for (let i = k, j = 0; i < this.tamLinha && j < this.tamColuna; i++, j++) {
                if(this.matrizTabuleiro[i][j] == 0){
                    jogador = 0;
                    contador = 0;
                }else if(this.matrizTabuleiro[i][j] == jogador){
                    contador++;
                    if(contador == 4) if(jogador == 1){return 10000;}else{return -10000;}
                }else{
                    jogador = this.matrizTabuleiro[i][j];
                    contador = 1;
                }
            }
            contador = 0;
        }
        k = 0;
        for (let w = 1; w < this.tamColuna-3; w++) {
            for (let i = k, j = w; i < this.tamLinha && j < this.tamColuna; i++, j++) {
                if(this.matrizTabuleiro[i][j] == 0){
                    jogador = 0;
                    contador = 0;
                }else if(this.matrizTabuleiro[i][j] == jogador){
                    contador++;
                    if(contador == 4) if(jogador == 1){return 10000;}else{return -10000;}
                }else{
                    jogador = this.matrizTabuleiro[i][j];
                    contador = 1;
                }
            }
            contador = 0;
        }
        
        return -1;
    }

    perdi()
    {
        if(this.terminou() == -10000) return true;
        return false;
    }

    ganhei()
    {
        if(this.terminou() == 10000) return true;
        return false;
    }

}