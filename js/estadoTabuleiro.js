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
		
		for(let j = 0; j < this.tamColuna; j++) for(let i = this.tamLinha - 1; i >=0 ; i--){
			if(this.matrizTabuleiro == 0) for(let count = 2 ; i>=0; i--, count++){
				this.matrizTabuleiro[i][j] = count;
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
		for(let j = 0; j < this.tamColuna; j++) for(let i = 0; i < this.tamLinha; i++) if(this.matrizTabuleiro[i][j] > 1) this.matrizTabuleiro[i][j] = 0;

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
        for(let i = 0; i < this.matrizTabuleiro.length; i++) 
        {
            for(let j =0; j < this.matrizTabuleiro.length; j++) 
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
        for(let i = 0; i < this.matrizTabuleiro.length; ++i) 
        {
            for(let j = 0; j < this.matrizTabuleiro.length; ++j) 
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
        for (let w = 1; w < this.tamColuna-4; w++) {
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
        for (let w = 1; w < this.tamColuna-4; w++) {
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

    //Verificar se existe um vencedor
    determinarVencedor() {
        var jogador = -1; //inicialmente jogador == jogador invalido 
        var contador = 3; // variavel utilizada para determinar se alguem venceu
        var testadiagonal = 0; // variavel usada para determinar a diagonal
        let verificaLinha0 = 0; //variavel utilizada verificar se o tabuleiro esta cheio

        //Verificar se a primeira linha do tabuleiro (linha 0) esta cheia
        for (let i = 0; i < this.matrizTabuleiro.length; i++) { 
            if(this.matrizTabuleiro[0][i] != 0){
                verificaLinha0++;
            }
        }
        if(verificaLinha0 == 7){
            return -3; //Se o tabuleiro estiver cheio retorna -3
        }

        //Percorrer o tabuleiro e determinar se existe algum vencedor    
        for(let i = 0; i < this.matrizTabuleiro.length; ++i) 
        {
            for(let j = 0; j < this.matrizTabuleiro.length; ++j) 
            {
                //verifica se na posicao do tabuleiro existe alguma peca
                if(this.matrizTabuleiro[i][j] != 0)
                {
                    jogador = this.matrizTabuleiro[i][j]; //jogador == jogador em uma determinada posicao
    
                    //Se jogador esta posicionado em uma coluna menor que 2
                    if(j < 3)
                    {
                        //Se jogador esta posicionado em uma linha menor que 3
                        if(i < 3)
                        {
                            //verifica ganhador na vertical abaixo
                            contador = 3;
                            for(let z = (i + 1); z < this.matrizTabuleiro.length; z++)
                            {
                                if(this.matrizTabuleiro[z][j] == jogador)
                                {
                                    contador--;
                                }else{
                                    break;
                                }
    
                                if(contador == 0)
                                {
                                    return jogador;
                                }
                            }
                            
                            //verifica ganhador na horizontal direita
                            contador = 3;
                            for(let z = (j + 1); z < 4; z++)
                            {
                                if(this.matrizTabuleiro[i][z] == jogador)
                                {
                                    contador--;
                                }else{
                                    break;
                                }
    
                                if(contador == 0)
                                {
                                    return jogador;
                                }
                            } 
                            
                            //verifica ganhador na diagonal principal abaixo
                            contador = 3;
                            testadiagonal = (j+1);
                            for(let z = (i+1); z < this.matrizTabuleiro.length; z++)
                            {
                                if(this.matrizTabuleiro[z][testadiagonal++] == jogador)
                                {
                                    contador--;
                                }else{
                                    break;
                                }
    
                                if (contador == 0) 
                                {
                                    return jogador;
                                }
    
                            }
                        }

                        //Se jogador esta posicionado em uma linha maior que 4
                        else
                        {
                            //verifica ganhador na vertical a cima
                            contador = 3;
                            for(let z = (i - 1); z >= 0; z--)
                            {
                                //console.log('verifica veritical cima');
                                if(this.matrizTabuleiro[z][j] == jogador)
                                {
                                    contador--;
                                }
                                else{
                                    break;
                                }
    
                                if(contador == 0)
                                {
                                    return jogador;
                                }
                            }
                            
                            //verifica ganhador na horizontal direita
                            contador = 3;
                            for(let z = (j + 1); z < this.matrizTabuleiro.length; z++)
                            {
                                
                                //console.log('verifica horizintal direita');
                                if(this.matrizTabuleiro[i][z] == jogador)
                                {
                                    contador--;
                                    //console.log(contador);
                                }else{
                                    break;
                                }
    
                                if(contador == 0)
                                {
                                    return jogador;
                                }
                            } 
                            
                            //verifica ganhador na diagonal principal para cima
                            contador = 3;
                            testadiagonal = (j+1);
                            
                            for(let z = (i-1); z >= 0; z--)
                            {
                                if(this.matrizTabuleiro[z][testadiagonal++] == jogador)
                                {
                                    contador--;
                                }else{
                                    break;
                                }
    
                                if(contador == 0)
                                {
                                    return jogador;
                                }
                            }
                        }
                    }

                    //Se jogador esta posicionado na coluna 3 ou 4
                    else if(j == 3)
                    {
                        //Se jogador esta posicionado em uma linha menor que 3
                        if(i < 3)
                        {
                            //verifica horizontal esquerda
                            contador = 3;
                            for (let z = (j - 1); z >= 0; z--){
                                if(this.matrizTabuleiro[i][z] == jogador)
                                {
                                    contador--;
                                }else{
                                    break;
                                }
    
                                if(contador == 0)
                                {
                                    return jogador;
                                }                    
                            }
    
                            //verifica horizontal direita
                            contador = 3;
                            for (let z = (j + 1); z < this.matrizTabuleiro.length; z++){
                                if(this.matrizTabuleiro[i][z] == jogador)
                                {
                                    contador--;
                                }else{
                                    break;
                                }
    
                                if(contador == 0)
                                {
                                    return jogador;
                                }                    
                            }
    
                            //verifica diagonal abaixo esquerda
                            contador = 3;
                            testadiagonal = (j-1);
                            for (let z = (i+1); z < this.matrizTabuleiro.length; z++){
                                if(this.matrizTabuleiro[z][testadiagonal--] == jogador)
                                {
                                    contador--;
                                }else{
                                    break;
                                }
    
                                if(contador == 0)
                                {
                                    return jogador;
                                }                    
                            }
    
                            //verifica diagonal abaixo direita
                            contador = 3;
                            testadiagonal = (j+1);
                            for (let z = (i+1); z < this.matrizTabuleiro.length; z++){
                                if(this.matrizTabuleiro[z][testadiagonal++] == jogador)
                                {
                                    contador--;
                                }else{
                                    break;
                                }
    
                                if(contador == 0)
                                {
                                    return jogador;
                                }                    
                            }
    
                            //verifica vertical abaixo
                            contador = 3;
                            for (let z = (i+1); z < this.matrizTabuleiro.length; z++){
                                if(this.matrizTabuleiro[z][j] == jogador)
                                {
                                    contador--;
                                }else{
                                    break;
                                }
    
                                if(contador == 0)
                                {
                                    return jogador;
                                }                    
                            }
                        }
                        
                        //Se jogador esta posicionado em uma linha maior que 4
                        else
                        {
                            //verifica ganhador na vertical a cima
                            contador = 3;
                            for(let z = (i - 1); z >= 0; z--)
                            {
                                if(this.matrizTabuleiro[z][j] == jogador)
                                {
                                    contador--;
                                }else{
                                    break;
                                }    
                                
                                if(contador == 0)
                                {
                                    return jogador;
                                }
                            }
                            
                            //verifica ganhador na horizontal direita
                            contador = 3;
                            for(let z = (j + 1); z < this.matrizTabuleiro.length; z++)
                            {
                                if(this.matrizTabuleiro[i][z] == jogador)
                                {
                                    contador--;
                                }else{
                                    break;
                                }    
                                
                                if(contador == 0)
                                {
                                    return jogador;
                                }
                            } 
    
                            //verifica horizontal esquerda
                            contador = 3;
                            for (let z = (j - 1); z >= 0; z--){
                                if(this.matrizTabuleiro[i][z] == jogador)
                                {
                                    contador--;
                                }else{
                                    break;
                                }
    
                                if(contador == 0)
                                {
                                    return jogador;
                                }                    
                            }
    
                            //verifica diagonal acima esquerda
                            contador = 3;
                            testadiagonal = (j-1);
                            for (let z = (i-1); z >= 0; z--){
                                if(this.matrizTabuleiro[z][testadiagonal--] == jogador)
                                {
                                    contador--;
                                }else{
                                    break;
                                }
    
                                if(contador == 0)
                                {
                                    return jogador;
                                }                    
                            }
    
                            //verifica diagonal acima direita
                            contador = 3;
                            testadiagonal = (j+1);
                            for (let z = (i-1); z >= 0; z--){
                                if(this.matrizTabuleiro[z][testadiagonal++] == jogador)
                                {
                                    contador--;
                                }else{
                                    break;
                                }
    
                                if(contador == 0)
                                {
                                    return jogador;
                                }                    
                            }
                        }
                    }
                    
                    //Se jogador esta posicionado em uma coluna maior que 4
                    else
                    {
                        //Se jogador esta posicionado em uma linha menor que 3
                        if(i < 3)
                        {
                            //verifica horizontal esquerda
                            contador = 3;
                            for (let z = (j - 1); z >= 0; z--){
                                if(this.matrizTabuleiro[i][z] == jogador)
                                {
                                    contador--;
                                }else{
                                    break;
                                }
    
                                if(contador == 0)
                                {
                                    return jogador;
                                }                    
                            }
    
                            //verifica diagonal abaixo esquerda
                            contador = 3;
                            testadiagonal = (j-1);
                            for (let z = (i+1); z < this.matrizTabuleiro.length; z++){
                                if(this.matrizTabuleiro[z][testadiagonal--] == jogador)
                                {
                                    contador--;
                                }else{
                                    break;
                                }
    
                                if(contador == 0)
                                {
                                    return jogador;
                                }                    
                            }
    
                            //verifica vertical abaixo
                            contador = 3;
                            for (let z = (i+1); z < this.matrizTabuleiro.length; z++){
                                if(this.matrizTabuleiro[z][j] == jogador)
                                {
                                    contador--;
                                }else{
                                    break;
                                }
    
                                if(contador == 0)
                                {
                                    return jogador;
                                }                    
                            }
                        }
                        
                        //Se jogador esta posicionado em uma linha maior que 4
                        else
                        {
                            //verifica diagonal acima esquerda
                            contador = 3;
                            testadiagonal = (j-1);
                            for (let z = (i-1); z >= 0; z--){
                                if(this.matrizTabuleiro[z][testadiagonal--] == jogador)
                                {
                                    contador--;
                                }else{
                                    break;
                                }
    
                                if(contador == 0)
                                {
                                    return jogador;
                                }                    
                            }
    
                            //verifica horizontal esquerda
                            contador = 3;
                            for (let z = (j - 1); z >= 0; z--){
                                if(this.matrizTabuleiro[i][z] == jogador)
                                {
                                    contador--;
                                }else{
                                    break;
                                }
    
                                if(contador == 0)
                                {
                                    return jogador;
                                }                    
                            }
    
                            //verifica vertical acima
                            contador = 3;
                            for (let z = (i-1); z >= 0; z--){
                                if(this.matrizTabuleiro[z][j] == jogador)
                                {
                                    contador--;
                                }else{
                                    break;
                                }
    
                                if(contador == 0)
                                {
                                    return jogador;
                                }                    
                            }
                        }
                    } 
                }
            }
        }
        return -2; //Se nao tiver nenhum ganhador retorna -2
    }

}