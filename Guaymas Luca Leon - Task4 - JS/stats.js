let URI = "https://amazing-events.herokuapp.com/api/events"
let tabla1 = document.getElementById("tabla1")
let tabla2 = document.getElementById("tabla2")
let tabla3 = document.getElementById("tabla3")

// variables de primera tabla

let eventos = []
let tabla1MayAsis;
let tabla1MenAsis;
let tabla1Cap;

// variables de segunda tabla

let arraycategoriasPas = []
let arrayCategoriasUp = []
let categorias = []
let eventosPast = []
let eventosUp = []

traerDatos(URI)

function traerDatos(url){
    fetch(url)
    .then(response=> response.json())
    .then(data=> {
     eventos = data.events      
      fecha = data.currenDate
      // primera tabla    
      eventosPast = eventos.filter(evento => evento.assistance) 
      eventosUp = eventos.filter(evento => evento.estimate)
      console.log(eventosUp)
      console.log(eventosPast)
      tabla1MayAsis = porcMayAsis(eventosPast)
      tabla1MenAsis = porcMenAsis(eventosPast)

      tabla1Cap = mayCap(eventos)
      
      pintarTabla1()
      // segunda tabla

      eventos.forEach(evento => {
        categorias.push(evento)
if(!categorias.includes(evento.category)){
            categorias.push(evento.category)
        }
        

        if(evento.date < data.currentDate) {
          if(!arraycategoriasPas.includes(evento.category)) {
            arraycategoriasPas.push(evento.category)
          }

      }
    
      if (evento.date >= data.currentDate) {
          if(!arrayCategoriasUp.includes(evento.category)) {
              arrayCategoriasUp.push(evento.category)
          }
      }
      
    })
  
    
  let objetoDeCategoriasPas = filtroCategoria(eventosPast, arraycategoriasPas)
  let objetoDeCategoriasUp = filtroCategoria(eventosUp, arrayCategoriasUp)
  pintarTabla (objetoDeCategoriasUp, tabla2)
  pintarTabla (objetoDeCategoriasPas, tabla3)
    })
  
  // .catch(error => console.log(error.message))

  
  }

  // CALCULOS DE PRIMERA TABLA
  


  function porcMayAsis(eventos) {
   let mayAsis = eventos.sort((a, b) => { 
      
    return (
        (parseInt(b.assistance)*100)/parseInt(b.capacity)-(parseInt(a.assistance)*100)/parseInt(a.capacity)
   )})
      
      return mayAsis[0].name
     
  }

  function porcMenAsis(eventos) {
   mayAsis = eventos.sort((a, b) => { 
      return (
        (parseInt(b.assistance)*100)/parseInt(b.capacity)-(parseInt(a.assistance)*100)/parseInt(a.capacity)
      )
    })
   
      return mayAsis[mayAsis.length-1].name
  }

  function mayCap(eventos) {
   let mayCapacidad = eventos.sort((a, b) => b.capacity-a.capacity)
   
    return mayCapacidad[0].name
  }

  // PINTAR PRIMERA TABLA

  function pintarTabla1() {
    let tabla11 = document.createElement("tr")
    
    tabla11.innerHTML = `<td>${tabla1MayAsis}</td>
    <td>${tabla1MenAsis}</td>
    <td>${tabla1Cap}</td>`
    tabla1.appendChild(tabla11)
  }

// DATOS PARA TABLA

function filtroCategoria(arrayEventos, arrayCategorias) {
  let revenues = []
let percentages = []
  arrayCategorias.forEach(categoria => {
  let eventosPorCategoria = arrayEventos.filter(evento => evento.category == categoria)
  revenues.push(eventosPorCategoria.map(evento => evento.price *(evento.assistance? evento.assistance : evento.estimate)).reduce((sumaPrecios, precio) => sumaPrecios+precio))
 
  percentages.push(eventosPorCategoria.map(evento => (evento.assistance? evento.assistance / evento.capacity : evento.estimate / evento.capacity)*100).reduce((sumaPorcentajes, porcentage) => sumaPorcentajes+porcentage)/eventosPorCategoria.length)
  }) 
return {
    arrayCategorias: arrayCategorias,
    revenues: revenues,
    percentages: percentages
}
}



  // PINTAR TABLA

  function pintarTabla(objeto, contenedorTabla) {
    objeto.arrayCategorias.forEach((categoria, i) => {
      let tabla = document.createElement("tr")
      tabla.innerHTML = `<td>${categoria}</td>
      <td>$${objeto.revenues[i].toLocaleString()}</td>
      <td>${objeto.percentages[i].toFixed(2)}%</td>
      `
contenedorTabla.appendChild(tabla)

    }      
      )
     
    
    
    
  }

