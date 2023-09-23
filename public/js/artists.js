const title = document.getElementById('title')

getArtists().then(() => {
    const names = document.querySelectorAll('.text_container')
    const image = document.querySelector('.center_image_exhib')
    for (let name of names) {
        name.addEventListener('mouseenter', () => {
            image.src = `${name.firstElementChild.id}.webp`
            // image.onclick = () => {
            //     location.assign(`/exhibitions/${name.id}`)
            // }
        })
    }
})

async function getArtists() {
    try {
        const response = await fetch('/getArtists')
        const artistsData = await response.json()
        const image = document.querySelector('.center_image_exhib')
        image.src = `${artistsData[artistsData.length - 1].imgpath[0]}.webp`
        //onclick here
        for (let one of artistsData) {
            title.insertAdjacentHTML('afterend', `
            <div id="${one._id}" class="text_container">
            <p id="${one.imgpath[0]}" class="exhnamehidden"></p>
            <h3 class="first_name">${one.firstname}</h3>
            <h3 class="last_name">${one.lastname}</h3>
            </div>
            <div class="image_container_mob artists_container">
            <img class="center_image_mob" src="${one.imgpath[0]}.webp" alt="center_image">
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