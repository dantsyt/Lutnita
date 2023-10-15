const logo = document.querySelector('#logo_img');
const footer = document.querySelector('.footer');
const navbar = document.querySelector('#navbar');
const navBtns = document.querySelectorAll('.nav-btns');

const mediaQueryList = window.matchMedia('only screen and (max-width: 1024px)');



if (mediaQueryList.matches) {
    const pageTitle = document.querySelector('h2');
    pageTitle.addEventListener('click', () => {
        navbar.className = 'navbar';
        for (let one of navBtns) {
            one.style.visibility = 'visible';
        };
    });
    navbar.addEventListener('click', (e) => {
        if (e.target == navbar) {
            navbar.className = 'navbar_hidden';
            for (let one of navBtns) {
                one.style.visibility = 'hidden';
            };
        }
    })
} else {
    const displayNavBar = () => {
        navbar.className = 'navbar';
        for (let one of navBtns) {
            one.style.visibility = 'visible';
        };
    };

    footer.addEventListener('mouseenter', displayNavBar);

    footer.addEventListener('mouseleave', () => {
        navbar.className = 'navbar_hidden';
        navBtns.className = 'nav-btns_hidden';
    });
};