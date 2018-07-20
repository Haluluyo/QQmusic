//播放器界面
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

    play(){

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

}

//进度条
LyricsPlayer.prototype.LINE_HEIGHT = 42




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