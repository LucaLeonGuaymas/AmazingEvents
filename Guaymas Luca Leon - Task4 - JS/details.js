let cadenaParametrosUrl = location.search
let parametros = new URLSearchParams(cadenaParametrosUrl)
let id = parametros.get('id')
let contenedor = document.getElementById('contenedor')
let URI = "https://amazing-events.herokuapp.com/api/events"

traerDatos(URI)

  function pintarCard(evento){
    contenedor.innerHTML = ""   
      let div = document.createElement("div")
      div.className="card mb-3" 
      div.style.marginTop = "1rem" 
      div.style.maxWidth = "540px"
      div.innerHTML = `<div class="row g-0" >
        <div class="col-md-4">
          <img src="${evento.image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${evento.name}</h5>
            <p class="card-text">${evento.description}</p>
            <p class="card-text"><small class="text-muted">${evento.date}</small></p>
          </div>
        </div>
      </div>`
    contenedor.appendChild(div)    
   }





  function traerDatos(url){
    fetch(url)
    .then(response=> response.json())
    .then(data => {
      let eventos = data.events
      let eventoEncontrado = eventos.find(evento => evento._id == id)

      pintarCard(eventoEncontrado)})

  }






