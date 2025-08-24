window.addEventListener("DOMContentLoaded", (e)=> {

  //Identificar los elementos con los que voy a trabajar
  let inventarioDom = document.querySelector(".main__inventario");
  let cajas = document.querySelectorAll(".inventario__caja");
  let estanteriaDom = document.querySelectorAll(".almacen__estanteria");

  // console.log(inventarioDom);
  // console.log(cajas);
  // console.log(estanteriaDom);

    //debo poner un id único en caja movible
    cajas.forEach((caja,i) => {
        caja.setAttribute("id","caja"+i);

        //necesito indicar que cada elemento es un elemento drag
        //osea que se puede mover
        
        caja.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("id", e.target.id)
        });
    });  

    //establecer cada lugar de la estanteria donde pudeo soltar el nuevo elemento
    estanteriaDom.forEach((estanteria, i) => {
        //bloquear el dragover
        estanteria.addEventListener("dragover", function(e){
            e.preventDefault();
        });

        estanteria.addEventListener("drop", function(e){
            e.preventDefault();

            //voy a conseguir los datos de la caja que voy a soltar
            let cajaId = e.dataTransfer.getData("id");

            console.log(cajaId);

            if(cajaId && cajaId != ""){
                let caja = document.querySelector("#"+cajaId);
                
                if(this.lastChild == null){
                    e.target.appendChild(caja)
                    this.style.boxShadow = "none";
                } else{
                    alert("Este lugar ya esta ocupado")
                }

                estanteriaDom.forEach(estanteria => {
                    if(estanteria.lastChild == null){
                        estanteria.style.boxShadow = "0px 0px 8px gray inset"
                    }
                })

                if(inventarioDom.innerHTML.trim() == ""){
                    alert("Todas las cajas han sido guardadas!")
                }
            }
        });
    });
});