var jogadorAtual = -1 // quem comeca jogar é sempre o X

//JOGADOR -1 = X -> Usuario (Comeca Jogando)
//JOGADOR 1 = O -> IA

//Objeto EstadoTabuleiro
var objEstado = new EstadoTabuleiro();

// Função para realizar as jogas quando ocorrer um click
$('.container div.rowT div').click(function(){
    //console.log(localStorage.getItem('nivel'));
    
    // Captura o ID da posição da peça
    var id = $(this).attr('id');

    //Verificar se o usuario clicou na coluna 0
    if(id == 1 || id == 7 || id == 13 || id == 19 || id == 25 || id == 31)
    {
        for (let i = 31; i > 0; i = i - 6)
        {
            var j = i.toString();

            //Verifica se a posicao j esta vazia
            if(document.getElementById(j).textContent == "")
            {

                //calcula o i, j associado e essa posicao
                let posI = calculaPosicao(j)[0]; 
                let posJ = calculaPosicao(j)[1];
                
                if(jogadorAtual == -1)
                {
                    setPosicaoJogador(i,jogadorAtual); //coloca o jogador no tabuleiro
                    objEstado.matrizTabuleiro[posI][posJ] = jogadorAtual; // seta a matriz com o jogador atual
                    let e = objEstado.clonar(); //clona o estado pai
                    let ia = new MiniMax(e); //cria um objeto do tipo minimax
                    jogadorAtual = 1; //troca o jogador (IA)
                    let m = ia.melhorJogada(); //chama a funcao de minimax para determinar a melhor jogada para a IA
                    objEstado.realizarJogada(jogadorAtual,m[0],m[1]); //realiza a jogada no tabuleiro com a melhor jogada possivel
                    let calculaId = (m[0]*(objEstado.matrizTabuleiro.length)) + (m[1] + 1); //calcula o id associado a essa melhor jogasa
                    setPosicaoJogador(calculaId,jogadorAtual); //coloca o jogador no tabuleiro (IA)
                    jogadorAtual = -1; //troca o jogador (Usuario)
                }
                else
                {
                    setPosicaoJogador(i,jogador);
                    objEstado.matrizTabuleiro[posI][posJ] = jogadorAtual;
                    jogadorAtual = -1;
                }
                break;
            }
        }
    }
    
    //Verificar se o usuario clicou na coluna 1
    else if(id == 2 || id == 8 || id == 14 || id == 20 || id == 26 || id == 32)
    {
        for (let i = 32; i > 0; i = i - 6) 
        {
            var j = i.toString();
            if(document.getElementById(j).textContent == "")
            {
                let posI = calculaPosicao(j)[0];
                let posJ = calculaPosicao(j)[1];
                
                if(jogadorAtual == -1)
                {
                    setPosicaoJogador(i,jogadorAtual); // coloca o jogador no tabuleiro
                    objEstado.matrizTabuleiro[posI][posJ] = jogadorAtual;
                    let e = objEstado.clonar();
                    let ia = new MiniMax(e);
                    jogadorAtual = 1;
                    let m = ia.melhorJogada();
                    objEstado.realizarJogada(jogadorAtual,m[0],m[1]);
                    let calculaId = (m[0]*(objEstado.matrizTabuleiro.length)) + (m[1] + 1);
                    setPosicaoJogador(calculaId,jogadorAtual);
                    jogadorAtual = -1;

                }
                else
                {
                    setPosicaoJogador(i,jogador);
                    objEstado.matrizTabuleiro[posI][posJ] = jogadorAtual;
                    jogadorAtual = -1;
                }
                break;
            }
        }
    }
    
    //Verificar se o usuario clicou na coluna 2
    else if(id == 3 || id == 9 || id == 15 || id == 21 || id == 27 || id == 33)
    {
        for (let i = 33; i > 0; i = i - 6) 
        {
            var j = i.toString();
            if(document.getElementById(j).textContent == "")
            {
                let posI = calculaPosicao(j)[0];
                let posJ = calculaPosicao(j)[1];
                
                if(jogadorAtual == -1)
                {
                    setPosicaoJogador(i,jogadorAtual); // coloca o jogador no tabuleiro
                    objEstado.matrizTabuleiro[posI][posJ] = jogadorAtual;
                    let e = objEstado.clonar();
                    let ia = new MiniMax(e);
                    jogadorAtual = 1;
                    let m = ia.melhorJogada();
                    objEstado.realizarJogada(jogadorAtual,m[0],m[1]);
                    let calculaId = (m[0]*(objEstado.matrizTabuleiro.length)) + (m[1] + 1);
                    setPosicaoJogador(calculaId,jogadorAtual);
                    jogadorAtual = -1;

                }
                else
                {
                    setPosicaoJogador(i,jogador);
                    objEstado.matrizTabuleiro[posI][posJ] = jogadorAtual;
                    jogadorAtual = -1;
                }
                break;
            }
        }
    }
    
    //Verificar se o usuario clicou na coluna 3
    else if(id == 4 || id == 10 || id == 16 || id == 22 || id == 28 || id == 34)
    {
        for (let i = 34; i > 0; i = i - 6) 
        {
            var j = i.toString();
            if(document.getElementById(j).textContent == "")
            {
                let posI = calculaPosicao(j)[0];
                let posJ = calculaPosicao(j)[1];
                
                if(jogadorAtual == -1)
                {
                    setPosicaoJogador(i,jogadorAtual); // coloca o jogador no tabuleiro
                    objEstado.matrizTabuleiro[posI][posJ] = jogadorAtual;
                    let e = objEstado.clonar();
                    let ia = new MiniMax(e);
                    jogadorAtual = 1;
                    let m = ia.melhorJogada();
                    objEstado.realizarJogada(jogadorAtual,m[0],m[1]);
                    let calculaId = (m[0]*(objEstado.matrizTabuleiro.length)) + (m[1] + 1);
                    setPosicaoJogador(calculaId,jogadorAtual);
                    jogadorAtual = -1;

                }
                else
                {
                    setPosicaoJogador(i,jogador);
                    objEstado.matrizTabuleiro[posI][posJ] = jogadorAtual;
                    jogadorAtual = -1;
                }
                break;
            }
        }
    
    }

    //Verificar se o usuario clicou na coluna 4
    else if(id == 5 || id == 11 || id == 17 || id == 23 || id == 29 || id == 35)
    {
        for (let i = 35; i > 0; i = i - 6) 
        {
            var j = i.toString();
            if(document.getElementById(j).textContent == "")
            {
                let posI = calculaPosicao(j)[0];
                let posJ = calculaPosicao(j)[1];
                
                if(jogadorAtual == -1)
                {
                    setPosicaoJogador(i,jogadorAtual); // coloca o jogador no tabuleiro
                    objEstado.matrizTabuleiro[posI][posJ] = jogadorAtual;
                    let e = objEstado.clonar();
                    let ia = new MiniMax(e);
                    jogadorAtual = 1;
                    let m = ia.melhorJogada();
                    objEstado.realizarJogada(jogadorAtual,m[0],m[1]);
                    let calculaId = (m[0]*(objEstado.matrizTabuleiro.length)) + (m[1] + 1);
                    setPosicaoJogador(calculaId,jogadorAtual);
                    jogadorAtual = -1;

                }
                else
                {
                    setPosicaoJogador(i,jogador);
                    objEstado.matrizTabuleiro[posI][posJ] = jogadorAtual;
                    jogadorAtual = -1;
                }
                break;
            }
        }
    
    }
    
    //Verificar se o usuario clicou na coluna 5
    else if(id == 6 || id == 12 || id == 18 || id == 24 || id == 30 || id == 36)
    {
        for (let i = 36; i > 0; i = i - 6) 
        {
            var j = i.toString();
            if(document.getElementById(j).textContent == "")
            {
                let posI = calculaPosicao(j)[0];
                let posJ = calculaPosicao(j)[1];
                
                if(jogadorAtual == -1)
                {
                    setPosicaoJogador(i,jogadorAtual); // coloca o jogador no tabuleiro
                    objEstado.matrizTabuleiro[posI][posJ] = jogadorAtual;
                    let e = objEstado.clonar();
                    let ia = new MiniMax(e);
                    jogadorAtual = 1;
                    let m = ia.melhorJogada();
                    objEstado.realizarJogada(jogadorAtual,m[0],m[1]);
                    let calculaId = (m[0]*(objEstado.matrizTabuleiro.length)) + (m[1] + 1);
                    setPosicaoJogador(calculaId,jogadorAtual);
                    jogadorAtual = -1;

                }
                else
                {
                    setPosicaoJogador(i,jogador);
                    objEstado.matrizTabuleiro[posI][posJ] = jogadorAtual;
                    jogadorAtual = -1;
                }
                break;
            }
        }
    }
 })
 
 // Função para setar a posição da peça e salvar no webstoraged
 function setPosicaoJogador(id, jogador) {
    localStorage.setItem("id", id);
    if(jogador == -1){
        $('#'+id).text('.');
        // console.log("id"+id)
        document.getElementById(id).style.backgroundColor = '#21409a';
        localStorage.setItem("jogador", 'X');
    }else {
        $('#'+id).text('.');
        document.getElementById(id).style.backgroundColor = '#da3a2a';
       localStorage.setItem("jogador", 'O');
    }
 }
 
 // Função para retornar o ID do jogador que havia sido selecionado anteriormente
 function getPosicaoID() {
   return localStorage.getItem("id");
 }
 
 // Função para o retorno do jogador selecionado anteriormente
 function getJogador() {
   return localStorage.getItem('jogador');
 }
 
 // Função para limpar todos os dados 
 function limparDados() {
   localStorage.clear();
 }

 //Funcao que calcula a posicao i, j de um determinado id
function calculaPosicao(id){
    i = Math.trunc((id - 1) / 6);
    j = (id - 1) % 6;
    posId = [];
    posId.push(i);
    posId.push(j);
    return posId;
}

