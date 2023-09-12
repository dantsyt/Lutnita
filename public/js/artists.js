const title = document.getElementById('title');

fetch('/getArtists').then((response) => {
    response.json().then((data) => {
        for (let one of data) {
            title.insertAdjacentHTML('afterend', `
        <div id="${one._id}" class="text_container">
        <h3 class="first_name">${one.firstname}</h3>
        <h3 class="last_name">${one.lastname}</h3>
        </div>
        `)
        }
    })
});