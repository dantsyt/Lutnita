const logo = document.querySelector('#logo_img');
const footer = document.querySelector('.footer');
const navbar = document.querySelector('#navbar');
const navBtns = document.querySelectorAll('.nav-btns');

const mediaQueryList = window.matchMedia('only screen and (max-width: 1024px)');

if (mediaQueryList.matches) {
    navbar.className = 'navbar_hidden';
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
    setTimeout(() => {
        navbar.className = 'navbar_hidden'
    }, 2000)
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

document.oncontextmenu = () => { return false }

// (function (mouseStopDelay) {
//     var timeout;
//     document.addEventListener('mousemove', function (e) {
//         clearTimeout(timeout);
//         timeout = setTimeout(function () {
//             var event = new CustomEvent("mousestop", {
//                 detail: {
//                     clientX: e.clientX,
//                     clientY: e.clientY
//                 },
//                 bubbles: true,
//                 cancelable: true
//             });
//             e.target.dispatchEvent(event);
//         }, mouseStopDelay);
//     });
// }(1000));

// // Example use
// document.querySelector('body').addEventListener('mousestop', function (e) {
//     console.log('You stopped your mouse while on the link');
//     console.log('Mouse coordinates are: ', e.detail.clientX, e.detail.clientY);
//     // The event will bubble up to parent elements.
// });