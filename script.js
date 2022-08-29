let mensagens = [];
let nick;
let tipoMensagem = "message";
let buscarMensagens = true;

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


function entrarNaSala() {
  carregarMensagens();
  
  AtualizacaoDeMensagens();
  AtualizacaoDeStatus();
}

function carregarMensagens() {
  if (!buscarMensagens) return;

  const promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
  promisse.then(processarMensagens);
}


function AtualizacaoDeMensagens() {
  setInterval(carregarMensagens, 3000);
}

function AtualizacaoDeStatus() {
  setInterval(atualizarStatus, 5000);
}

function atualizarStatus() {
  const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status');
}

function processarMensagens(resposta) {
  mensagens = [];

  for (let i = 0; i < resposta.data.length; i++) {
    const mensagem = resposta.data[i];
    mensagens.push(mensagem);
  }

  renderizarMensagens();
}

let message


const classesMensagens = {
    status: 'entrada-saida',
    message: 'conversa-publica'
};

function renderizarMensagens() {
  const ul = document.querySelector(".mensagens-container");
  let html = "";

  for (let i = 0; i < mensagens.length; i++) {
    const mensagem = mensagens[i];
    if(mensagens[i].type === "message"){ 
      ul.innerHTML = ul.innerHTML +`
      <li class="'conversa-publica ${classesMensagens[mensagem.type]}">
        <div class="conteudo-mensagem">
        <span class="horario">(${mensagem.time})</span>
          <span><strong>${mensagem.from}</strong></span>
            <span> para </span>
          <strong>${mensagem.to}</strong>:
          <span class="text">${mensagem.text}</span>
        </div>
      </li>
    `;
  }
  if(mensagens[i].type === "status"){ 
    ul.innerHTML = ul.innerHTML +`
    <li class="entrada-saida ${classesMensagens[mensagem.type]}">
      <div class="conteudo-mensagem">
      <span class="horario">(${mensagem.time})</span>
        <span><strong>${mensagem.from}</strong></span>
        <span class="text">${mensagem.text}</span>
      </div>
    </li>
  `;
}

  }
  setTimeout(() => document.querySelector(".mensagens-container li:last-child").scrollIntoView(), 0);
}

function enviarMensagem(){
  const msg = document.querySelector(".input-mensagem").value;
  const objetoMsg = {
      from: nome,
      to: "Todos",
      text: msg,
      type: "message"
  }

  const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", objetoMsg);

  promessa.then(()=>{carregarMensagens()});
  promessa.catch(()=>{window.location.reload()});

}