const title = document.querySelector('#title')
const exhName = title.innerText.toLowerCase()
const imgContainer = document.querySelector('.image_container')

// for phones - images as array in DB and loop OR get to separate hbs

async function getOneExhib(exh) {
    try {
        const response = await fetch(`/getOneExhib/${exh}`)
        const oneExhib = await response.json()
        imgArr = oneExhib.imgpath
        captionsArr = oneExhib.captions
        const countTotal = imgArr.length
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
        for (let i = 0; i < imgArr.length; i++) {
            imgContainer.insertAdjacentHTML('beforeend', `
        <div class="image_container_mob_one">
        <img class="center_image_mob" src="${imgArr[i]}" alt="center_image">
        <p class="captions">${captionsArr[i].replace(/\\n/g, '<br>')}</p>
        </div>
            `)
        }
        imgContainer.insertAdjacentHTML('afterbegin', `
        <div id="image_wrapper">
        <div class="arrow_container">
        <div id="left_arrow" class="arrows">&#10094;</div>
        <div id="right_arrow" class="arrows">&#10095;</div>
        </div>
        <img class="center_image_exhib center_image_one_exhib" src="${imgArr[0]}" usemap="#imagemap" alt="center_image">
        </div>
        `)
        imgContainer.insertAdjacentHTML('beforeend', `
        <p id="captions_desk" class="captions">${captionsArr[0]}</p>
        `)
    } catch (e) {
        console.log(e)
    }
}

getOneExhib(exhName).then(() => {
    const image = document.querySelector('.center_image_exhib')
    const captions = document.querySelector('#captions_desk')
    const viewsCount = document.querySelector('#counter_num')
    const leftArrow = document.querySelector('#left_arrow')
    const rightArrow = document.querySelector('#right_arrow')
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
        image.src = imgArr[counter]
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
        }
        image.src = imgArr[counter]
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
    leftArrow.onclick = () => {
        prevImage()
    }
    rightArrow.onclick = () => {
        nextImage()
    }
    window.addEventListener('keydown', function (event) {
        const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
        switch (event.key) {
            case "ArrowLeft":
                prevImage()
                break;
            case "ArrowRight":
                nextImage()
                break;
        }
    })
    // image.onclick = (e) => {
    //     let center = image.width / 2
    //     if (e.offsetX > center) {
    //         nextImage()
    //     } else {
    //         prevImage()
    //     }
    // }
}).catch((e) => { console.log(e.message) })