const title = document.getElementById('title')
const imgWrapper = document.querySelector('.img_wrapper')

getArtists().then(() => {
    let bio = document.querySelector('.bio')
    const names = document.querySelectorAll('.text_container')
    const image = document.querySelector('.center_image_exhib')
    for (let name of names) {
        name.addEventListener('mouseenter', () => {
            image.src = `img/artists/${name.firstElementChild.id}.webp`
            image.onclick = () => {
                location.assign(`/artists/${name.id}`)
            }
        })
    }
}).catch((e) => { console.log(e) })

async function getArtists() {
    try {
        const response = await fetch('/getArtists')
        const artistsData = await response.json()
        const image = document.querySelector('.center_image_exhib')
        image.src = `img/artists/${artistsData[artistsData.length - 1].imgpath[0]}.webp`
        image.onclick = () => {
            location.assign(`/artists/${artistsData[artistsData.length - 1].lastname.toLowerCase()}`) // URL Path
        }
        for (let one of artistsData) {
            title.insertAdjacentHTML('afterend', `
            <div id="${one.lastname.toLowerCase()}" class="text_container" onclick=location.assign('/artists/${one.lastname.toLowerCase()}')>
            <p id="${one.lastname.toLowerCase()}" class="exhnamehidden"></p>
            <div class="names_wrapper">
            <div class="names_container">
            <img class="artist_name" src="img/artists/namepaths/${one.namepath}"></div></div></div>
            <div class="image_container_mob artists_container">
            <img class="center_image_mob" src="img/artists/${one.lastname.toLowerCase()}.webp" alt="center_image" onclick=location.assign('/artists/${one.lastname.toLowerCase()}')>
            </div>
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

// image.onmouseenter = () => {
//     str = image.src
//     bio = document.querySelector(`#bio_${str.substring(str.lastIndexOf('/') + 1, str.lastIndexOf('.'))}`)
//     bio.classList.add('bio')
//     bio.style.width = `${image.width}px`
//     bio.style.heigth = `${image.heigth}px`
//     bio.onmouseleave = () => {
//         bio.classList.remove('bio')
//     }
// }