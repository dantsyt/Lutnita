const title = document.querySelector('#title')
const exhPath = window.location.pathname
const exhId = exhPath.substring(exhPath.indexOf('/', 1) + 1, exhPath.length)
// const exhName = title.innerText.toLowerCase()
const imgContainer = document.querySelector('.image_container')

// const mediaQueryList = window.matchMedia('screen and (max-width: 480px)')

async function getOneExhib(exh) {
    try {
        const response = await fetch(`/getOneExhib/${exh}`)
        const oneExhib = await response.json()
        imgArr = oneExhib.imgpath
        captionsArr = oneExhib.captions
        const countTotal = imgArr.length
        imgDir = `img/exhibitions/${oneExhib.exhibname}`
        imgDirMob = `img/exhibitions/${oneExhib.exhibname}/mob`
        // Append TEXT to desktop
        title.insertAdjacentHTML('afterend', `
        <div id="${oneExhib.exhibname}" class="text_container_nohover">
        <div class="names_wrapper"></div>
        <h4 class="exhibition_date">${oneExhib.date}</h4>
        <h6 class="pdf_mob"><a href="pdf/expo.pdf" target="_blank">PDF</a></h6>
        </div>
        <div class="img_counter">
        <p id="counter_text" class="counters">Exhibition views</p>
        <p class="counters"><span id="counter_num"> 1</span>/<span id="counter_total">${countTotal}</span></p>        
        </div>
        <h6 class="pdf"><a href="pdf/${oneExhib.exhibname}.pdf" target="_blank">pdf</a></h6>
        `)
        namesPlace = document.querySelector(`.names_wrapper`)
        for (let name of oneExhib.namepath) {
            if (name == "vbmmrdngmr.svg") {
                continue
            }
            namesPlace.insertAdjacentHTML('beforeend', `
            <div class="names_container">
            <img class="artist_name" src="img/exhibitions/namepaths/${name}">
            </div>
            `)
        }
        // Append images MOB
        imgContainer.insertAdjacentHTML('beforeend', `
        <div class="image_container_mob_one">
        <img class="center_image_mob mob_one_exhib" src="${imgDirMob}/${imgArr[0]}_450px.webp" alt="center_image">
        </div>
        `)
        // Append images DESK
        imgContainer.insertAdjacentHTML('afterbegin', `
        <img id="load_image" class="load_image load_image_mob" src="img/spin.svg">
        <img id="main_image" class="center_image_exhib center_image_one_exhib" src="${imgDir}/${imgArr[0]}.webp" alt="center_image">
        `)
        imgContainer.insertAdjacentHTML('beforeend', `
        <p id="captions_desk" class="captions">${captionsArr[0].replace(/\\n/g, '<br>')}</p>
        `)
    } catch (e) {
        console.log(e)
    }
}

getOneExhib(exhId).then(() => {
    if (mediaQueryList.matches) {
        mob = true
        // document.querySelector('footer').style.position = 'fixed'
        image = document.querySelector('.mob_one_exhib')
    } else {
        mob = false
        image = document.querySelector('#main_image')
    }
    // Exclude vbmmrdngmr - mob column height
    if (mob && document.querySelector('.text_container_nohover').id == 'vbmmrdngmr') {
        const namesWrapper = document.querySelector('.names_wrapper')
        namesWrapper.style.maxHeight = '9.5em'
        namesWrapper.style.marginBottom = '-2em'
        namesWrapper.style.marginTop = '5rem'
    }
    if (!mob && document.querySelector('.text_container_nohover').id == 'vbmmrdngmr') {
        const namesContainer = document.querySelectorAll('.names_container')
        namesContainer[5].style.display = 'none'
    }
    const captions = document.querySelector('#captions_desk')
    const viewsCount = document.querySelector('#counter_num')
    const loadImage = document.querySelector('.load_image')
    setTimeout(() => {
        image.classList.add('fade')
    }, 1)
    setTimeout(() => {
        captions.classList.add('fade_captions')
    }, 500)
    let counter = 0
    window.addEventListener('keydown', function (event) {
        const key = event.key // "ArrowRight", "ArrowLeft"
        switch (event.key) {
            case "ArrowLeft":
                prevImage()
                break
            case "ArrowRight":
                nextImage()
                break
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
    const nextImage = () => {
        loadImage.classList.remove('load_image_hidden')
        counter++
        image.classList.remove('fade')
        if (counter == imgArr.length) {
            counter = 0
        }
        if (mob == true) {
            image.src = `${imgDirMob}/${imgArr[counter]}_450px.webp`
        } else {
            image.src = `${imgDir}/${imgArr[counter]}.webp`
        }
        captions.classList.remove('fade_captions')
        image.onload = () => {
            checkImageLoaded()
        }
        const checkImageLoaded = () => {
            if (image.complete) {
                loadImage.classList.add('load_image_hidden')
                setTimeout(() => {
                    image.classList.add('fade')
                }, 1)
                setTimeout(() => {
                    captions.classList.add('fade_captions')
                }, 700)
                captions.innerText = captionsArr[counter].replace(/\\n/g, '\n')
                viewsCount.innerText = ` ${counter + 1}`
            } else {
                setTimeout(checkImageLoaded, 50)
            }
        }

    }
    const prevImage = () => {
        loadImage.classList.remove('load_image_hidden')
        counter--
        image.classList.remove('fade')
        if (counter == -1) {
            counter = imgArr.length - 1
        }
        if (mob == true) {
            image.src = `${imgDirMob}/${imgArr[counter]}_450px.webp`
        } else {
            image.src = `${imgDir}/${imgArr[counter]}.webp`
        }
        captions.classList.remove('fade_captions')
        image.onload = () => {
            checkImageLoaded()
        }
        const checkImageLoaded = () => {
            if (image.complete) {
                loadImage.classList.add('load_image_hidden')
                setTimeout(() => {
                    image.classList.add('fade')
                }, 1)
                setTimeout(() => {
                    captions.classList.add('fade_captions')
                }, 700)
                captions.innerText = captionsArr[counter].replace(/\\n/g, '\n')
                viewsCount.innerText = ` ${counter + 1}`
            } else {
                setTimeout(checkImageLoaded, 50)
            }
        }

    }
}).catch((e) => { console.log(e.message) })