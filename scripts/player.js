//播放器界面

//  location.hash --#player?artist=%E8%96%9B%E4%B9%8B%E8%B0%A6&songid=5106429&songname=%E4%B8%91%E5%85%AB%E6%80%AA&albummid=000QgFcm0v8WaF&duration=248
//  location.hash.slice(location.hash.indexOf('?')+1)
//  location.hash.slice(location.hash.indexOf('?')+1).match(/(\w+)=([^&]+)/g)
//  location.hash.slice(location.hash.indexOf('?')+1).match(/(\w+)=([^&]+)/g).reduce
class MusicPlayer {
    constructor(el){
        this.$el = el
        this.$el.addEventListener('click',this)
        this.creatAudio()
        this.lyrics = new LyricsPlayer(this.$el.querySelector('.player-lyrics'), this.$audio) //歌词
        this.progress = new ProgressBar(this.$el.querySelector('.progress'), 280, true) //进度条
    }

    creatAudio(){
        this.$audio = document.createElement('audio')
        this.$audio.loop = true
        this.$audio.id = `player-${Math.floor(Math.random() * 100)}-${+new Date}`
        document.body.appendChild(this.$audio)
    }
    handleEvent(event){
        let target = event.target
        switch (true){
            case target.matches('.icon-play'):
                this.onPlay(event)
                break
            case target.matches('.icon-pause'):
                this.onPause(event)
                break
            case target.matches('.icon-list'):
                this.hide()
                break
        }
    }
    onPlay(event){
        this.progress.start()
        event.target.classList.add('icon-pause')
        event.target.classList.remove('icon-play')
    }
    onPause(event){
        this.progress.pause()
        event.target.classList.add('icon-play')
        event.target.classList.remove('icon-pause')
    }

    play(options={}){
        if(!options) return
        this.$el.querySelector('.song-name').innerText = options.songname
        this.$el.querySelector('.song-artist').innerText = options.artist
        this.progress.reset(option.duration)
        let url = `https://y.gtimg.cn/music/photo_new/T001R68x68M000${options.albummid}.jpg`
    }
    show(){
        this.$el.classList.add('show')       
    }
    hide(){
        this.$el.classList.remove('show')
    }


}

//歌词
class LyricsPlayer{
    constructor(el){
        this.$el = el
        this.$el.innerHTML = '<div class="player-lyrics-lines"></div>'
        this.$lines = this.$el.querySelector('.play.lyrics-lines')
        this.text = ''
        this.index = 0
        this.lyrics = []
        this.elapsed = 0
        this.reset(this.text)
    }

    start(){
        this.intervalId = setInterval(this.update.bind(this),1000)
    }
    pause(){
        clearInterval(this.intervalId)
    }
    update(){
        this.elapsed += 1
        if(this.index === this.lyrics.length-1) return this.reset()
        for(let i=this.index+1; i<this.lyrics.length; i++){
            let seconds = this.getSeconds(this.lyrics[i])
            if (
                this.elapsed === seconds && //当前时间===逝去的时间
                (!this,this.lyrics[i+1] || this.elapsed < this.getSeconds(this.lyrics[i+1])) 
            ){
                this.$lines.children[this.index].classList.remove('active')
                this.$lines.children[i].classList.add('active')
                this.index = 1
                break
            }
        }
        if(this.index > 2){
            let y = -(this.index-2) * this.LINE_HEIGHT
            this.$lines.style.transform = `translateY(${y}px`
        }
    }
    render(){
        //[00:00.10]丑八怪 (《如果我爱你》电视剧插曲) - 薛之谦 (Joker),提取歌词部分
        let html = this.lyrics.map(line =>`
          <div class="player-lyrics-line">${line.slice(10)}</div>
        `).join('')
        this.$lines.innerHTML = html
    }

    reset(text){
        this.pause()
        this.index = 0
        this.elapsed = 0
        if(text){
            this.text = this.formatText(text) || ''
            this.lyrics = this.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm) || []  //gm全局多行
            if(this.lyrics.length){
                this.render()
                this.$lines.children[this.index].classList.add('active')
            }
        }
    }
    restart(){
        this.reset()
        this.start()
    }
    getSeconds(line){
        //每句歌词对应的时间(每一句歌词在第几秒出现)，+时间转成数字
        return +line.replace(/^\[(\d{2}):(\d{2}0.*)/, (match,p1,p2) => 60*(+p1) + (+p2))
    }
}


