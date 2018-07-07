/* 伪造请求 
   npm install express --save
   npm install request --save
   npm install request-promise --save
   npm install -g nodemon
*/
const express = require('express')
const request = require('request-promise')
const app = express()

const HEADERS = {
    'accept': 'application/json',
    'authority': 'c.y.qq.com',
    'origin': 'https://m.y.qq.com',
    'referer': 'https://m.y.qq.com/m/index.html',
    'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36'
}
app.get('/', async(req,res) => {
    const url = `https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${+ new Date()}` //模板字符串  +：把时间转成数字
    try{
        res.json(await request({
            uri: url,
            json: true,
            headers: HEADERS
            /*         {
            
                'accept': 'application/json',
                'authority': 'c.y.qq.com',
                'origin': 'https://m.y.qq.com',
                'referer': 'https://m.y.qq.com/m/index.html',
                'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36'
            }  */ 
        }))
    } catch(e){
        res.json({error: e.message})
    }
})
app.get('/search', async(req,res) => {
    const {keyword, page} = req.query
    const url = `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${encodeURIComponent(keyword)}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=${page}&remoteplace=txt.mqq.all&_=${+ new Date()}`
    //搜索的关键字w=%E8%96%9B%E4%B9%8B%E8%B0%A6  encodeURIComponent('薛之谦')=>%E8%96%9B%E4%B9%8B%E8%B0%A6
    try{
        res.json(await request({
            uri: url,
            json: true,
            headers: HEADERS
        }))
    } catch(e){
        res.json({error: e.message})
    }
})

app.listen(3000)


//curl 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=%E8%96%9B%E4%B9%8B%E8%B0%A6&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1530951053679' -H 'origin: https://y.qq.com' -H 'accept-encoding: gzip, deflate, sdch, br' -H 'accept-language: zh-CN,zh;q=0.8' -H 'user-agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36' -H 'accept: application/json' -H 'referer: https://y.qq.com/m/index.html' -H 'authority: c.y.qq.com' -H 'cookie: cuid=4772457638; _ga=GA1.2.1851832934.1475499234; pgv_pvi=2508388352; RK=hvUHH9SqfB; tvfe_boss_uuid=061597efa32c4cf1; pac_uid=1_1163172265; eas_sid=61q5S0t3e2g9b6I7R99571q5N6; msuid=j6ltmpx3osjupacxa41pbjl39teju7w2ldolf6ov; ptcz=661a5d5a6bd49b89e09a9a3ad5a2d7f7edcfa0d0d9b77cca0cab7b429ebe07e8; pt2gguin=o1163172265; o_cookie=1163172265; pgv_si=s2665004032; qqmusic_fromtag=10; yqq_stat=0; ts_refer=ADTAGmyqq; pgv_info=ssid=s2759816826; ts_last=y.qq.com/m/index.html; pgv_pvid=5955131960; ts_uid=7823394477' --compressed
//curl 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1530947335988' -H 'origin: https://y.qq.com' -H 'accept-encoding: gzip, deflate, sdch, br' -H 'accept-language: zh-CN,zh;q=0.8' -H 'user-agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36' -H 'accept: application/json' -H 'referer: https://y.qq.com/m/index.html' -H 'authority: c.y.qq.com' -H 'cookie: cuid=4772457638; _ga=GA1.2.1851832934.1475499234; pgv_pvi=2508388352; RK=hvUHH9SqfB; tvfe_boss_uuid=061597efa32c4cf1; pac_uid=1_1163172265; eas_sid=61q5S0t3e2g9b6I7R99571q5N6; msuid=j6ltmpx3osjupacxa41pbjl39teju7w2ldolf6ov; ptcz=661a5d5a6bd49b89e09a9a3ad5a2d7f7edcfa0d0d9b77cca0cab7b429ebe07e8; pt2gguin=o1163172265; o_cookie=1163172265; pgv_si=s2665004032; qqmusic_fromtag=10; yqq_stat=0; pgv_info=ssid=s2759816826; ts_refer=ADTAGmyqq; pgv_pvid=5955131960; ts_uid=7823394477' --compressed