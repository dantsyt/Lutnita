const title = document.getElementById('title');

async function getExhibs() {
    try {
        const response = await fetch('/getExhibs');
        const exhibData = await response.json();
        const image = document.querySelector('.center_image_exhib');
        image.src = `img/${exhibData[exhibData.length - 1].exhibname}.png`
        image.onclick = () => {
            location.assign(`/exhibitions/${exhibData[exhibData.length - 1].exhibname}`);
        }
        for (let one of exhibData) {
            title.insertAdjacentHTML('afterend', `
        <div id="${one.exhibname}" class="text_container" onclick=location.assign('/exhibitions/${one.exhibname}')>
        <h3 class="first_name">${one.firstname}</h3>
        <h3 class="last_name">${one.lastname}</h3>
        <h4 class="exhibition_date">${one.date}</h4>
        </div>
        <div class="image_container_mob">
        <img class="center_image_mob" src="img/${one.exhibname}.png" alt="center_image" onclick=location.assign('/exhibitions/${one.exhibname}')>
        </div>
        `);
        };
    } catch (e) {
        console.log(e);
    }
}

getExhibs().then(() => {
    const names = document.querySelectorAll('.text_container');
    const image = document.querySelector('.center_image_exhib');
    const firstName = names[0];
    console.log(names);
    for (let name of names) {
        name.addEventListener('mouseenter', () => {
            image.src = `img/${name.id}.png`
            image.onclick = () => {
                location.assign(`/exhibitions/${name.id}`);
            }
        });
    };
});