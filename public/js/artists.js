const title = document.getElementById('title')
const imgWrapper = document.querySelector('.img_wrapper')

getArtists().then(() => {
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