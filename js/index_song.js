//let baseUrl = 'https://autumnfish.cn/';
//获取用户的头像和用户名
var login_img = document.getElementById('login_img');
var login_name = document.getElementById('login_name');
login_img.src = sessionStorage.getItem('img_url');
login_name.innerHTML = sessionStorage.getItem('nickname');

//首页页面logo的跳转
var logo = document.querySelector('.logo');
//登陆部分
var login_box = document.getElementById('login_box');
var close_btn = document.querySelector('.close');
var my_music = document.querySelector('.my_music');
var login_btn1 = document.querySelector('.login_btn1');
login_box.style.display = 'none';
my_music.onclick = function () {
    //判断是否登录
    if (sessionStorage.getItem('login_name') || sessionStorage.getItem('nickname')) {
        location.assign('Mymusic.html');
    }
    else {
        login_box.style.display = 'block';
    }
}
login_btn1.onclick = function () {
    //判断是否登录
    if (sessionStorage.getItem('login_name') || sessionStorage.getItem('nickname')) {
        location.assign('Mymusic.html');
    }
    else {
        login_box.style.display = 'block';
    }
}
close_btn.onclick = function () {
    login_box.style.display = 'none';
}
//二次存储 跳转首页保存登陆状态
window.sessionStorage.setItem('login_img', login_img.src);
window.sessionStorage.setItem('login_name', login_name.innerHTML);
logo.onclick = function () {
    location.assign('index.html');
}
//获取当前歌单信息 引用my_music.js的函数
//获取歌单id号
let rec_id = [];
//let rec_str = [];
rec_id = sessionStorage.getItem('rec_id');
console.log(rec_id);
console.log(rec_id);
//推荐的歌单部分
function rec_songlist(u, song_id) {
    $ajax({
        url: 'https://autumnfish.cn/' + u,
        data: {
            id: song_id
        },
        success: function (response) {
            var rec_str = JSON.parse(response).playlist;
            console.log(rec_str);
            var head = document.querySelector('.head');
            var head_img = document.querySelector('.head_img');
            var ar_img = document.querySelector('.ar_img');
            var rec_head = document.querySelector('.rec_head');
            var rec_ar = document.querySelector('.rec_ar');
            var rec_tag = document.querySelector('.rec_tag');
            head_img.src = rec_str.coverImgUrl;//歌单封面
            ar_img.src = rec_str.creator.avatarUrl;//歌单创建者
            console.log(rec_str.name);
            console.log(rec_str.creator.nickname);
            rec_head.innerHTML = rec_str.name;//标题
            rec_ar.innerHTML = rec_str.creator.nickname;//用户名
            for (var i = 0; i < rec_str.tags.length; i++) {
                rec_tag.innerHTML = rec_tag.innerHTML + rec_str.tags[i] + '&nbsp;';
            }
            var subscribedCount = document.querySelector('.subscribedCount');
            subscribedCount.innerHTML = '收藏：' + rec_str.subscribedCount;
            var playCount = document.querySelector('.playCount');
            playCount.innerHTML = '播放：' + rec_str.playCount;
            //导入前十首歌曲
            var song_name = document.querySelectorAll('.song_name');
            var ar_name = document.querySelectorAll('.ar_name');
            var al_name = document.querySelectorAll('.al_name');
            for (var i = 0; i < 10; i++) {
                song_name[i].setAttribute('index', i);
                song_name[i].innerHTML = rec_str.tracks[i].name;
                ar_name[i].innerHTML = rec_str.tracks[i].ar[0].name;
                al_name[i].innerHTML = rec_str.tracks[i].al.name;
                //测试点击歌曲跳转音乐播放界面
                song_name[i].addEventListener('click', function () {
                    //记录浏览历史，可实现后退功能
                    location.assign('play.html');
                    //获取自定义属性
                    var index = this.getAttribute('index');
                    //获取点击歌曲的id并进行存储 存储歌曲名称 歌手
                    window.sessionStorage.setItem('song_id', rec_str.tracks[index].id);
                    window.sessionStorage.setItem('song_pic', rec_str.tracks[index].al.picUrl);
                    window.sessionStorage.setItem('song_name', rec_str.tracks[index].name);
                    window.sessionStorage.setItem('singer_name', rec_str.tracks[index].ar[0].name);
                    //存储点击歌曲的位置
                    window.sessionStorage.setItem('index', index);
                })
            }
            //获取喜欢该歌单的用户
            var user_img = document.querySelectorAll('.user_img');
            var lover_users = document.querySelector('.love_users');
            var user_box = document.querySelector('.user_box');
            var user_li = user_box.querySelectorAll('li');
            var love_warn = document.querySelector('.love_warn');
            for (var i = 0; i < rec_str.subscribers.length; i++) {
                user_img[i].src = rec_str.subscribers[i].avatarUrl;
            }
            if (!rec_str.subscribers.length) {
                love_warn.innerHTML = '无';
                for (var j = 0; j < 8; j++) {
                    user_li[j].style.display = 'none';
                }
            }
            else {
                for (var j = rec_str.subscribers.length; j < 8; j++) {
                    user_li[j].style.display = 'none';
                }
            }
            //获取该歌单的简介
            var brief = document.querySelector('.brief');
            let base_str = [];
            base_str = rec_str.description
            let brief_str = [];
            brief_str = base_str.split('\n');
            for (var i = 0; i < brief_str.length; i++) {
                var li = document.createElement('li');//创建li节点
                li.innerHTML = brief_str[i];
                brief.appendChild(li);
            }
            console.log(brief_str);

        }
    })
}
rec_songlist('playlist/detail', rec_id);
window.sessionStorage.setItem('rec_id', rec_id);
// 图标的显示部分
var icon_box = document.querySelectorAll('.icon_box');
var songlist_li = document.querySelectorAll('.songlist_li');
for (var i = 0; i < 10; i++) {
    songlist_li[i].setAttribute('index', i);
    icon_box[i].style.display = 'none';
    songlist_li[i].onmouseover = function () {
        for (var i = 0; i < 10; i++) {
            icon_box[i].style.display = 'none';
        }
        var index = this.getAttribute('index');
        icon_box[index].style.display = 'block';
        songlist_li[index].onmouseleave = function () {
            icon_box[index].style.display = 'none';
        }
    }
}

