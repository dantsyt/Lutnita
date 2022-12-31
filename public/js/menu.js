const logo = document.querySelector('#logo');
const navbar = document.querySelector('#navbar');
const navBtns = document.querySelectorAll('.nav-btns');

// Add comment
const displayNavBar = () => {
    navbar.className = 'navbar';
    for (let one of navBtns) {
        one.style.visibility = 'visible';
    };
};

logo.addEventListener('mouseenter', displayNavBar);

logo.addEventListener('mouseleave', () => {
    setTimeout(() => {
        navbar.className = 'navbar_hidden';
        navBtns.className = 'nav-btns_hidden';
    }, 4000);
    setTimeout(() => {
        for (let one of navBtns) {
            one.style.visibility = 'hidden';
        };
    }, 6000);
});

const paragraph = document.querySelector('h1');
const mediaQueryList = window.matchMedia('(hover:none)');


if (mediaQueryList.matches) {
    /* the viewport is 600 pixels wide or less */
    paragraph.textContent = 'This.';
    document.body.style.backgroundColor = 'pink';
} else {
    /* the viewport is more than 600 pixels wide */
    paragraph.textContent = 'This is a wide screen — more than 600px wide.';
    document.body.style.backgroundColor = 'aquamarine';
}