LyricsPlayer.prototype.LINE_HEIGHT = 42
/*
[ti:丑八怪]
[ar:薛之谦]
[al:意外]
[by:]
[offset:0]
[00:00.10]丑八怪 (《如果我爱你》电视剧插曲) - 薛之谦 (Joker)
[00:00.20]词：甘世佳
[00:00.30]曲：李荣浩
[00:00.40]编曲：李荣浩
[00:00.50]
[00:20.30]如果世界漆黑 其实我很美
[00:22.73]
[00:23.59]在爱情里面进退 最多被消费
[00:26.66]
[00:27.41]无关痛痒的是非
[00:29.41]又怎么不对 无所谓
[00:32.58]
[00:35.58]如果像你一样 总有人赞美
[00:38.34]
[00:39.03]围绕着我的卑微 也许能消退
[00:42.14]
[00:42.97]其实我并不在意 有很多机会
[00:45.93]
[00:46.44]像巨人一样的无畏
[00:49.25]放纵我 心里的鬼
[00:50.87]可是我不配
[00:52.86]
[00:54.12]丑八怪 能否别把灯打开
[01:00.54]
[01:01.73]我要的爱 出没在
[01:06.22]漆黑一片的舞台
[01:08.42]
[01:09.23]丑八怪 在这暧昧的时代
[01:15.91]
[01:17.34]我的存在 像意外
[01:22.59]
[01:37.54]有人用一滴泪 会红颜祸水
[01:40.27]
[01:41.09]有人丢掉称谓 什么也不会
[01:43.96]
[01:44.89]只要你足够虚伪 就不怕魔鬼 对不对
[01:50.08]
[01:53.07]如果剧本写好 谁比谁高贵
[01:55.62]
[01:56.43]我只能沉默以对 美丽本无罪
[01:59.55]
[02:00.24]当欲望开始贪杯 有更多机会
[02:03.80]像尘埃一样的无畏 化成灰 谁认得谁
[02:08.29]管他配不配
[02:10.41]
[02:11.72]丑八怪 能否别把灯打开
[02:17.97]
[02:19.21]我要的爱 出没在
[02:23.58]漆黑一片的舞台
[02:25.76]
[02:26.64]丑八怪 在这暧昧的时代
[02:33.32]
[02:34.81]我的存在 不意外
[02:39.71]
[03:01.82]丑八怪 其实见多就不怪
[03:08.31]
[03:09.68]放肆去high 用力踩
[03:13.80]那不堪一击的洁白
[03:15.98]
[03:16.98]丑八怪 这是我们的时代
[03:23.60]
[03:25.21]我不存在 才意外"
*/

//进度条
class ProgressBar{
    constructor(el,duration,start){
        this.$el = el
        this.elapsed = 0 
        this.duration = duration || 0
        this.progress = 0
        this.render()
        this.$progress = this.$el.querySelector('.progress-bar-progress')
        this.$elapsed = this.$el.querySelector('.progress-elapsed') //过去的时间
        this.$duration = this.$el.querySelector('.progress-duration') //持续的时间
        this.$elapsed.innerText = this.formatTime(this.elapsed) //时间格式化
        this.$duration.innerText = this.formatTime(this.duration)
        if(start) this.start()
    }

    render(){
        this.$el.innerHTML = `
            <div class="progress-time progress-elapsed"></div>
              <div class="progress-bar">
                <div class="progress-bar-progress"></div>
              </div>
            <div class="progress-time progress-duration"></div>
        `
    }

    formatTime(seconds){
        let mins = Math.floor(seconds / 60)
        let secs = Math.floor(seconds % 60)
        if(mins < 10) mins = '0' + mins
        if(secs < 10) secs = '0' + secs
        return `${mins}:${secs}`
    }

    start(){
        this.pause()
        this.intervalId = setInterval(this.update.bind(this),1000)
    }
    pause(){
        clearInterval(this.intervalId)
    }
    update(){
        console.log('update')
        this.elapsed += 1
        if(this.elapsed >= this.duration) this.reset()
        this.progress = this.elapsed / this.duration
        this.$progress.style.transform = `translate(${this.progress*100 - 100}%)`
        this.$elapsed.innerText = this.formatTime(this.elapsed)
    }
    //换一首新歌的时候要重置进度条
    reset(duration){
        this.pause()
        this.elapsed = 0
        this.progress = 0
        if(duration){
            this.duration = +duration
            this.$duration.innerText = this.formatTime(this.duration)
        }
    }
}