//若一部分元素小于指定数量，令其隐藏（不占用位置）
//获取相关歌单推荐
//let rel_list = [];
var rel_img = document.querySelectorAll('.rel_img');
var rel_name = document.querySelectorAll('.rel_name');
var rel_arname = document.querySelectorAll('.rel_arname');
var relevantlist = document.querySelector('.relevantlist');
var rel_li = relevantlist.querySelectorAll('li');
function rel_songlist(u) {
    $ajax({
        url: 'https://autumnfish.cn/' + u,
        success: function (response) {
            var rel_list = JSON.parse(response).playlists;
            for (var i = 0; i < rel_list.length; i++) {
                rel_name[i].setAttribute('index', i);
                rel_img[i].src = rel_list[i].coverImgUrl;
                rel_name[i].innerHTML = rel_list[i].name;
                rel_arname[i].innerHTML = 'by ' + rel_list[i].creator.nickname;
                //相关歌单推荐 点击渲染
                rel_name[i].onclick = function () {
                    var index = this.getAttribute('index');
                    rec_songlist('playlist/detail', rel_list[index].id);
                    hot_reviews('/comment/new?type=2&id=' + rel_list[index].id + '&sortType=2');
                    new_reviews('/comment/new?type=2&id=' + rel_list[index].id + '&sortType=3', post);
                    rel_songlist('/related/playlist?id=' + rel_list[index].id);
                }
            }
            for (var j = rel_list.length; j < 4; j++) {
                // rel_li[j].className = 'disappear';
                rel_li[j].style.display = 'none';
            }
        }
    })
}
rel_songlist('/related/playlist?id=' + rec_id, post);


