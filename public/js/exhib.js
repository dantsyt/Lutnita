const title = document.getElementById('title')

getExhibs().then(() => {
    const names = document.querySelectorAll('.text_container')
    const image = document.querySelector('.center_image_exhib')
    for (let name of names) {
        name.addEventListener('mouseenter', () => {
            image.src = `img/${name.firstElementChild.id}.png`
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
        image.src = `img/${exhibData[exhibData.length - 1].exhibname}.png`
        image.onclick = () => {
            location.assign(`/exhibitions/${exhibData[exhibData.length - 1]._id}`)
        }
        for (let one of exhibData) {
            title.insertAdjacentHTML('afterend', `
        <div id="${one._id}" class="text_container" onclick=location.assign('/exhibitions/${one._id}')>
        <p id="${one.exhibname}" class="exhnamehidden"></p>
        <h3 class="first_name">${one.firstname}</h3>
        <h3 class="last_name">${one.lastname}</h3>
        <h4 class="exhibition_date">${one.date}</h4>
        </div>
        <div class="image_container_mob">
        <img class="center_image_mob" src="img/${one.exhibname}.png" alt="center_image" onclick=location.assign('/exhibitions/${one._id}')>
        </div>
        `)
        }
    } catch (e) {
        console.log(e)
    }
}