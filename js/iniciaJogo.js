//Pega o id da div onde será adicionado o evento de click
var escolherNivel = document.getElementById('escolheNivel');
var nivelEscolhido;
var mudaPagina;
escolherNivel.addEventListener('click', function(e) {
    if(e.target.id == 'facil'){
        nivelEscolhido = 2;
    }else if(e.target.id == 'medio'){
        nivelEscolhido = 4;
    }else if(e.target.id == 'dificil'){
        nivelEscolhido = 6;
    }
});

window.addEventListener("load", function(){

    $('#jogar').click(function(){

        if(nivelEscolhido == null){
            alert("Você não selecionou o nivel de dificuldade a ser jogado!!!!!")
        }else{
            if(nivelEscolhido == 6){
                localStorage.setItem("dificuldade",nivelEscolhido);
                window.location.href = "tabuleiro.html";
                // window.location('tabuleiro.html','janela');
            }else if(nivelEscolhido == 4){
                localStorage.setItem("dificuldade",nivelEscolhido);
                window.location.href = "tabuleiro.html";
                // window.open('tabuleiro.html','janela');
            }else if(nivelEscolhido == 2){
                localStorage.setItem("dificuldade",nivelEscolhido);
                window.location.href = "tabuleiro.html";
                // window.open('tabuleiro.html','janela');
            }
        }
    });

});