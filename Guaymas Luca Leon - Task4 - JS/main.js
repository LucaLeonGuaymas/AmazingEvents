let URI = "https://amazing-events.herokuapp.com/api/events"
const divCards = document.getElementById("cards-container")
const inputSerch = document.getElementById("search")
const checkContainer = document.getElementById("checks")
let eventos = []
let categorias = []

inputSerch.addEventListener('input',superFiltro)

checkContainer.addEventListener('change',superFiltro)

traerDatos(URI)


function pintarCards(arrayEventos){
  divCards.innerHTML = ""
  if(arrayEventos.length == 0){
    divCards.innerHTML = `<p class="display-1 bolder text-danger">NO SE ENCONTRARON RESULTADOS</P>`
  }
  arrayEventos.forEach(evento => {
    let card = document.createElement("div")
    card.className="col"
    card.innerHTML = `<div class="card h-100">
    <img src=${evento.image} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${evento.name}</h5>
      <h6 class="card-title">${evento.category}</h6>
      <p class="card-text">${evento.description}</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">
        <div class="d-flex mb-3">
          <div class="me-auto p-2">More info</div>
          <div class="p-2"><button type="button" class="btn btn-outline-warning"><a class="text-black"
                href="details.html?id=${evento._id}">More Info</a></button> </div>
                        </div>
      </small>
    </div>
  </div>`
  divCards.appendChild(card)    
  });
}

function traerDatos(url){
  fetch(url)
  .then(response=> response.json())
  .then(data=> {
    eventos = data.events
    if(document.title=="Home"){
      eventos = data.events
    }else if(document.title=="Upcoming Events"){
      eventos = eventos.filter(
        (evento) => evento.date >= data.currentDate
      )
    }else{
      eventos = eventos.filter(
        (evento) => evento.date < data.currentDate
      )
    }
    pintarCards(eventos)
    inputSerch.value = ''
      eventos.forEach(evento =>{
      if(!categorias.includes(evento.category)){
        categorias.push(evento.category)
      }
    })
    crearChecks(categorias)
    
  })
.catch(error => console.log(error.message))
}


function filtrarPorNombre(arrayEventos){
  let texto = inputSerch.value
  let arrayFiltrado = arrayEventos.filter(evento => evento.name.toLowerCase().includes(texto.toLowerCase()))
  return arrayFiltrado
}

function filtrarPorCategoria(eventos){
 
  let inputCheck = document.querySelectorAll("input[type='checkbox']")
  let arrayChecks = Array.from(inputCheck)
  let checkPut = arrayChecks.filter(inputCheck => inputCheck.checked)
  let arrayValues = checkPut.map(check => check.value)
  let filtro =[]
  eventos.filter(evento => {
    arrayValues.forEach(value =>{
      if(evento.category.includes(value)){
         filtro.push(evento)
        
      }
    })
  })
  if(filtro.length == 0){
    return eventos
  }

  return filtro
}

function superFiltro(){
  let primerFiltro = filtrarPorCategoria(eventos)
  let segundoFiltro = filtrarPorNombre(primerFiltro)
  
  
  pintarCards(segundoFiltro)
}

function crearChecks(array){
  checkContainer.innerHTML = ""
  array.forEach(elemento => {
  let div = document.createElement("div")
    div.className="form-check form-check-inline"
    div.innerHTML = `<input class="form-check-input" type="checkbox" id="${elemento}" value="${elemento}">
    <label class="form-check-label" for="${elemento}">${elemento}</label>`
   checkContainer.appendChild(div)
  })
}



