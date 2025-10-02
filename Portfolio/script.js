const state = {
    uiState: {
        hamburger: null,
    }
}

const hamburger = document.querySelector('.hamburger')
const nav = document.querySelector('.hamburger__menu')
const nav_items = nav.querySelectorAll('li')
const faq = document.querySelectorAll('.accordion__question')

// FAQ
faq.forEach((question) => {
    const faq_item = question.parentNode;
    question.addEventListener('click', (e) => {
        if (faq_item.classList.contains('active')) {
            faq.forEach(item => {
                item.parentNode.classList.remove('active')
                item.lastElementChild.classList.remove('minus')
                item.lastElementChild.classList.add('plus')
            })
        }
        else {
            faq.forEach(item => {
                item.parentNode.classList.remove('active')
                item.lastElementChild.classList.remove('minus')
                item.lastElementChild.classList.add('plus')
            })
            faq_item.classList.add('active')

            question.lastElementChild.classList.remove('plus')
            question.lastElementChild.classList.add('minus')
        }
    })
})


// Hamburger

hamburger.addEventListener('click', (e) => {
    if (nav.getAttribute('id') === 'hide') {

        nav.setAttribute('id', 'show')
        hamburger.classList.add('cross')

        hamburger.firstElementChild.classList.add('line_rigth')
        hamburger.firstElementChild.classList.remove('hamburger_small_line')
        hamburger.lastElementChild.classList.add('line_left');
        hamburger.lastElementChild.classList.remove('hamburger_line')

        document.body.classList.add('fixed');
    }
    else if (nav.getAttribute('id') === 'show') {
        nav.setAttribute('id', 'hide')
        hamburger.classList?.remove('cross')

        hamburger.firstElementChild.classList.add('hamburger_small_line')
        hamburger.firstElementChild.classList.remove('line_rigth')
        hamburger.lastElementChild.classList.add('hamburger_line');
        hamburger.lastElementChild.classList.remove('line_left')

        document.body.classList.remove('fixed');
    }
})

nav_items.forEach((item) => {
    item.addEventListener('click', (e) => {
        nav.setAttribute('id', 'hide')
        hamburger.classList?.remove('cross')

        hamburger.firstElementChild.classList.add('hamburger_small_line')
        hamburger.firstElementChild.classList.remove('line_rigth')
        hamburger.lastElementChild.classList.add('hamburger_line');
        hamburger.lastElementChild.classList.remove('line_left')

        document.body.classList.remove('fixed');
    })
})