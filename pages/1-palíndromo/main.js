const btn = document.querySelector('.btn');
const resultado = document.querySelector('.resultado');

btn.addEventListener('click', palindromo);

function palindromo(){

    //Tengo que definir variable que saca el input
    const word = document.querySelector('.word').value;

    if(word == "") {
        resultado.innerHTML = 'Debes enviar una palabra.';
    } else {
        const rep = word.replace(/[\w_]/g);
        const lower = rep.toLowerCase();
        const separar = lower.split("");
        const reverb = separar.reverse();
        const unir = reverb.join("");

        if(lower == unir){
            resultado.innerHTML = `La palabra "${word}" es un palindromo. `
        } else {
            resultado.innerHTML = `La palabra "${word}" no es un palindromo.`
        }
    }
}   