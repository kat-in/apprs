

const hamburger = document.querySelector('.hamburger')
const nav = document.querySelector('.hamburger__menu')
const nav_items = nav.querySelectorAll('li')
const faq = document.querySelectorAll('.accordion__question')

// FAQ
faq.forEach((question, index) => {
    const faq_item = question.parentNode;

    question.addEventListener('click', (e) => {

        if (faq_item.classList.contains('active')) {
            //закрываем все вкладки
            faq.forEach(item => {
                item.parentNode.classList.remove('active')
                item.lastElementChild.classList.remove('minus')
                item.lastElementChild.classList.add('plus')
            })
            // если клик по уже открытой очищаем локал сторедж
            localStorage.removeItem('activeAccordion')
        }
        else {
            //закрываем все вкладки
            faq.forEach(item => {
                item.parentNode.classList.remove('active')
                item.lastElementChild.classList.remove('minus')
                item.lastElementChild.classList.add('plus')
            })
            //открываем текущую
            faq_item.classList.add('active')
            question.lastElementChild.classList.remove('plus')
            question.lastElementChild.classList.add('minus')
            // Записываем её индекс
            localStorage.setItem('activeAccordion', index);
        }
    })
})


// Восстанавливаем вкладку при загрузке страницы
let savedIndex = localStorage.getItem('activeAccordion');

if (savedIndex !== null) {
    // Если есть сохранённый индекс → открываем его
    const savedQuestion = faq[savedIndex];
    const faq_item = savedQuestion.parentNode;

    faq_item.classList.add('active');
    savedQuestion.lastElementChild.classList.remove('plus');
    savedQuestion.lastElementChild.classList.add('minus');
} else {
    // Если ничего не сохранено → открыта первая вкладка
    const firstQuestion = faq[0];
    const firstItem = firstQuestion.parentNode;

    firstItem.classList.add('active');
    firstQuestion.lastElementChild.classList.remove('plus');
    firstQuestion.lastElementChild.classList.add('minus');

    // И сразу записываем её индекс (0) в localStorage
    localStorage.setItem('activeAccordion', 0);
}


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