//Pega o id da div onde será adicionado o evento de click
var escolherNivel = document.getElementById('escolheNivel');
var nivelEscolhido;
var mudaPagina;
escolherNivel.addEventListener('click', function(e) {
    if(e.target.id == 'facil'){
        nivelEscolhido = 3;
    }else if(e.target.id == 'medio'){
        nivelEscolhido = 2;
    }else if(e.target.id == 'dificil'){
        nivelEscolhido = 1;
    }
});

window.addEventListener("load", function(){

    $('#jogar').click(function(){

        if(nivelEscolhido == null){
            alert("Você não selecionou o nivel de dificuldade a ser jogado!!!!!")
        }else{
            if(nivelEscolhido == 3){
                localStorage.setItem("nivel",nivelEscolhido);
                window.open('tabuleiro.html','janela');
            }else if(nivelEscolhido == 2){
                localStorage.setItem("nivel",nivelEscolhido);
                window.open('tabuleiro.html','janela');
            }else if(nivelEscolhido == 1){
                localStorage.setItem("nivel",nivelEscolhido);
                window.open('tabuleiro.html','janela');
            }
        }

        

    });

});