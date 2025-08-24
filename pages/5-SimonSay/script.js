const colors = ['#FF4136', '#2ECC40', '#0074D9',
                '#FFDC00', '#7FDBFF', '#F012BE',
                '#FF851B', '#B10DC9', '#FF69B4']

/** @type {number[]} */
let simonPattern = []

let posPulsed = 0
let level = 0
let playing = false

/** @type {HTMLSpanElement} **/
const txtLevel = document.getElementById('score')
/** @type {HTMLSpanElement} */
const txtMaxLevel = document.getElementById('max-score')
// if there is a max level saved in localStorage, display it, otherwhise display 0
txtMaxLevel.innerText = `MaxLvl: ${localStorage.getItem('max-level') || 0}`


/** @type {NodeListOf<HTMLbuttonElement>} */
const simonButtons = document.querySelectorAll('.btn-smn');
const startbtn = document.querySelector('.btn-start');
const resetbtn = document.querySelector('.btn-reset');

/** Generate a random number between two numbers
 * @param {number} min - The minimun number
 * @param {number} max - The maximum number
 * @returns {number} A random number between min and max (both include)*/
const getRNBtw = (min, max) => Math.floor(Math.random() * ( max - min + 1)) + min

/** Add a new random number to the simon pattern */
const addSimonPattern = () => simonPattern.push(getRNBtw(0, simonButtons.length-1)) 

/** Set level var and display  
 * @param {number} lvl - The level to set */
const setLevel = lvl => {
    level = lvl;
    txtLevel.innerText =`Level: ${level}`;
}

/** Save the max level in localStorage
 * @param {number} lvl - The level to save */
const saveMaxLevel = lvl => {
    const maxLevel = localStorage.getItem('max-level') || 0;
    if (lvl > maxLevel) {
        localStorage.setItem('max-level', lvl);
        txtMaxLevel.innerText = `MaxLvl: ${lvl}`;
    }
}

/** Reset all variables 
 * @param {boolean} disBtnStart - disable the start button */
function reset(disBtnStart = true) {
    posPulsed = 0
    setLevel(0)
    playing = false
    simonPattern = []
    startbtn.disabled = disBtnStart
}

/** Play the simon pattern */
function playSimonPattern() {
    playing = true
    let i = 0

    const interval = setInterval(() => {
        /**@type {HTMLButtonElement} */
        const btn = simonButtons[simonPattern[i]]
        btn.setAttribute('ilum','true')

        //Reset the btn color after 500ms
        setTimeout(() => btn.removeAttribute('ilum'), 500)
        i++

        // If the end of the pattern is reached (animation finished)
        if (i >= simonPattern.length) {
            clearInterval(interval)
            playing = false
        }
    }, 600)
}

/** Handle start click */
function handleStartClick() {
    reset()
    addSimonPattern()
    playSimonPattern()
}

/** Handle player click 
 * @param {MouseEvent} event - The click event */
function handlePlayerClick(event) {
    if (playing) return

    // get the index of the button clicked by style porperty
    const btnIndex = parseInt(event.target.style.getPropertyValue('--i'))

    if (btnIndex === simonPattern[posPulsed]) {
        posPulsed++
        
        if (posPulsed >= simonPattern.length) {
            setLevel(level + 1)
            saveMaxLevel(level)
            posPulsed = 0
            addSimonPattern()
            playSimonPattern()
        }
        return
    }

    // if the player clicked the wrong button
    if (simonPattern.length === 0) return
    alert('You lost!')
    reset(false)
}

startbtn.addEventListener('click', handleStartClick)
resetbtn.addEventListener('click', () => {
    if (playing) return
    if (confirm('Estas seguro de reiniciar la pagina?'))
        reset(false)
})

simonButtons.forEach((btn, i) => {
    btn.style.setProperty('--data-c', colors[i])
    btn.style.setProperty('--i', i)
    btn.addEventListener('click', handlePlayerClick)
})

// on unload
window.addEventListener('beforeunload', () => {
    simonButtons.forEach(btn => {
        btn.removeEventListener('click', () => { })
    })
    startbtn.removeEventListener('click', {})
    resetbtn.removeEventListener('click', {})
})