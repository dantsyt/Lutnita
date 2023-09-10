const names = document.querySelectorAll('.text_container');
const image = document.querySelector('.center_image_exhib');

for (let one of names) {
    one.addEventListener('mouseenter', () => {
        image.src = `img/${one.id}.png`
    })
}