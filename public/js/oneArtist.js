const title = document.querySelector('#title')
const artistPath = window.location.pathname
const artistId = artistPath.substring(artistPath.indexOf('/', 1) + 1, artistPath.length)
const imgContainer = document.querySelector('.image_container')
videoWrapper = document.querySelector('#videowrapper')
const textSection = document.querySelector('.text_section')
linked = false
const assetUrl = "https://d3m5h3ndrov00p.cloudfront.net"

getOneArtist(artistId).then(() => {
    if (mediaQueryList.matches) {
        mob = true
        image = document.querySelector('.mob_one_exhib')
    } else {
        mob = false
        image = document.querySelector('#main_image')
    }
    captions = document.querySelector('#captions_desk')
    const viewsCount = document.querySelector('#counter_num')
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
    // ExhibLink Mob
    if (linked && mob) {
        document.querySelector('.text_container_nohover').insertAdjacentHTML('afterend', `
        <div id="exhib_link_mob" class="exhib_link exhib_link_mob">
        <h6 class="exhib_link_text">Exhibition</h6>
        <h4 id="artist_exhib_date" class="exhibition_date">${oneExhib.date}</h4>
        </div>
        `)
    }
    // ExhibLink click
    if (linked) {
        const exhibLink = document.querySelector('.exhib_link')
        exhibLink.onclick = () => {
            location.assign(`/exhibitions/${oneExhib.exhibname}`)
        }
    }
    //Next-Prev img funk
    const nextImage = () => {
        counter++
        if (videoWrapper) {
            videoWrapper.remove()
            image.style.display = 'unset'
        }
        image.classList.remove('fade')
        if (counter == imgArr.length) {
            counter = 0
        }
        if (mob == true) {
            image.src = `${imgDirMob}/${imgArrMob[counter]}`
        } else {
            image.src = `${imgDir}/${imgArr[counter]}`
        }
        captions.classList.remove('fade_captions')
        // Video
        if (imgArr[counter].substring(imgArr[counter].indexOf('.', 1) + 1, imgArr[counter].length) == "mp4") {
            if (document.querySelector('.content-wrapper')) {
                document.querySelector('.content-wrapper').remove()
            }
            image.style.display = 'none'
            document.querySelector('.image_container_mob_one').insertAdjacentHTML('beforebegin', `
                    <div class="content-wrapper">
                    <div class="placeholder">
                    <div class="animated-background"></div>
                    </div>
                    </div>
                    <div id="videowrapper" class="videowrapper artist_video">
                    <video id="video" autoplay loop playsinline class="inverted">
                    <source src=${imgDir}/${imgArr[counter]} type="video/mp4" />
                    </video>
                    </div>
                    `)
            const video = document.querySelector('video')
            video.onloadedmetadata = () => {
                document.querySelector('.content-wrapper').classList.add('load_image_hidden')
                videoWrapper = document.querySelector('#videowrapper')
                setTimeout(() => {
                    videoWrapper.classList.add('video_visible')
                }, 1)
                setTimeout(() => {
                    captions.classList.add('fade_captions')
                    document.querySelector('.content-wrapper').remove()
                }, 700)
                captions.innerText = captionsArr[counter].replace(/\\n/g, '\n')
                viewsCount.innerText = ` ${counter + 1}`
            }
            video.onclick = (e) => {
                let center = video.clientWidth / 2
                if (e.offsetX > center) {
                    nextImage()
                } else {
                    prevImage()
                }
            }
        }
        image.onload = () => {
            checkImageLoaded()
        }
        const checkImageLoaded = () => {
            if (image.complete) {
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
        counter--
        if (videoWrapper) {
            videoWrapper.remove()
            image.style.display = 'unset'
        }
        image.classList.remove('fade')
        if (counter == -1) {
            counter = imgArr.length - 1
        }
        if (mob == true) {
            image.src = `${imgDirMob}/${imgArrMob[counter]}`
        } else {
            image.src = `${imgDir}/${imgArr[counter]}`
        }
        captions.classList.remove('fade_captions')
        // Video
        if (imgArr[counter].substring(imgArr[counter].indexOf('.', 1) + 1, imgArr[counter].length) == "mp4") {
            if (document.querySelector('.content-wrapper')) {
                document.querySelector('.content-wrapper').remove()
            }
            image.style.display = 'none'
            document.querySelector('.image_container_mob_one').insertAdjacentHTML('beforebegin', `
                <div class="content-wrapper">
                <div class="placeholder">
                <div class="animated-background"></div>
                </div>
                </div>
                <div id="videowrapper" class="videowrapper artist_video">
                <video id="video" playsinline autoplay loop class="inverted">
                <source src=${imgDir}/${imgArr[counter]} type="video/mp4" />
                </video>
                </div>
                `)
            const video = document.querySelector('video')
            video.onloadedmetadata = () => {
                document.querySelector('.content-wrapper').classList.add('load_image_hidden')
                videoWrapper = document.querySelector('#videowrapper')
                setTimeout(() => {
                    videoWrapper.classList.add('video_visible')
                }, 1)
                setTimeout(() => {
                    captions.classList.add('fade_captions')
                    document.querySelector('.content-wrapper').remove()
                }, 700)
                captions.innerText = captionsArr[counter].replace(/\\n/g, '\n')
                viewsCount.innerText = ` ${counter + 1}`
            }
            video.onclick = (e) => {
                let center = video.clientWidth / 2
                if (e.offsetX > center) {
                    nextImage()
                } else {
                    prevImage()
                }
            }
        }
        image.onload = () => {
            checkImageLoaded()
        }
        const checkImageLoaded = () => {
            if (image.complete) {

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

async function getOneArtist(artist) {
    try {
        const response = await fetch(`/getOneArtist/${artist}`)
        const oneArtist = await response.json()
        try {
            const respone_exhib = await fetch(`/getOneExhib/${artist}`)
            oneExhib = await respone_exhib.json()
            if (oneArtist.fullname == oneExhib.exhibname) {
                linked = true
            } else { linked = false }
        } catch (e) {
            console.log(e)
        }
        imgArr = oneArtist.imgpath
        imgArrMob = oneArtist.imgpathmob
        captionsArr = oneArtist.captions
        const countTotal = imgArr.length
        imgDir = `${assetUrl}/img/artists/${oneArtist.fullname}`
        imgDirMob = `${assetUrl}/img/artists/${oneArtist.fullname}/mob`
        // Append TEXT to desktop
        title.insertAdjacentHTML('afterend', `
        <div id="${oneArtist.fullname}" class="text_container_nohover">
        <div class="names_wrapper"><div class="names_container">
        <img class="artist_name" src="${assetUrl}/img/artists/namepaths/${oneArtist.namepath}"></div></div>
        <h6 class="pdf_mob"><a href="pdf/bio/${oneArtist.fullname}.pdf" target="_blank">bio</a></h6>
        </div>
        <div class="img_counter">
        <p id="counter_text" class="counters">Works</p>
        <p class="counters"><span id="counter_num"> 1</span>/<span id="counter_total">${countTotal}</span></p>
        </div>
        <h6 class="pdf"><a href="pdf/bio/${oneArtist.fullname}.pdf" target="_blank">bio</a></h6>
        `)
        // Append images MOB
        imgContainer.insertAdjacentHTML('beforeend', `
        <div class="image_container_mob_one">
        <img class="center_image_mob mob_one_exhib" src="${imgDirMob}/${imgArrMob[0]}" alt="center_image">
        </div>
        `)
        // Append images DESK
        imgContainer.insertAdjacentHTML('afterbegin', `
        <img id="main_image" class="center_image_exhib center_image_one_exhib" src="${imgDir}/${imgArr[0]}" alt="center_image">
        `)
        imgContainer.insertAdjacentHTML('beforeend', `
        <p id="captions_desk" class="captions">${captionsArr[0].replace(/\n/g, '<br>')}</p>
            `)
        // Append Exhib link
        if (linked) {
            textSection.insertAdjacentHTML('beforeend', `
        <div id="exhib_link" class="exhib_link">
        <h6 class="exhib_link_text">Exhibition</h6>
        <h4 id="artist_exhib_date" class="exhibition_date">${oneExhib.date}</h4>
        </div>
        `)
        }
    } catch (e) {
        console.log(e)
    }
}