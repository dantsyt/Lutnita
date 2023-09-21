const title = document.querySelector('#title')
const exhName = title.innerText.toLowerCase()
const imgContainer = document.querySelector('.image_container')

// const mediaQueryList = window.matchMedia('screen and (max-width: 480px)');

// for phones - images as array in DB and loop OR get to separate hbs

async function getOneExhib(exh) {
    try {
        const response = await fetch(`/getOneExhib/${exh}`)
        const oneExhib = await response.json()
        imgArr = oneExhib.imgpath
        captionsArr = oneExhib.captions
        const countTotal = imgArr.length
        // Append TEXT to desktop
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
        `)
        // Append images MOB
        imgContainer.insertAdjacentHTML('beforeend', `
        <div class="image_container_mob_one">
        <img class="center_image_mob mob_one_exhib" src="${imgArr[0]}_450px.webp" alt="center_image">
        </div>
        `)
        // Append images DESK
        imgContainer.insertAdjacentHTML('afterbegin', `
        <img class="center_image_exhib center_image_one_exhib" src="${imgArr[0]}.webp" alt="center_image">
        `)
        imgContainer.insertAdjacentHTML('beforeend', `
        <p id="captions_desk" class="captions">${captionsArr[0]}</p>
        `)
    } catch (e) {
        console.log(e)
    }
}

getOneExhib(exhName).then(() => {
    if (mediaQueryList.matches) {
        mob = true
        document.querySelector('footer').style.position = 'fixed'
        image = document.querySelector('.mob_one_exhib')
    } else {
        mob = false
        document.querySelector('footer').style.position = 'fixed'
        image = document.querySelector('.center_image_exhib')
    }
    const captions = document.querySelector('#captions_desk')
    const viewsCount = document.querySelector('#counter_num')
    setTimeout(() => {
        image.classList.add('fade')
    }, 1)
    setTimeout(() => {
        captions.classList.add('fade_captions')
    }, 500)
    let counter = 0
    const nextImage = () => {
        counter++
        if (counter == imgArr.length) {
            counter = 0
        }
        if (mob == true) {
            image.src = `${imgArr[counter]}_450px.webp`
        } else {
            image.src = `${imgArr[counter]}.webp`
        }
        image.classList.remove('fade')
        captions.classList.remove('fade_captions')
        setTimeout(() => {
            image.classList.add('fade')
        }, 1)
        setTimeout(() => {
            captions.classList.add('fade_captions')
        }, 700)
        captions.innerText = captionsArr[counter].replace(/\\n/g, '\n')
        viewsCount.innerText = ` ${counter + 1}`
    };
    const prevImage = () => {
        counter--
        if (counter == -1) {
            counter = imgArr.length - 1
        } if (mob == true) {
            image.src = `${imgArr[counter]}_450px.webp`
        } else {
            image.src = `${imgArr[counter]}.webp`
        }
        image.classList.remove('fade')
        captions.classList.remove('fade_captions')
        setTimeout(() => {
            image.classList.add('fade')
        }, 1)
        setTimeout(() => {
            captions.classList.add('fade_captions')
        }, 700)
        captions.innerText = captionsArr[counter].replace(/\\n/g, '\n')
        viewsCount.innerText = ` ${counter + 1}`
    }
    window.addEventListener('keydown', function (event) {
        const key = event.key; // "ArrowRight", "ArrowLeft"
        switch (event.key) {
            case "ArrowLeft":
                prevImage()
                break;
            case "ArrowRight":
                nextImage()
                break;
        }
    })
    image.onclick = (e) => {
        let center = image.width / 2
        if (e.offsetX > center) {
            nextImage()
        } else {
            prevImage()
        }
    }
}).catch((e) => { console.log(e.message) })