/* const { application, json } = require("express")
 */

const sectionSeleccionarAtaque = document.getElementById ("seleccionar-ataque")
const sectionReiniciarPartida = document.getElementById ("reiniciar-juego") 
const botonMascotaJugador = document.getElementById("boton-seleccionarmascota")

sectionReiniciarPartida.style.display = "none"

const botonReiniciar = document.getElementById("boton-reiniciarpartida")

const sectionSeleccionarMascota = document.getElementById ("seleccionar-mascota")

const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaOponente = document.getElementById("mascota-oponente")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasOponente = document.getElementById("vidas-oponente")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador") 
const ataquesDelOponente = document.getElementById("ataques-del-oponente")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")

const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let oponenteId = null
let dragones = []
let dragonesOponentes = []
let ataqueJugador = []
let ataqueOponente = []
let opcionDeDragones
let inputHidrocap
let inputGeoter 
let inputDraganis
let inputMarleon
let inputBarreon
let inputVulcano
let inputFreezer
let mascotaJugador
let mascotaJugadorObjeto
let ataquesDragon
let ataquesDragonOponente
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueOponente
let victoriasJugador = 0
let victoriasOponente = 0
let vidasJugador = 3 
let vidasOponente = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './mascotas/mapa2.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 600

if (anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 50
}

alturaQueBuscamos = anchoDelMapa * 400 / 500


mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos



class Dragon {
    constructor (nombre, foto, vida, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image ()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarDragon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
            )
    }
}

let Hidrocap = new Dragon ('Hidrocap', './mascotas/hidrocap.png', 5, )

let Geoter = new Dragon ('Geoter', './mascotas/geoter.png', 5)

let Draganis = new Dragon ('Draganis', './mascotas/draganis.png', 5)

let Marleon = new Dragon ('Marleón', './mascotas/marleon.png', 5)

let Barreon = new Dragon ('Barreón', './mascotas/barreon.png', 5)

let Vulcano = new Dragon ('Vulcano', './mascotas/vulcano.png', 5)

let Freezer = new Dragon ('Freezer', './mascotas/freezer.png', 5)

const HIDROCAP_ATAQUES = [
    {nombre: '💦', id:'boton-agua'},
    {nombre: '💦', id:'boton-agua'},
    {nombre: '💦', id:'boton-agua'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🌱', id:'boton-tierra'},
]

Hidrocap.ataques.push(...HIDROCAP_ATAQUES)

const GEOTER_ATAQUES = [
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '💦', id:'boton-agua'},
    {nombre: '💦', id:'boton-agua'},
]

Geoter.ataques.push(...GEOTER_ATAQUES)

const DRAGANIS_ATAQUES = [
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🌱', id:'boton-tierra'},
]

Draganis.ataques.push(...DRAGANIS_ATAQUES)

const MARLEON_ATAQUES = [
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '💦', id:'boton-agua'},
    {nombre: '💦', id:'boton-agua'},
    {nombre: '🌱', id:'boton-tierra'},
]

Marleon.ataques.push(...MARLEON_ATAQUES)

const BARREON_ATAQUES = [
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '💦', id:'boton-agua'},
    {nombre: '💦', id:'boton-agua'},
    {nombre: '🌱', id:'boton-tierra'},
]

Barreon.ataques.push(...BARREON_ATAQUES)

const VULCANO_ATAQUES = [
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '💦', id:'boton-agua'},
]

Vulcano.ataques.push(...VULCANO_ATAQUES)

const FREEZER_ATAQUES = [
    {nombre: '💦', id:'boton-agua'},
    {nombre: '💦', id:'boton-agua'},
    {nombre: '💦', id:'boton-agua'},
    {nombre: '💦', id:'boton-agua'},
    {nombre: '💦', id:'boton-agua'},
]

Freezer.ataques.push(...FREEZER_ATAQUES)

dragones.push(Hidrocap,Geoter,Draganis,Marleon,Barreon,Vulcano,Freezer);


