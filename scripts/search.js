class Search{
    constructor(el){
        this.$el = el
        this.$input = this.$el.querySelector('#search')
        this.$songs = this.$el.querySelector('.song-list')
        //this.$el.addEventListener("click", this.onClick.bind(this));
        this.$input.addEventListener('keyup',this.onKeyUp.bind(this))
        this.keyword = ''
        this.page = 1 
        this.perpage = 20
        this.songs = []
        this.nomore = false
        this.fetching = false //标志位，防止触发滚动条过于频繁，让请求一个个来
        this.onscroll = this.onScroll.bind(this)
        window.addEventListener('scroll', this.onscroll)
    }

    onKeyUp(event){
        let keyword = event.target.value.trim() //trim去掉空格
        if(!keyword) return this.reset()
        if(event.key !== 'Enter') return
        this.search(keyword)
    }

    /* 滚动加载功能原理：document.documentElement.clientHeihgt + pageYOffset > document.body.scrollHeight + 50 
       屏幕高度 + 滚动偏移高度 > 滚动条总高度 + 50像素
       差一点点像素就拉到底部了，则开始加载下一页
    */
    onScroll(event) {
        if (this.nomore) return window.removeEventListener('scroll', this.onscroll)
        if (pageYOffset + document.documentElement.clientHeight > document.body.scrollHeight - 50) {
          this.search(this.keyword, this.page + 1)
        }
    }

    reset(){
        this.page = 1
        this.keyword = ''
        this.songs = {}
        this.$songs.innerHTML = ''
        this.nomore = false
    }

    search(keyword, page){
        if(this.fetching) return
        this.keyword = keyword
        this.loading()
        this.fetching = true
        fetch(`http://localhost:3000/search?keyword=${this.keyword}&page=${page || this.page}`)
          .then(res => res.json())
          .then(json => {
            this.page = json.data.song.curpage
            this.nomore = (json.message === 'no results') 
            /* this.songs.push.apply(this.songs, json.data.song.list)
               json.data.song.list是数组，需apply展开才能将内容push到songs数组中 */
            this.songs.push(...json.data.song.list)
            return json.data.song.list
          })
          .then(songs => this.append(songs))
          .then(() => this.done())
          .catch(() => this.fetching = false)
    }
    
    append(songs){
        let html = songs.map(song => `
          <li>
            <a class="song-item" href="#player?artist=${song.singer.map(s => s.name).join('')}&songid=${song.songid}&songname=${song.songname}&albummid=${song.albummid}&duration=${song.interval}">
                <i class="icon icon-music"></i>
                <div class="song-name ellipsis">${song.songname}</div>
                <div class="song-artist ellipsis">${song.singer.map(s => s.name).join('')}/</div> 
            </a>
          </li>
        `).join('')
        /* json文件中singer是一个数组，所以需map映射到name属性中 */
        this.$songs.insertAdjacentHTML('beforeEnd', html)
    }

    loading() {
        this.fetching = true
        this.$el.querySelector('.search-loading').classList.add('show')
    }

    done() {
        this.fetching = false
        if (this.nomore) {
          this.$el.querySelector('.loading-icon').classList.add('none')
          this.$el.querySelector('.loading-text').classList.add('none')
          this.$el.querySelector('.loading-done').classList.remove('hide');
          //this.$el.querySelector('.loading-done').style.display = "block";
          this.$el.querySelector('.search-loading').classList.add('show');
        } else {
          this.$el.querySelector('.search-loading').classList.remove('show');
        }
      }

   
}