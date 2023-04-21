let pelaajaText = document.getElementById('pelaajaText')
let uudelleenBtn = document.getElementById('uudelleenBtn')
let boxes = Array.from(document.getElementsByClassName('box'))


// Rastit ja Ympyrät pelilaudassa
const O_TEXT = "O"
const X_TEXT = "X"
let nykyinenPelaaja = X_TEXT
let spaces = Array(9).fill(null)

// Tässä otetaan klikkaukset käyttöön
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = nykyinenPelaaja
        e.target.innerText = nykyinenPelaaja
// voitto ilmoitus
        if(playerHasWon() !==false){
            pelaajaText.innerHTML = `${nykyinenPelaaja} voitti!`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }
// vuorojen vaihto
        nykyinenPelaaja = nykyinenPelaaja == X_TEXT ? O_TEXT : X_TEXT
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}

uudelleenBtn.addEventListener('click', restart)
// Ruudukon tyhjennys
function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    pelaajaText.innerHTML = 'Ristinolla'

    nykyinenPelaaja = X_TEXT
}

startGame()
