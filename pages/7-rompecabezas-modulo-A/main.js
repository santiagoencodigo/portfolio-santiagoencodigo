const piezas = [
    "00.png","01.png","02.png",
    "10.png","11.png","12.png",
    "20.png","21.png","22.png",
];

const desordenadas = [...piezas].sort(() => 0.5 - Math.random());
const panelIzquierdo = document.getElementById("panel-izquierdo");
const panelDerecho = document.getElementById("panel-derecho");
const mensaje = document.getElementById("mensaje-bien")


//Crear el contenedor izquierdo con las piezas
desordenadas.forEach((src, i) =>{
    const img = document.createElement("img");
    img.src = `./img/${src}`;
    img.classList.add("piezas");
    img.draggable = true;
    img.id = `pieza-${i}`;
    img.dataset.original = src;
    img.dataset.correcto = piezas.indexOf(src);

    img.addEventListener("dragstart", e =>{
        e.dataTransfer.setData("text/plain", img.id);
    });

    panelIzquierdo.appendChild(img);
});

//crear las zonas vacias en el panel derecho
for (let i = 0; i < piezas.length; i++){
    const zona = document.createElement("div");
    zona.classList.add("dropzone");
    zona.dataset.target = piezas[1];
    zona.dataset.index = i;

    zona.addEventListener("dragover", e => e.preventDefault());
    zona.addEventListener("drop", e =>{
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");
        const pieza = document.getElementById(id);

        if(!zona.hasChildNodes()){
            zona.appendChild(pieza);
            verificarOrden();
        }
    });
    panelDerecho.appendChild(zona);

    function verificarOrden(){
        const zonas = document.querySelectorAll("#panel-derecho .dropzone");
        for (let i = 0; i < zonas.length; i++){
            const pieza = zonas[i].querySelector("img");
            if(!pieza || parseInt(pieza.dataset.correcto) !== i){
                mensaje.style.display = "none"
                return;
            }
        }
        mensaje.style.display = "block";
    }
}