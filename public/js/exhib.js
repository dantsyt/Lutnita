const title = document.getElementById('title')

getExhibs().then(() => {
    const names = document.querySelectorAll('.text_container')
    const image = document.querySelector('.center_image_exhib')
    for (let name of names) {
        name.addEventListener('mouseenter', () => {
            image.src = `img/exhibitions/${name.firstElementChild.id}.webp`
            image.onclick = () => {
                location.assign(`/exhibitions/${name.id}`)
            }
        })
    }
})

async function getExhibs() {
    try {
        const response = await fetch('/getExhibs')
        const exhibData = await response.json()
        const image = document.querySelector('.center_image_exhib')
        image.src = `img/exhibitions/${exhibData[exhibData.length - 1].exhibname}.webp` // Image Path
        image.onclick = () => {
            location.assign(`/exhibitions/${exhibData[exhibData.length - 1]._id}`) // URL Path
        }
        for (let one of exhibData) {
            title.insertAdjacentHTML('afterend', `
        <div id="${one._id}" class="text_container" onclick=location.assign('/exhibitions/${one._id}')>
        <p id="${one.exhibname}" class="exhnamehidden"></p>
        <div class="names_wrapper"></div>
        <h4 class="exhibition_date">${one.date}</h4>
        </div>
        <div class="image_container_mob">
        <img class="center_image_mob" src="img/exhibitions/${one.exhibname}.webp" alt="center_image" onclick=location.assign('/exhibitions/${one._id}')>
        </div>
        `)
            namesPlace = document.querySelector(`.names_wrapper`)
            for (let name of one.artistname) {
                namesPlace.insertAdjacentHTML('afterbegin', `
                <div class="names_container">
                <h3 class="first_name">${name.firstname}</h3>
                <h3 class="last_name">${name.lastname}</h3>
                </div>
                `)
            }

        }
    } catch (e) {
        console.log(e)
    }
}