const title = document.querySelector('#title');
const exhName = title.innerText.toLowerCase();
const imgContainer = document.querySelector('.image_container');

// for phones - images as array in DB and loop OR get to separate hbs

async function getOneExhib(exh) {
    try {
        const response = await fetch(`/getOneExhib/${exh}`);
        const oneExhib = await response.json();
        imgArr = oneExhib.imgpath;
        captionsArr = oneExhib.captions;
        const countTotal = imgArr.length;
        title.insertAdjacentHTML('afterend', `
        <div id="${oneExhib.exhibname}" class="text_container_nohover">
        <h3 class="first_name">${oneExhib.firstname}</h3>
        <h3 class="last_name">${oneExhib.lastname}</h3>
        <h4 class="exhibition_date">${oneExhib.date}</h4>
        </div>
        <div class="img_counter">
        <p id="counter_text" class="counters">Exhibition views</p>
        <p class="counters"><span id="counter_num"> 1</span>/<span id="counter_total">${countTotal}</span></p>
        </div>
        `);
        const container = document.querySelector('.text_container_nohover');
        for (let i = imgArr.length - 1; i > -1; i--) {
            container.insertAdjacentHTML('afterend', `
        <div class="image_container_mob_one">
        <img class="center_image_mob" src="${imgArr[i]}" alt="center_image">
        <p class="captions">${captionsArr[i].replace(/\\n/g, '<br>')}</p>
        </div>
            `);
        };
        imgContainer.insertAdjacentHTML('afterbegin', `
        <img class="center_image_exhib center_image_one_exhib" src="${imgArr[0]}" alt="center_image">
        `);
        imgContainer.insertAdjacentHTML('beforeend', `
        <p id="captions_desk" class="captions">${captionsArr[0]}</p>
        `);
    } catch (e) {
        console.log(e);
    }
}

getOneExhib(exhName).then(() => {
    const image = document.querySelector('.center_image_exhib');
    const captions = document.querySelector('#captions_desk');
    const viewsCount = document.querySelector('#counter_num');
    let counter = 0;
    const nextImage = () => {
        if (counter >= 0 && counter < imgArr.length - 1) {
            counter++;
            image.src = imgArr[counter];
            captions.innerText = captionsArr[counter].replace(/\\n/g, '\n');
            console.log(captionsArr[counter]);
            viewsCount.innerText = ` ${counter + 1}`;
        }
    }

    image.addEventListener('click', nextImage);
});