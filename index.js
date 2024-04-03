let participantes = [
  {
    nome: 'Diego Fernandes',
    email: 'diegofernandes@gmail.com',
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckin: null
  },
  {
    nome: 'Maria Silva',
    email: 'mariasilva@gmail.com',
    dataInscricao: new Date(2024, 2, 23, 10, 30),
    dataCheckin: new Date(2024, 2, 25, 15, 45)
  },
  {
    nome: 'João Oliveira',
    email: 'joao.oliveira@hotmail.com',
    dataInscricao: new Date(2024, 2, 24, 14, 15),
    dataCheckin: null
  },
  {
    nome: 'Ana Santos',
    email: 'anasantos@yahoo.com',
    dataInscricao: new Date(2024, 2, 25, 8, 45),
    dataCheckin: new Date(2024, 2, 27, 11, 30)
  },
  {
    nome: 'Carlos Souza',
    email: 'carlossouza@gmail.com',
    dataInscricao: new Date(2024, 2, 26, 16, 10),
    dataCheckin: null
  },
  {
    nome: 'Juliana Lima',
    email: 'julianalima@gmail.com',
    dataInscricao: new Date(2024, 2, 27, 11, 20),
    dataCheckin: new Date(2024, 2, 29, 10, 15)
  },
  {
    nome: 'Fernando Costa',
    email: 'fernandocosta@hotmail.com',
    dataInscricao: new Date(2024, 2, 28, 9, 30),
    dataCheckin: new Date(2024, 2, 30, 16, 40)
  },
  {
    nome: 'Carolina Mendes',
    email: 'carolinamendes@yahoo.com',
    dataInscricao: new Date(2024, 2, 29, 13, 45),
    dataCheckin: new Date(2024, 3, 1, 8, 20)
  },
  {
    nome: 'Pedro Almeida',
    email: 'pedroalmeida@gmail.com',
    dataInscricao: new Date(2024, 2, 30, 18, 20),
    dataCheckin: new Date(2024, 3, 2, 10, 50)
  },
  {
    nome: 'Luiza Ferreira',
    email: 'luizaferreira@gmail.com',
    dataInscricao: new Date(2024, 2, 31, 12, 10),
    dataCheckin: null
  }
];


const criarNovoParticipante = (participantes) => {
  const dataInscricao = dayjs(Date.now()).to (participantes.dataInscricao)
  let dataCheckin = dayjs(Date.now()).to (participantes.dataCheckin)

  if(participantes.dataCheckin == null){
    dataCheckin = `
    <button data-email="${participantes.email}" onClick="FazerCheckIn(event)">Confirmar Check-In</button>
    `
  }
  return `
  <tr>
    <td>
      <strong>${participantes.nome}</strong>
      <br>
      <small>${participantes.email}</small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckin}</td>
  </tr>
  `
}

const atualizarLista = (participantes) =>{
  let output = ''
  for(participantes of participantes){
    output = output + criarNovoParticipante(participantes);
  }
  document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) =>{
  event.preventDefault()
  const dadosDoFormulariio = new FormData(event.target)
  const participante = {
    nome: dadosDoFormulariio.get('nome'),
    email: dadosDoFormulariio.get('email'),
    dataInscricao: new Date(),
    dataCheckin: null
  }

  const participanteJaExiste = participantes.find((p) => {
    return p.email == participante.email
  })
  if(participanteJaExiste){
    alert('Email já cadastrado')
    event.target.reset()
    return
  }


  participantes = [participante, ...participantes]
  atualizarLista(participantes);

  event.target.querySelector('[name="nome"]').value = ''
  event.target.querySelector('[name="email"]').value = ''
}

const FazerCheckIn = (event) =>{
  if(confirm('Você tem certeza que quer fazer o Check-In') == false){
    return
  }

  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  participante.dataCheckin = new Date()

  atualizarLista(participantes)



}