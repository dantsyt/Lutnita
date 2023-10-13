const imgWrapper = document.querySelector('.img_wrapper')
const image = document.querySelector('.center_image_exhib')
let info = document.querySelector('#info')

info.onmouseenter = () => {
    info.classList.add('info')
    info.style.width = `${image.width}px`
    info.style.height = `${image.height}px`
}

info.onmouseleave = () => {
    info.classList.remove('info')
}