//歌单评论部分
//let hot_str = [];
//热门评论部分 
var hot_img = document.querySelectorAll('.hot_img');
var hot_name = document.querySelectorAll('.hot_name');
var hot_content = document.querySelectorAll('.hot_content');
var hots = document.querySelector('.hots');
var hots_li = hots.querySelectorAll('li');
var hots_warn = hots.querySelector('.hots_warn');
function hot_reviews(u) {
    $ajax({
        url: 'https://autumnfish.cn/' + u,
        success: function (response) {
            var hot_str = JSON.parse(response).data.comments;
            for (var i = 0; i < hot_str.length; i++) {
                hot_img[i].src = hot_str[i].user.avatarUrl;
                hot_name[i].innerHTML = hot_str[i].user.nickname;
                hot_content[i].innerHTML = hot_str[i].content;
            }
            if (!hot_str.length) {
                hots_warn.innerHTML = '暂无评论';
                for (var j = 0; j < 5; j++) {
                    hots_li[j].style.display = 'none';
                }
            }
            else {
                for (var j = hot_str.length; j < 5; j++) {
                    hots_li[j].style.display = 'none';
                }
            }
        }
    })
}
hot_reviews('/comment/new?type=2&id=' + rec_id + '&sortType=2');
//console.log(hot_str);
//最新评论部分
//let new_str = [];
var new_img = document.querySelectorAll('.new_img');
var new_name = document.querySelectorAll('.new_name');
var new_content = document.querySelectorAll('.new_content');
var news = document.querySelector('.news');
var news_li = news.querySelectorAll('li');
var news_warn = news.querySelector('.news_warn');
function new_reviews(u) {
    $ajax({
        url: 'https://autumnfish.cn/' + u,
        success: function (response) {
            var new_str = JSON.parse(response).data.comments;
            for (var i = 0; i < new_str.length; i++) {
                new_img[i].src = new_str[i].user.avatarUrl;
                new_name[i].innerHTML = new_str[i].user.nickname;
                new_content[i].innerHTML = new_str[i].content;
            }
            if (!new_str.length) {
                news_warn.innerHTML = '暂无评论';
                for (var j = 0; j < 5; j++) {
                    news_li[j].style.display = 'none';
                }
            }
            else {
                for (var j = new_str.length; j < 5; j++) {
                    news_li[j].style.display = 'none';
                }
            }
        }
    })
}

new_reviews('/comment/new?type=2&id=' + rec_id + '&sortType=3');
//发送评论部分
var review_input = document.querySelector('.review_input');
var send = document.querySelector('.send');
var content = [];//存储要发送的评论
function review_send(address, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback();
        }
    };
    let url = baseUrl + address;
    xhttp.open("GET", url, false);
    xhttp.send('{}');
}
let user_cookie = [];//获取用户cookie
user_cookie = sessionStorage.getItem('user_cookie');
var remind = document.querySelector('.remind');//评论成功提醒
var remind_p = document.querySelector('.remind_p');
var remind_close = document.querySelector('.remind_close');
remind_close.onclick = function () {
    remind.style.display = 'none';
}
console.log(user_cookie);
review_input.oninput = function () {
    content = review_input.value;
}
review_input.onblur = function () {
    if (review_input.value == '') {
        content = '';
    }
}
send.onclick = function () {
    console.log(content);
    if (sessionStorage.getItem('user_cookie')) {
        if (content == '') {
            remind_p.innerHTML = '请先填写内容再发送哦~';
            remind.style.display = 'block';
        }
        else {
            review_send('/comment?t=1&type=2&id=' + rec_id + '&content=' + content + '&cookie=' + user_cookie, post);
            remind.style.display = 'block';
        }
    }
    else {
        remind_p.innerHTML = '请先登录再发送评论噢！';
        remind.style.display = 'block';
    }

}
//点击评论跳转到指定位置
var linkc = document.querySelector('#linkc')
var review_c = document.querySelector('#review_c')
function to(toEl) {
    // toEl 为指定跳转到该位置的DOM节点   
    let bridge = toEl;
    let body = document.body;
    let height = 0;
    // 计算该 DOM 节点到 body 顶部距离  
    do {
        height += bridge.offsetTop;
        bridge = bridge.offsetParent;
    }
    while (bridge !== body)
    // 滚动到指定位置  
    window.scrollTo({
        top: height,
        behavior: 'smooth'
    })
}
linkc.addEventListener('click', function () {
    to(review_c)
});

