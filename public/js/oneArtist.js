const title = document.querySelector('#title')
const artistPath = window.location.pathname
const artistId = artistPath.substring(artistPath.indexOf('/', 1) + 1, artistPath.length)
const imgContainer = document.querySelector('.image_container')

async function getOneArtist(artist) {
    try {
        const response = await fetch(`/getOneArtist/${artist}`)
        const oneArtist = await response.json()
        imgArr = oneArtist.imgpath
        // captionsArr = oneArtist.captions
        const countTotal = imgArr.length
        imgDir = `img/artists/${oneArtist.lastname}`
        imgDirMob = `img/artists/${oneArtist.lastname}/mob`
        // Append TEXT to desktop
        title.insertAdjacentHTML('afterend', `
        <div id="${oneArtist.lastname}" class="text_container_nohover">
        <div class="names_wrapper"><div class="names_container">
        <img class="artist_name" src="img/artists/namepaths/${oneArtist.namepath}"></div></div>
        <h6 class="pdf_mob"><a href="pdf/bio/${oneArtist.lastname}.pdf" target="_blank">bio</a></h6>
        </div>
        <h6 class="pdf"><a href="pdf/bio/${oneArtist.lastname}.pdf" target="_blank">bio</a></h6>
        `)
        // Append images MOB
        imgContainer.insertAdjacentHTML('beforeend', `
        <div class="image_container_mob_one">
        <img class="center_image_mob mob_one_exhib" src="${imgDirMob}/${imgArr[0]}.webp" alt="center_image">
        </div>
        `)
        // Append images DESK
        imgContainer.insertAdjacentHTML('afterbegin', `
        <img id="main_image" class="center_image_exhib center_image_one_exhib" src="${imgDir}/${imgArr[0]}.webp" alt="center_image">
        `)
        // imgContainer.insertAdjacentHTML('beforeend', `
        // <p id="captions_desk" class="captions">${captionsArr[0].replace(/\\n/g, '<br>')}</p>
        // `)
    } catch (e) {
        console.log(e)
    }
}

getOneArtist(artistId).then(() => {
    if (mediaQueryList.matches) {
        mob = true
        image = document.querySelector('.mob_one_exhib')
    } else {
        mob = false
        image = document.querySelector('#main_image')
    }
    // captions = document.querySelector('#captions_desk')
    const viewsCount = document.querySelector('#counter_num')
    // loadImage = document.querySelector('.load_image')
    setTimeout(() => {
        image.classList.add('fade')
    }, 1)
    // setTimeout(() => {
    //     captions.classList.add('fade_captions')
    // }, 500)
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
        // captions.classList.remove('fade_captions')
        image.onload = () => {
            checkImageLoaded()
        }
        const checkImageLoaded = () => {
            if (image.complete) {
                // loadImage.classList.add('load_image_hidden')
                setTimeout(() => {
                    image.classList.add('fade')
                }, 1)
                // setTimeout(() => {
                //     captions.classList.add('fade_captions')
                // }, 700)
                // captions.innerText = captionsArr[counter].replace(/\\n/g, '\n')
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
        // captions.classList.remove('fade_captions')
        image.onload = () => {
            checkImageLoaded()
        }
        const checkImageLoaded = () => {
            if (image.complete) {
                // loadImage.classList.add('load_image_hidden')
                setTimeout(() => {
                    image.classList.add('fade')
                }, 1)
                // setTimeout(() => {
                //     captions.classList.add('fade_captions')
                // }, 700)
                // captions.innerText = captionsArr[counter].replace(/\\n/g, '\n')
                viewsCount.innerText = ` ${counter + 1}`
            } else {
                setTimeout(checkImageLoaded, 50)
            }
        }

    }
}).catch((e) => { console.log(e.message) })

//      <img id="load_image" class="load_image load_image_mob" src="img/spin.svg">