function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"
    
    dragones.forEach((dragon) => {
        opcionDeDragones = `
        <input type= "radio" name="mascota" id=${dragon.nombre} />
        <label class = "tarjeta-de-mokepon" for=${dragon.nombre}> 
            <p>${dragon.nombre}</p> 
            <img src=${dragon.foto} alt=${dragon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeDragones

        inputHidrocap = document.getElementById("Hidrocap")
        inputGeoter = document.getElementById("Geoter")
        inputDraganis = document.getElementById("Draganis")
        inputMarleon = document.getElementById("Marleón")
        inputBarreon = document.getElementById("Barreón")
        inputVulcano = document.getElementById("Vulcano")
        inputFreezer = document.getElementById("Freezer")
    })

    
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

        
    botonReiniciar.addEventListener("click", reiniciarPartida)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("https://kserranoo.github.io/public:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() { 

       if (inputHidrocap.checked) {
        spanMascotaJugador.innerHTML = inputHidrocap.id
        mascotaJugador = inputHidrocap.id
       }
       else if (inputGeoter.checked) {
        spanMascotaJugador.innerHTML = inputGeoter.id
        mascotaJugador =inputGeoter.id
        }
       else if (inputDraganis.checked) {
        spanMascotaJugador.innerHTML = inputDraganis.id
        mascotaJugador = inputDraganis.id
        }
       else if (inputMarleon.checked) {
        spanMascotaJugador.innerHTML = inputMarleon.id
        mascotaJugador = inputMarleon.id
        }
        else if (inputBarreon.checked) {
        spanMascotaJugador.innerHTML = inputBarreon.id
        mascotaJugador = inputBarreon.id
        }
       else if (inputVulcano.checked) {
        spanMascotaJugador.innerHTML = inputVulcano.id
        mascotaJugador = inputVulcano.id
        }
       else if (inputFreezer.checked) {
        spanMascotaJugador.innerHTML = inputFreezer.id
        mascotaJugador = inputFreezer.id
       }
        else {
            alert("Error: vuelve a seleccionar")
            return
        }

        sectionSeleccionarMascota.style.display = "none"

        seleccionarDragon(mascotaJugador)

        extraerAtaques(mascotaJugador)
        sectionVerMapa.style.display = "flex"
        iniciarMapa()            
}

function seleccionarDragon(mascotaJugador) {
    fetch(`http://192.168.1.7:8080/dragon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            dragon: mascotaJugador
        })
    })
}


function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < dragones.length; i++) {
        if (mascotaJugador === dragones[i].nombre) {
            ataques = dragones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques (ataques) {
    ataques.forEach((ataque) => {
        ataquesDragon = `
        <button id=${ataque.id} class= "botones-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesDragon

    })
    
    botonAgua =  document.getElementById("boton-agua")
    botonTierra =  document.getElementById("boton-tierra")
    botonFuego = document.getElementById("boton-fuego")
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click',(e)=>{
            if (e.target.textContent ==='🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#FFB6C1'
                boton.disabled = true           
            }
            else if (e.target.textContent === '💦') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#FFB6C1'
                boton.disabled = true   
            }
            else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#FFB6C1'
                boton.disabled = true   
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
   
}

function enviarAtaques() {
    fetch(`http://192.168.1.7:8080/dragon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            ataques : ataqueJugador
        })
   
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.1.7:8080/dragon/${oponenteId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ataques}) {
                        if (ataques.length === 5) {
                            ataqueOponente = ataques
                            combate()
                        }
                    })
            }
        })
}


function seleccionarMascotaOponente(oponente) {
    spanMascotaOponente.innerHTML = oponente.nombre
    ataquesDragonOponente= oponente.ataques
    secuenciaAtaque()
}

function ataqueAleatorioOponente () {
    console.log('Ataques enemigo', ataquesDragonOponente);
    let ataqueAleatorio = aleatorio(0, ataquesDragonOponente.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) 
        ataqueOponente.push('FUEGO')
    
    else if (ataqueAleatorio == 3 || ataqueAleatorio == 4)
        ataqueOponente.push('AGUA')
    else {
        ataqueOponente.push('TIERRA')
    }
    console.log(ataqueOponente)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, oponente) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueOponente = ataqueOponente[oponente]
}

function combate(){
    clearInterval(intervalo)

    for (let index = 0; index <ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueOponente[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje(" EMPATE 😒")
        }
        else if (ataqueJugador[index] === 'AGUA' && ataqueOponente[index] === 'FUEGO') {
            indexAmbosOponentes(index, index)
            crearMensaje(" GANASTE 🥳")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[index] === 'TIERRA' && ataqueOponente[index] === 'FUEGO') {
            indexAmbosOponentes(index, index)
            crearMensaje(" GANASTE 🥳")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[index] === 'AGUA' && ataqueOponente[index] === 'TIERRA') {
            indexAmbosOponentes(index, index)
            crearMensaje(" GANASTE 🥳")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }
        else {
            indexAmbosOponentes(index, index)
            crearMensaje(" PERDISTE 💀")
            victoriasOponente++
            spanVidasOponente.innerHTML = victoriasOponente
        }
    }

    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador == victoriasOponente) {
        crearMensajeFinal ("EMPATASTE LA PARTIDA 🤝🏽 ")
    }
    else if (victoriasJugador > victoriasOponente) {
        crearMensajeFinal ("GANASTE LA PARTIDA 🎉🎊")
    }
    else {
        crearMensajeFinal ("PERDISTE LA PARTIDA 💀")
    }
}

