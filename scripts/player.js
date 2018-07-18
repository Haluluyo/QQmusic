//播放器界面
class MusicPlayer {
    constructor(el){
        this.$el = el
        this.$el.addEventListener('click',this)
        this.creatAudio()
        this.lyrics = new LyricsPlayer(this.$el.querySelector('.player-lyrics'), this.$audio)
        this.progress = new ProgressBar(this.$el.querySelector('.progress'))
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
        }
    }
    onPlay(event){
        event.target.classList.add('icon-pause')
        event.target.classList.remove('icon-play')
    }
    onPause(event){
        event.target.classList.add('icon-play')
        event.target.classList.remove('icon-pause')
    }

    play(){

    }
    show(){

    }
    hide(){

    }


}

//歌词
class LyricsPlayer{

}

//进度条
LyricsPlayer.prototype.LINE_HEIGHT = 42




class ProgressBar{
    constructor(el,duration){
        this.$el = el
        this.elapsed = 0 
        this.duration = duration || 0
        this.progress = 0
        this.render()
        this.$progress = this.$el.querySelector('.progress-bar-progress')
        this.$elapsed = this.$el.querySelector('progress-elapsed') //过去的时间
        this.$duration = this.$el.querySelector('progress-duration') //持续的时间
        this.$elapsed.innerText = this.formatTime(this.elapsed) //时间格式化
        this.$duration.innerText = this.formatTime(this.duration)
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
}