let mensagensChat = [];
let nick;

Usuario()
function Usuario(){
    nome = prompt("Qual o seu nome?");
    nick = {name: nome}
   
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',nick);
    promessa.then(usuarioOK);
    promessa.catch(falhaUsuario);
}

function falhaUsuario(error){

    if(error){
        alert('Nome de usuário em uso, escolha outro.');
        Usuario();
    }
}
function usuarioOK(){
    entrarNaSala();
}
function entrarNaSala(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(mostrarMensagem);
    promessa.catch();
}
function mostrarMensagem(resposta){

    mensagensChat = resposta.data
    console.log(mensagensChat)

     const ul = document.querySelector('.mensagens');
      
    ul.innerHTML = '';

    for(let i = 0; i < mensagensChat.length; i++){

        ul.innerHTML = ul.innerHTML + `
            <li>
            (${mensagensChat[i].time}) <strong> ${mensagensChat[i].from}</strong>  para  <strong> ${mensagensChat[i].to}</strong>: ${mensagensChat[i].text}
            </li>
        `;
    }


} 

function processarParticipantes(resposta) {
    participantes = resposta.data;
  
    const todos = { name: "Todos" };
    participantes.unshift(todos);
  
    renderizarParticipantes();
  }

function carregarParticipantes() {
    const requisicao = axios.get(path+"/participants", {
      headers: {
        User: nome
      }
    });
    requisicao.then(processarParticipantes);
  }

function setAttParticipantes() {
    setInterval(carregarParticipantes, 10000);
  }
