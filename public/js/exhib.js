const title = document.getElementById('title');

async function getExhibs() {
    try {
        const response = await fetch('/getExhibs');
        const exhibData = await response.json();
        for (let one of exhibData) {
            title.insertAdjacentHTML('afterend', `
        <div id="${one.firstname.toLowerCase()}${one.lastname.toLowerCase()}" class="text_container">
        <h3 class="first_name">${one.firstname}</h3>
        <h3 class="last_name">${one.lastname}</h3>
        <h4 class="exhibition_date">${one.date}</h4>
        <h4 class="description">${one.description}</h4>
        </div>
        <div class="image_container_mob">
        <img class="center_image_mob" src="${one.imgpath}" alt="center_image">
        </div>
        `)
        }
    } catch (e) {
        console.log(e);
    }
}

getExhibs().then(() => {
    const names = document.querySelectorAll('.text_container');
    const image = document.querySelector('.center_image_exhib');
    for (let name of names) {
        name.addEventListener('mouseenter', () => {
            console.log('yeah')
            image.src = `img/${name.id}.png`
        })
    }
});