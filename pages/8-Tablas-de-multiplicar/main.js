const contenedor = document.getElementById('contenedor-tablas')

for (let i = 1; i <= 10; i++){
    let tabla = document.createElement('div');
    tabla.className = 'Tabla';
    tabla.innerHTML = `<h2>Tabla del ${i}</h2>`

    for (let j = 1; j <= 30; j++){
        tabla.innerHTML += `${i} x ${j} = ${i * j} <br>`;
    }

    contenedor.appendChild(tabla);
}