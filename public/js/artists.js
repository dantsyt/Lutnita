const title = document.getElementById('title')
const imgWrapper = document.querySelector('.img_wrapper')

getArtists().then(() => {
    let bio = document.querySelector('.bio')
    const names = document.querySelectorAll('.text_container')
    const image = document.querySelector('.center_image_exhib')
    for (let name of names) {
        name.addEventListener('mouseenter', () => {
            image.src = `img/artists/${name.firstElementChild.id}.webp`
            // image.onclick = () => {
            //     location.assign(`/exhibitions/${name.id}`)
            // }
        })
    }
    image.onmouseenter = () => {
        str = image.src
        bio = document.querySelector(`#bio_${str.substring(str.lastIndexOf('/') + 1, str.indexOf('.'))}`)
        bio.classList.add('bio')
        bio.style.width = `${image.width}px`
        bio.style.heigth = `${image.heigth}px`
        bio.onmouseleave = () => {
            bio.classList.remove('bio')
        }
    }
})

async function getArtists() {
    try {
        const response = await fetch('/getArtists')
        const artistsData = await response.json()
        const image = document.querySelector('.center_image_exhib')
        image.src = `img/artists/${artistsData[artistsData.length - 1].imgpath[0]}.webp`
        //onclick here
        for (let one of artistsData) {
            title.insertAdjacentHTML('afterend', `
            <div id="${one._id}" class="text_container">
            <p id="${one.imgpath[0]}" class="exhnamehidden"></p>
            <h3 class="first_name">${one.firstname}</h3>
            <h3 class="last_name">${one.lastname}</h3>
            </div>
            <div class="image_container_mob artists_container">
            <img class="center_image_mob" src="img/artists/${one.imgpath[0]}.webp" alt="center_image">
            </div>
            `)
            imgWrapper.insertAdjacentHTML('beforeend', `
            <p id="bio_${one.imgpath[0]}" class="bio_hidden">${one.description}</p>
            `)
        }
    } catch (e) {
        console.log(e)
    }
}

// fetch('/getArtists').then((response) => {
//     response.json().then((data) => {
//         for (let one of data) {
//             title.insertAdjacentHTML('afterend', `
//         <div id="${one._id}" class="text_container">
//         <h3 class="first_name">${one.firstname}</h3>
//         <h3 class="last_name">${one.lastname}</h3>
//         </div>
//         `)
//         }
//     })
// })