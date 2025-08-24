window.addEventListener('load', IniciarJuego)

//Mascota
    let animalEmojis = [
        { name: "Hipodoge", emoji: "🐘" },
        { name: "Capipepo", emoji: "🦔" },
        { name: "Ratigueya", emoji: "🦝" }
    ];

//Ataques
    let attaquesEmojis = [
        { name: "Fuego", emoji: "🔥" },
        { name: "Agua", emoji: "💧" },
        { name: "Tierra", emoji: "🌱" }
    ]

//Vidas
    let vidasJugador = ["🤍","🤍","🤍"]
    let vidasEnemigo = ["🖤","🖤","🖤"]

//Mascotas Seleccionadas
    let nameAnimalSeleccionado = "";
    let nameAnimalSeleccionadoEnemigo = "";
    let emojiAnimalSeleccionado = "";
    let emojiAnimalSeleccionadoEnemigo = "";

//Variables
function IniciarJuego(){
    let sectionSeleccionarAtaque = document.getElementById("seleccionar_ataque");
    sectionSeleccionarAtaque.style.display = 'none'

    let btnSelect = document.getElementById("btn-seleccion")
    btnSelect.addEventListener("click",seleccionJugador)

    let btnReset = document.getElementById('btn-reset')
    btnReset.style.display = "none";
    btnReset.addEventListener("click", reiniciarJuego)

    let btnFuego = document.getElementById("btn-fuego") 
    btnFuego.addEventListener("click", Ataque)

    let btnAgua = document.getElementById("btn-agua")
    btnAgua.addEventListener("click", Ataque)

    let btnTierra = document.getElementById("btn-tierra")
    btnTierra.addEventListener("click", Ataque)
}

//Mascota del Jugador
function seleccionJugador(){
    numSelect = 0
    if(document.getElementById("hipodoge").checked){
        numSelect = 1
    }else if(document.getElementById("capipepo").checked){
        numSelect = 2
    }else if(document.getElementById("ratigueya").checked){
        numSelect = 3
    }else{
        alert("Debes seleccionar una mascota");
    }

    let spanNameAnimal = document.getElementById("name-player");

    nameAnimalSeleccionado = animalEmojis[numSelect - 1].emoji + animalEmojis[numSelect - 1].name;
    emojiAnimalSeleccionado = animalEmojis[numSelect - 1].emoji;
    spanNameAnimal.innerHTML = `Jugador: ${nameAnimalSeleccionado}`;

    let sectionElegirMascota = document.getElementById('seleccionar_mascota');
    sectionElegirMascota.style.display="none";

    seleccionEnemigo();
}

let ataqueJugador =  ""

function Ataque(e){
    let btn = e.currentTarget;
    ataqueJugador = btn.textContent;
    // console.log(`${attackPlayer}`);

    seleccionAtaqueEnemigo();
    resultadoCombate();
    mensaje();
    LiveStatus();
    reviewlives();
}

//Mascota del Enemigo
function seleccionEnemigo(){
    let numRandom = getRandom(1,3);
    let spanNameAnimalEnemy = document.getElementById("name-enemy");

    nameAnimalSeleccionadoEnemigo = animalEmojis[numRandom - 1].emoji + animalEmojis[numRandom - 1].name;
    emojiAnimalSeleccionadoEnemigo = animalEmojis[numRandom - 1].emoji;

    spanNameAnimalEnemy.innerHTML = `Enemigo: ${nameAnimalSeleccionadoEnemigo}`

    let sectionSeleccionarAtaque = document.getElementById("seleccionar_ataque");
    let boxInfoPelea = document.getElementById("mensajes");
    sectionSeleccionarAtaque.style.display = 'flex';
    boxInfoPelea.style.display = 'flex'
}

//Ataque del Enemigo
let ataqueEnemigo = "";

function seleccionAtaqueEnemigo(){
    let numRandom = getRandom(1,3);
    ataqueEnemigo = attaquesEmojis[numRandom - 1].name + attaquesEmojis[numRandom -1 ].emoji;
}

//Combate
let combateStatus = ""

// agua > fuego  -  fuego > tierra  -  tiera > agua
function resultadoCombate(){
    if(ataqueJugador == ataqueEnemigo){
        combateStatus = "EMPATE ⭕"
    }else if(ataqueJugador == "Fuego🔥" && ataqueEnemigo == "Tierra🌱"){
        combateStatus = "GANASTE ✅"
        vidasEnemigo.pop();
    }else if(ataqueJugador == "Agua💧" && ataqueEnemigo == "Fuego🔥"){
        combateStatus= "GANASTE ✅"
        vidasEnemigo.pop();
    }else if(ataqueJugador == "Tierra🌱" && ataqueEnemigo == "Agua💧"){
        combateStatus = "GANASTE ✅"
        vidasEnemigo.pop();
    }else{
        combateStatus = "PERDISTE ❌"
        vidasJugador.pop();
    }
}

//Recuento de Vidas
function LiveStatus(){
    let span_lives_player = document.getElementById("lives-player");
    let span_lives_enemy = document.getElementById("lives-enemy");

    span_lives_player.textContent = vidasJugador.toString().replace(/,/g, "");
    span_lives_enemy.textContent = vidasEnemigo.toString().replace(/,/g, "");
}

function reviewlives(){
    if (vidasEnemigo.length == 0){
        mensajeFinal("👾 Ganaste! 😁");
        disabledAttack();

    }else if(vidasJugador.length == 0){
        mensajeFinal("💔 Perdiste 😥");
        disabledAttack();
    }
}

function disabledAttack(){
    let btnFuego = document.getElementById("btn-fuego");
    let btnAgua = document.getElementById("btn-agua");
    let btnTierra = document.getElementById("btn-tierra");
    
    btnFuego.disabled = true;
    btnAgua.disabled = true;
    btnTierra.disabled = true;
}

//Ataques y resultados
function mensaje(){
    let newP = document.createElement("p");
    let secctionMessage = document.getElementById('mensajes');
    newP.innerHTML = `Jugador ${emojiAnimalSeleccionado}: ${ataqueJugador} - Enemigo ${emojiAnimalSeleccionadoEnemigo}: ${ataqueEnemigo} ➡ ${combateStatus}`;

    secctionMessage.appendChild(newP);
}

function mensajeFinal(texto){
    let newh = document.createElement("h2");
    let secctionMessage = document.getElementById('mensajes');
    newh.innerHTML = texto + ' Finalizo El Juego'
    secctionMessage.appendChild(newh);
    
    let btnReset = document.getElementById('btn-reset')
    btnReset.style.display = "block";
}

//Reload Game
function reiniciarJuego(){
    location.reload();
}

//Funcion Random
function getRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}


