const state = {
    uiState: {
        hamburger: null,
    }
}

const hamburger = document.querySelector('.hamburger')
const nav = document.querySelector('.hamburger__menu')

hamburger.addEventListener('click', (e) => {
    nav.setAttribute('id','show_nav')
    hamburger.classList.add('cross')
    const firstLine = hamburger.querySelector('.hamburger_small_line');
    firstLine.classList.add('line_rigth');
    firstLine.classList.remove('hamburger_small_line')
    const secondLine = hamburger.querySelector('.hamburger_line');
    secondLine.classList.add('line_left');
    secondLine.classList.remove('hamburger_line')
    document.body.classList.add('fixed');
})