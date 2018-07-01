class Slider { //组件思想，用class方便以后复用
    constructor(options={}){
        this.$el = options.el
        console.log('$el',this.$el)
        //this.$el.innerHTML = ''
        this.slides = options.slides
        //this.$wrap = this.$el.firstElementChildren
        //this.length = this.$wrap.children.length
        //this.$wrap.style.width = `${this.length * 100}%`
        this.interval = options.interval || 3000
        this.index = 0
        this.render()
        this.start()
    }
    render(){
        this.$el.innerHTML = `<ul class="slider-wrap"></ul>`
        this.$wrap = this.$el.firstElementChild
        console.log(this.slides.length)
        this.$wrap.style.width = `${this.slides.length * 100}%`
        this.$wrap.innerHTML = this.slides.map(slide =>
            `<li class="slider-items">
                 <a href="${slide.link}">
                   <img src="${slide.image}" alt="">
                </a>
               </li>`
        ).join('')
    }
    start(){
        setInterval(this.next.bind(this),this.interval)
    }
    next(){
        this.index += 1
        if(this.index === this.slides.length){
            this.$wrap.style.transform = `translate(0)`
            this.index = 0
            return
        }
        let x = `-${this.index*100/this.slides.length}%`
        this.$wrap.style.transform = `translate(${x})`
    }
}

