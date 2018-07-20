//ES6
(function () {

    let search = new Search(document.querySelector('.search-view'))
    let hotKey = new HotKey(document.querySelector('.result-tags')).start()
    let player = new MusicPlayer(document.querySelector('.player')) 

    fetch('/json/rec.json')
        .then(res => res.json())
        .then(render)

    fetch('/json/rank.json')
        .then(rank => rank.json())
        .then(json => json.data.topList)
        .then(renderTopList)

    function render(json) {
        renderSlider(json.data.slider)
        renderRadios(json.data.radioList)
        renderHotlist(json.data.songList)
        lazyload(document.querySelectorAll('.lazyload'))
    }

    
    function renderSlider(slides) {
        slides = slides.map(slider => {
            return { link: slider.linkUrl, image: slider.picUrl }
        })
        new Slider({
            el: document.querySelector('#slider'),
            slides
        })
    }
    /*
    let slider = new Slider({
        el: document.querySelector('#slider'),
        slides: [
            { link: '#1', image: 'images/image_Carousel_1.jpg'},
            { link: '#2', image: 'images/image_Carousel_2.jpg'},
            { link: '#3', image: 'images/image_Carousel_3.jpg'},
            { link: '#4', image: 'images/image_Carousel_4.jpg'},
            { link: '#5', image: 'images/image_Carousel_5.jpg'}
        ]
    })
    window.slider = slider*/

    function renderRadios(radios) {
        document.querySelector('.radio .list').innerHTML = radios.map(radio =>
            `<li class="list-item">
               <a href="#">
                 <img class="lazyload" data-src="${radio.picUrl}" alt="">
                 <div class="icon play-icon""></div>
               </a>
               <div class="song-info">
                 <a href="#" target="_blank">
                  <h3>${radio.Ftitle}</h3>
                 </a>
               </div>
            </li> `
        ).join('')
    }

    function renderHotlist(list) {
        document.querySelector('.hot-list .list').innerHTML = list.map(songlist =>
            `<li class="list-item">
              <a href="#">
                <img class="lazyload" data-src="${songlist.picUrl}" alt="">
                <div class="listen-count">
                  <span class="icon count-icon"></span>
                  ${songlist.accessnum}
                </div>
                <div class="icon play-icon"></div>
              </a>
              <div class="song-info">
                <a href="#" target="_blank">
                  <h3 class="ellipsis">${songlist.songListDesc}</h3>
                  <p>${songlist.songListAuthor}</p>
                </a>
              </div>
            </li> `
        ).join('')
    }

    function renderTopList(list){
        document.querySelector('.rank-view .toplist').innerHTML = list.map(item => 
            `<li class="top-item">
             <div class="top-item-media">
                <a href="#">
                    <img class="lazyload" data-src="${item.picUrl}">
                </a>
                <div class="listen-count">
                    <span class="icon count-icon"></span>
                    ${item.listenCount}
                </div>
            </div>
            <div class="top-item-info">
                <h3 class="top-item-title ellipsis">${item.topTitle}</h3>
                <ul class="top-item-list">
                    ${songlist(item.songList)}
                </ul>
                <span class="more-arrow">&gt;</span>
            </div>
        </li>`
        ).join('')

        function songlist(songs){
            return songs.map((song, i) =>
                `<li class="top-item-song">
                    <i class="song-index">${i+1}</i>
                    ${song.songname} <span class="singer">- ${song.singername}</span>
                </li>`
            ).join('')
        }
        
        lazyload(document.querySelectorAll('.rank-view .toplist .lazyload'))
    }
    
})()