let listaDeNumSorteados = [];
let numLimite = 49;
let numeroSecreto = numeroAleatorio();
let tentativas = 1;

function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female' , {rate:1.2});
}
function exibirMensagemInicial(){
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', 'Escolha um número entre 1 e 49')
}
exibirMensagemInicial();

function verificarChute(){
    let chute = parseInt(document.querySelector('input').value);
    console.log(chute == numeroSecreto);
    
    if (chute == numeroSecreto){
        exibirTexto('h1','Acertou!');
        let mensagemTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${mensagemTentativa}`;
        exibirTexto('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else{
        if(chute > numeroSecreto){
            exibirTexto('p','O número secreto é menor');
        }
        else{
            exibirTexto('p', 'O número secreto é maior');
        }
    }
    tentativas++;
    limparCampo();
}

function numeroAleatorio(){
    let numEscolhido = parseInt(Math.random() * numLimite + 1);
    let quantidadeElementosNaLista = listaDeNumSorteados.length;

    if(quantidadeElementosNaLista== numLimite){
        listaDeNumSorteados = [];
    }
    
    if (listaDeNumSorteados.includes(numEscolhido)){
        return numeroAleatorio();
    }
    else{
        listaDeNumSorteados.push(numEscolhido);
        console.log(listaDeNumSorteados);
        return numEscolhido;
    }
}

function limparCampo(){
    let chute = document.querySelector('input')
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = numeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}