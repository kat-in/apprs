

const hamburger = document.querySelector('.hamburger')
const nav = document.querySelector('.hamburger__menu')
const nav_items = nav.querySelectorAll('li')
const faq = document.querySelectorAll('.accordion__question')
const priceCardButtons = document.querySelectorAll('.price__card__button button')
const modalOverlay = document.querySelector('.modal__overlay')
const modalCloseIcon = document.querySelector('.modal_cross')
const modal = modalOverlay.querySelector('.modal')




// Слайдер

const slider = document.querySelector('.slider');
const slides = Array.from(slider.children);
const speed = 2;
const zone = 0.3; // активная зона 30% слева/справа
let scrollTimer = null;

// Центрирование
function centerSlider() {
  const totalWidth = slides.reduce((sum, s) => {
    const style = getComputedStyle(s);
    const marginRight = parseInt(style.marginRight) || 0;
    return sum + s.offsetWidth + marginRight;
  }, 0);

  slider.scrollLeft = (totalWidth - slider.clientWidth) / 2;
}

// центр при загрузке и при ресайзе
window.addEventListener('load', centerSlider);
window.addEventListener('resize', centerSlider);

//  десктоп прокрутка при наведении
function startScroll(direction) {
  const maxScroll = slider.scrollWidth - slider.clientWidth;
  scrollTimer = setInterval(() => {
    slider.scrollLeft = Math.max(0, Math.min(slider.scrollLeft + speed * direction, maxScroll));
  }, 16);
}

slider.addEventListener('mousemove', e => {
  const x = e.clientX - slider.getBoundingClientRect().left;
  const w = slider.clientWidth;

  clearInterval(scrollTimer);

  if (x < w * zone) startScroll(-1);       // влево
  else if (x > w * (1 - zone)) startScroll(1); // вправо
});

slider.addEventListener('mouseleave', () => clearInterval(scrollTimer));

// Мобилка свайп 
let isTouching = false;
let startX = 0;
let scrollStart = 0;

slider.addEventListener('touchstart', e => {
  isTouching = true;
  startX = e.touches[0].pageX;
  scrollStart = slider.scrollLeft;
});

slider.addEventListener('touchmove', e => {
  if (!isTouching) return;
  const dx = e.touches[0].pageX - startX;
  const maxScroll = slider.scrollWidth - slider.clientWidth;
  slider.scrollLeft = Math.max(0, Math.min(scrollStart - dx, maxScroll));
});

slider.addEventListener('touchend', () => isTouching = false);


//PriceCardModal

const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal_active')) {
        modalOverlay.classList.remove('modal_active')
        document.body.classList.remove('fixed')
        document.body.removeEventListener('click', handleOutsideClick);
    }
}

priceCardButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        modalOverlay.classList.add('modal_active')
        document.body.classList.add('fixed')
        document.body.addEventListener('click', handleOutsideClick)
    })
})

modalCloseIcon.addEventListener('click', () => {
    modalOverlay.classList.remove('modal_active')
    document.body.classList.remove('fixed');
})



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