function crearMensaje (resultado) {  
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelOponente = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelOponente.innerHTML = indexAtaqueOponente

       
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelOponente.appendChild(nuevoAtaqueDelOponente)


} 

function crearMensajeFinal (resultadoFinal) 
    { 
        sectionMensajes.innerHTML=resultadoFinal
        sectionReiniciarPartida.style.display='block'
    }
    
function reiniciarPartida () {
        location.reload();
    }

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
 }

 function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarDragon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    dragonesOponentes.forEach(function (dragon){
        dragon.pintarDragon()
        revisarColision(dragon)
    })
 }

 function enviarPosicion(x, y){
    fetch(`http://192.168.1.7:8080/dragon/${jugadorId}/posicion`, {
       method: "post",
       headers: {
            "Content-Type": "application/json"
       },
       body: JSON.stringify({
            x,
            y
       }) 
    })
    .then(function (res) {
        if (res.ok) {
            res.json() 
                .then(function({ oponentes }) {
                    console.log(oponentes)
                    dragonesOponentes = oponentes.map(function (oponente) {
                        let dragonOponente = null
                        const dragonNombre = oponente.dragon.nombre || ""

                        if(dragonNombre === "Hidrocap") {
                            dragonOponente = new Dragon ('Hidrocap', './mascotas/hidrocap.png', 5, oponente.id)

                        } else if (dragonNombre === "Geoter") {
                            dragonOponente = new Dragon ('Geoter', './mascotas/geoter.png', 5, oponente.id)

                        } else if (dragonNombre === "Draganis") {
                            dragonOponente = new Dragon ('Draganis', './mascotas/draganis.png', 5, oponente.id)

                        } else if (dragonNombre === "Marleón") {
                            dragonOponente = new Dragon ('Marleón', './mascotas/marleon.png', 5, oponente.id)

                        } else if (dragonNombre === "Barreón ") {
                            dragonOponente = new Dragon ('Barreón', './mascotas/barreon.png', 5, oponente.id)

                        } else if (dragonNombre === "Vulcano") {
                            dragonOponente = new Dragon ('Vulcano', './mascotas/vulcano.png', 5, oponente.id)

                        } else if (dragonNombre === "Freezer") {
                            dragonOponente = new Dragon ('Freezer', './mascotas/freezer.png', 5, oponente.id)
                        } 

                        dragonOponente.x = oponente.x
                        dragonOponente.y = oponente.y
                        
                        return dragonOponente

                    })
                })
            }
        }) 
 }

 function moverD() {
    mascotaJugadorObjeto.velocidadX = 5
 }

 function moverI() {
    mascotaJugadorObjeto.velocidadX = -5
 }

 function moverArr() {
    mascotaJugadorObjeto.velocidadY = -5
 }

 function moverAb() {
    mascotaJugadorObjeto.velocidadY = 5
 }

 function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
 }

 function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArr()
            break
        case 'ArrowDown':
            moverAb()
            break
        case 'ArrowLeft':
            moverI()
            break
        case 'ArrowRight':
            moverD()
            break
        default:
            break
    }
 }
function iniciarMapa(){
    /* mapa.width = 640
    mapa.height = 480 */

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)
    
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < dragones.length; i++) {
        if (mascotaJugador === dragones [i].nombre) {
            return dragones[i]
        }
        
    }
}

function revisarColision(oponente) {
const arribaOponente = oponente.y
const abajoOponente = oponente.y + oponente.alto
const derechaOponente = oponente.x + oponente.ancho
const izquierdaOponente = oponente.x

const arribaMascota = 
    mascotaJugadorObjeto.y
const abajoMascota = 
    mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
const derechaMascota = 
    mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
const izquierdaMascota = 
    mascotaJugadorObjeto.x

    if (
        abajoMascota < arribaOponente ||
        arribaMascota > abajoOponente ||
        derechaMascota < izquierdaOponente ||
        izquierdaMascota > derechaOponente
    ) {
        return 
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log('se detecto una colision');

    oponenteId = oponente.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaOponente(oponente)
}

window.addEventListener("load", iniciarJuego)