// FAQ section

const accordionItemHeaders = document.querySelectorAll('.accordion__item-header');

accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener('click', (e) => {
        const currentlyActiveAccordionItemHeader = document.querySelector('.accordion__item-header.active');
        if (currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader) {
            currentlyActiveAccordionItemHeader.classList.toggle('active');
            currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
        }

        accordionItemHeader.classList.toggle('active'); //changing + and -
        const accordionItemBody = accordionItemHeader.nextElementSibling;
        if (accordionItemHeader.classList.contains('active')) {
            accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px';
        } else {
            accordionItemBody.style.maxHeight = 0;
        }
    });
});

// Testimonials section

const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const slides = document.querySelectorAll('.testimonials__card');

let index = 0;
display(index);

function display(index) {
    slides.forEach(slide => {
        slide.style.display = 'none';
    });
    slides[index].style.display = 'flex';
}

function nextSlide() {
    index++;
    if (index > slides.length-1) {
        index = 0
    }
    display(index);
}
function prevSlide() {
    index--;
    if (index < 0) {
        index = slides.length - 1;
    }
    display(index);
}

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

// Form validation

const form = document.getElementById('form');
const username = document.getElementById('name');
const email = document.getElementById('email');
const comment = document.getElementById('comment');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    //get values from inputs
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const commentValue = comment.value.trim();

    //check username
    if (usernameValue === '' || usernameValue === null) {
        //show error
        setErrorFor(username, 'Okence za ime ne sme biti prazno');
    } else {
        setSuccessFor(username);
    }

    //check email
    if(email === '') {
        setErrorFor(email, 'Okence za email ne sme biti prazno')
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Napačno napisan email');
    } else {
        setSuccessFor(email);
    }

    if(commentValue === '') {
        setErrorFor(comment, 'Okence s komentarjem ne sme biti prazno')
    } else {
        setSuccessFor(comment);
    }
};

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;

    formControl.className = 'form-control error';
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}