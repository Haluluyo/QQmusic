class HotKey{
    constructor(el){
        this.$el = el
    }

    start(){
        fetch('http://localhost:3000/search/hotKey')
          .then(res => res.json())
          .then(json => this.render(json.data))
    }

    render(data){
        let keys = data.hotkey;
        //console.log(keys)
        let html = this.random(keys, 6).map(key => `<a href="#" class="tag tag-keyword">${key.k}</a>`)
        this.$el.innerHTML = `<a href="#" class="tag tag-hot">${data.special_key}</a>` + html                       
    }

    /*在json.data.hotkey中随机选取count个数据*/
    random(arr, count){
        let array = []
        //let len = Math.min(count, arr.length);
        for(let i = 0; i < count; i++){
            let temp = arr;
            let randomKey = Math.floor(Math.random() * temp.length);
            //math.floor 返回小于参数的最大整数； temp.length即 传进参数arr(data.hotkey)的长度，为30
            array[i] = temp[randomKey];
            arr.splice(randomKey, 1);
        }
        console.log(array)
        return array;
    }
}