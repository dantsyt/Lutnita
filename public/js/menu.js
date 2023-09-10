const logo = document.querySelector('#logo_img');
const footer = document.querySelector('.footer');
const navbar = document.querySelector('#navbar');
const navBtns = document.querySelectorAll('.nav-btns');

const mediaQueryList = window.matchMedia('screen and (max-width: 480px)');



if (mediaQueryList.matches) {
    const pageTitle = document.querySelector('h2');
    const centerImage = document.querySelector('.center_image_index');
    const centerImageMob = document.querySelector('.center_image_mob');
    pageTitle.addEventListener('click', () => {
        navbar.className = 'navbar';
        for (let one of navBtns) {
            one.style.visibility = 'visible';
        };
        if (centerImage) {
            const navbarX = centerImage.offsetTop;
            const navbarY = centerImage.offsetLeft;
            navbar.style.top = `${navbarX}px`;
            navbar.style.left = `${navbarY}px`;
        } else if (centerImageMob) {
            const navbarX = centerImageMob.offsetTop;
            const navbarY = centerImageMob.offsetLeft;
            navbar.style.top = `${navbarX}px`;
            navbar.style.left = `${navbarY}px`;
        }
    });
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