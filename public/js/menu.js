const logo = document.querySelector('#logo_img');
const navbar = document.querySelector('#navbar');
const navBtns = document.querySelectorAll('.nav-btns');

const mediaQueryList = window.matchMedia('(hover:none)');



if (mediaQueryList.matches) {
    const pageTitle = document.querySelector('h2');
    const centerImage = document.querySelector('.center_image');
    pageTitle.addEventListener('click', () => {
        navbar.className = 'navbar';
        for (let one of navBtns) {
            one.style.visibility = 'visible';
        };
        const navbarX = centerImage.offsetTop;
        const navbarY = centerImage.offsetLeft;
        navbar.style.top = `${navbarX}px`;
        navbar.style.left = `${navbarY}px`;
    });
} else {
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
};