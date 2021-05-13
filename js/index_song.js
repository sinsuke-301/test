//let baseUrl = 'https://autumnfish.cn/';
//获取用户的头像和用户名
var login_img = document.getElementById('login_img');
var login_name = document.getElementById('login_name');
login_img.src = sessionStorage.getItem('img_url');
login_name.innerHTML = sessionStorage.getItem('nickname');

//首页页面logo的跳转
var logo = document.querySelector('.logo');
logo.onclick = function () {
    location.assign('index.html');
}

//获取当前歌单信息 引用my_music.js的函数
//获取歌单id号
let rec_id = [];
//let rec_str = [];
rec_id = sessionStorage.getItem('rec_id');
console.log(rec_id);
// var head = document.querySelector('.head');
// var head_img = document.querySelector('.head_img');
// var ar_img = document.querySelector('.ar_img');
// var rec_title = head.querySelector('h1');
// var rec_ar = head.querySelector('h4');
// var rec_tag = head.querySelector('.rec_tag');
console.log(rec_id);
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
            var rec_title = head.querySelector('h1');
            var rec_ar = head.querySelector('h4');
            var rec_tag = head.querySelector('.rec_tag');
            head_img.src = rec_str.coverImgUrl;//歌单封面
            ar_img.src = rec_str.creator.avatarUrl;//歌单创建者
            rec_title.innerHTML = rec_str.name;//标题
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
                    //console.log(song_id_all); //这个bug一旦运行就会出现跨域问题！！
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
            for (var i = 0; i < 8; i++) {
                user_img[i].src = rec_str.subscribers[i].avatarUrl;
            }
            //获取该歌单的简介
            var brief = document.querySelector('.brief');
            // brief.innerHTML = rec_str.description;
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
rec_songlist('/playlist/detail', rec_id);
// function rec_songlist(address, callback) {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             callback();
//             rec_str = JSON.parse(this.responseText).playlist;
//         }
//     };
//     let url = baseUrl + address;
//     xhttp.open("GET", url, false);
//     xhttp.send('{}');
// }
//rec_songlist('/playlist/detail?id=' + rec_id, post);
// head_img.src = rec_str.coverImgUrl;//歌单封面
// ar_img.src = rec_str.creator.avatarUrl;//歌单创建者
// rec_title.innerHTML = rec_str.name;//标题
// rec_ar.innerHTML = rec_str.creator.nickname;//用户名
// for (var i = 0; i < rec_str.tags.length; i++) {
//     rec_tag.innerHTML = rec_tag.innerHTML + rec_str.tags[i] + '&nbsp;';
// }
// var subscribedCount = document.querySelector('.subscribedCount');
// subscribedCount.innerHTML = '收藏：' + rec_str.subscribedCount;
// var playCount = document.querySelector('.playCount');
// playCount.innerHTML = '播放：' + rec_str.playCount;

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
// //导入前十首歌曲
// var song_name = document.querySelectorAll('.song_name');
// var ar_name = document.querySelectorAll('.ar_name');
// var al_name = document.querySelectorAll('.al_name');
// for (var i = 0; i < 10; i++) {
//     song_name[i].setAttribute('index', i);
//     song_name[i].innerHTML = rec_str.tracks[i].name;
//     ar_name[i].innerHTML = rec_str.tracks[i].ar[0].name;
//     al_name[i].innerHTML = rec_str.tracks[i].al.name;
//     //测试点击歌曲跳转音乐播放界面
//     song_name[i].addEventListener('click', function () {
//         //记录浏览历史，可实现后退功能
//         location.assign('play.html');
//         //获取自定义属性
//         var index = this.getAttribute('index');
//         //获取点击歌曲的id并进行存储 存储歌曲名称 歌手
//         //console.log(song_id_all); //这个bug一旦运行就会出现跨域问题！！
//         window.sessionStorage.setItem('song_id', rec_str.tracks[index].id);
//         window.sessionStorage.setItem('song_pic', rec_str.tracks[index].al.picUrl);
//         window.sessionStorage.setItem('song_name', rec_str.tracks[index].name);
//         window.sessionStorage.setItem('singer_name', rec_str.tracks[index].ar[0].name);
//         //存储点击歌曲的位置
//         window.sessionStorage.setItem('index', index);
//     })
// }
// //获取喜欢该歌单的用户
// var user_img = document.querySelectorAll('.user_img');
// for (var i = 0; i < 8; i++) {
//     user_img[i].src = rec_str.subscribers[i].avatarUrl;
// }
// //获取该歌单的简介
// var brief = document.querySelector('.brief');
// // brief.innerHTML = rec_str.description;
// let base_str = [];
// base_str = rec_str.description
// let brief_str = [];
// brief_str = base_str.split('\n');
// for (var i = 0; i < brief_str.length; i++) {
//     var li = document.createElement('li');//创建li节点
//     li.innerHTML = brief_str[i];
//     brief.appendChild(li);
// }
// console.log(brief_str);

