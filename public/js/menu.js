const logo = document.querySelector('#logo');
const navbar = document.querySelector('#navbar');
const navBtns = document.querySelectorAll('.nav-btns');

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