//ES6
(function(){
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
    window.slider = slider
})()