//若一部分元素小于指定数量，令其隐藏（不占用位置）
//获取相关歌单推荐
let rel_list = [];
function rel_songlist(address, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback();
            rel_list = JSON.parse(this.responseText).playlists;
        }
    };
    let url = baseUrl + address;
    xhttp.open("GET", url, false);
    xhttp.send('{}');
}
rel_songlist('/related/playlist?id=' + rec_id, post);
var rel_img = document.querySelectorAll('.rel_img');
var rel_name = document.querySelectorAll('.rel_name');
var rel_arname = document.querySelectorAll('.rel_arname');
var relevantlist = document.querySelector('.relevantlist');
var rel_li = relevantlist.querySelectorAll('li');
for (var i = 0; i < 4; i++) {
    //rel_name[i].setAttribute('index', i);
    rel_img[i].src = rel_list[i].coverImgUrl;
    rel_name[i].innerHTML = rel_list[i].name;
    rel_arname[i].innerHTML = 'by ' + rel_list[i].creator.nickname;
    // if (rel_name[i].innerHTML == '1') {
    //     var index = rel_name[i].getAttribute('index');
    //     rel_li[index].className = 'disappear';
    // }
    // else {
    //     var index = rel_name[i].getAttribute('index');
    //     rel_li[index].className = '';
    // }
}
//歌单评论部分
let hot_str = [];
//热门评论部分 
function hot_reviews(address, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback();
            hot_str = JSON.parse(this.responseText).data.comments;
        }
    };
    let url = baseUrl + address;
    xhttp.open("GET", url, false);
    xhttp.send('{}');
}
hot_reviews('/comment/new?type=2&id=' + rec_id + '&sortType=2', post);
console.log(hot_str);
var hot_img = document.querySelectorAll('.hot_img');
var hot_name = document.querySelectorAll('.hot_name');
var hot_content = document.querySelectorAll('.hot_content');
for (var i = 0; i < 5; i++) {
    hot_img[i].src = hot_str[i].user.avatarUrl;
    hot_name[i].innerHTML = hot_str[i].user.nickname;
    hot_content[i].innerHTML = hot_str[i].content;
}
//最新评论部分
let new_str = [];
function new_reviews(address, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback();
            new_str = JSON.parse(this.responseText).data.comments;
        }
    };
    let url = baseUrl + address;
    xhttp.open("GET", url, false);
    xhttp.send('{}');
}
new_reviews('/comment/new?type=2&id=' + rec_id + '&sortType=3', post);
var new_img = document.querySelectorAll('.new_img');
var new_name = document.querySelectorAll('.new_name');
var new_content = document.querySelectorAll('.new_content');
for (var i = 0; i < 5; i++) {
    new_img[i].src = new_str[i].user.avatarUrl;
    new_name[i].innerHTML = new_str[i].user.nickname;
    new_content[i].innerHTML = new_str[i].content;
}
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
    review_send('/comment?t=1&type=2&id=' + rec_id + '&content=' + content + '&cookie=' + user_cookie, post);
}

