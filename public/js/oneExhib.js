const title = document.querySelector('#title')
const exhPath = window.location.pathname
const exhId = exhPath.substring(exhPath.indexOf('/', 1) + 1, exhPath.length)
const imgContainer = document.querySelector('.image_container')

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
        <h6 class="pdf_mob"><a href="pdf/${oneExhib.exhibname}.pdf" target="_blank">info</a></h6>
        </div>
        <div class="img_counter">
        <p id="counter_text" class="counters">Exhibition views</p>
        <p class="counters"><span id="counter_num"> 1</span>/<span id="counter_total">${countTotal}</span></p>
        </div>
        <h6 class="pdf"><a href="pdf/${oneExhib.exhibname}.pdf" target="_blank">info</a></h6>
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
        <img class="center_image_mob mob_one_exhib inverted" src="${imgDirMob}/${imgArr[0]}_450px.webp" alt="center_image">
        </div>
        `)
        // Append images DESK
        imgContainer.insertAdjacentHTML('afterbegin', `
        <img id="main_image" class="center_image_exhib center_image_one_exhib inverted" src="${imgDir}/${imgArr[0]}.webp" alt="center_image">
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
        image = document.querySelector('.mob_one_exhib')
    } else {
        mob = false
        image = document.querySelector('#main_image')
    }
    // vbmmrdngmr special
    if (document.querySelector('.text_container_nohover').id == 'vbmmrdngmr') {
        vbmmrdngmr()
    }
    captions = document.querySelector('#captions_desk')
    const viewsCount = document.querySelector('#counter_num')
    // loadImage = document.querySelector('.load_image')
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
        // loadImage.classList.remove('load_image_hidden')
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
                // loadImage.classList.add('load_image_hidden')
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
        // loadImage.classList.remove('load_image_hidden')
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
                // loadImage.classList.add('load_image_hidden')
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

const vbmmrdngmr = () => {
    const namesWrapper = document.querySelector('.names_wrapper')
    const namesContainer = document.querySelectorAll('.names_container')
    if (mob) {
        document.querySelector('.pdf_mob').insertAdjacentHTML('afterend', `
        <h6 class="videoBtn">video</h6>
        `)
        namesWrapper.style.maxHeight = '9.5em'
        namesWrapper.style.marginBottom = '-2em'
        namesWrapper.style.marginTop = '5rem'
    } else {
        document.querySelector('.title_menu').style.display = 'none'
        document.querySelector('.pdf').insertAdjacentHTML('afterend', `
        <h6 class="videoBtn">video</h6>
        `)
        namesContainer[5].style.display = 'none'
    }
    videoBtn = document.querySelector('.videoBtn')
    videoBtn.addEventListener('click', videoAdd)
}

const videoAdd = () => {
    document.documentElement.classList.toggle('dark_mode')
    document.documentElement.style.cursor = "url('cursors/cursor_white.svg'), pointer;"
    // loadImage.style.top = '15vh'
    image.style.display = 'none'
    image.classList.remove('fade')
    captions.style.display = 'none'
    captions.classList.remove('fade_captions')
    document.querySelector('.image_container_mob_one').insertAdjacentHTML('beforebegin', `
    <div id="videowrapper" class="videowrapper">
    <div class="inverted" style="position: relative; padding-top: 52.734375%;">
    <iframe  id="video"
    src="https://customer-5koq92y0e8fw2ep0.cloudflarestream.com/fc4fe6a4a9b127d5f5d8cf78a8da8ba9/iframe?poster=https%3A%2F%2Fcustomer-5koq92y0e8fw2ep0.cloudflarestream.com%2Ffc4fe6a4a9b127d5f5d8cf78a8da8ba9%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
    style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"
    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
    allowfullscreen="true"></iframe></div>
    </div>
    `)
    document.querySelector('.right_space').insertAdjacentHTML('afterbegin', `
    <p id="close_video" class="close_video">close video  <span id="close_vid_symb"><sup>&#10005;</sup></span></p>
    `)
    if (mob) {
        videoBtn.style.display = 'none'
        document.querySelector('#vbmmrdngmr').insertAdjacentHTML('beforeend', `
    <p id="close_video_mob" class="close_video">close video</p>
    `)
        document.querySelector('#close_video_mob').addEventListener('click', videoRemove)
    }
    const video = document.querySelector('video')
    videoWrapper = document.querySelector('#videowrapper')
    document.querySelectorAll('.inverted').forEach((res) => {
        res.classList.toggle('invert')
    })
    videoWrapper.classList.add('video_visible')

    document.querySelector('#close_video').addEventListener('click', videoRemove)
    videoBtn.removeEventListener('click', videoAdd)
}

const videoRemove = () => {
    if (mob) {
        videoBtn.style.display = 'unset'
        document.querySelector('#close_video_mob').remove()
    }
    document.documentElement.classList.toggle('dark_mode')
    document.querySelectorAll('.inverted').forEach((res) => {
        res.classList.toggle('invert')
    })
    videoWrapper.remove()
    // loadImage.style.top = 'unset'
    setTimeout(() => {
        image.style.display = 'unset'
        captions.style.display = 'unset'
    }, 900)
    setTimeout(() => {
        image.classList.add('fade')
        captions.classList.add('fade_captions')
    }, 1100)
    document.querySelector('#close_video').remove()
    videoBtn.addEventListener('click', videoAdd)
}

//      <img id="load_image" class="load_image load_image_mob" src="img/spin.svg">