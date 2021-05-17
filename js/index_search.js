//搜索页面部分
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
// tab栏切换部分
var tab = document.querySelector('.tab');
var tab_box = document.querySelectorAll('.tab_box');
var tab_span = tab.querySelectorAll('span');
for (var i = 0; i < tab_span.length; i++) {
    tab_span[i].setAttribute('index', i);
    tab_span[i].onclick = function () {
        for (var i = 0; i < tab_span.length; i++) {
            tab_span[i].className = '';
        }
        this.className = 'selected';
        var index = this.getAttribute('index');
        for (var i = 0; i < tab_box.length; i++) {
            tab_box[i].style.display = 'none';
        }
        tab_box[index].style.display = 'block';
    }
}
//搜索呈现的信息部分
var keywords = sessionStorage.getItem('keywords');//获取搜索关键词
var song_name = document.querySelectorAll('.song_name');
var ar_name = document.querySelectorAll('.ar_name');
var al_name = document.querySelectorAll('.al_name');
var time = document.querySelectorAll('.time');
//歌手信息部分
var singer_img = document.querySelectorAll('.singer_img');
var singer_name = document.querySelectorAll('.singer_name');
var singer = document.querySelectorAll('.singer');
function result(u, content, type) {
    $ajax({
        url: 'https://autumnfish.cn/' + u + content + '&type=' + type,
        // data: {
        //     keywords: content,
        // },
        success: function (response) {
            var res = JSON.parse(response).result;
            //console.log(res);
            //tab栏的歌曲部分
            for (var i = 0; i < res.songs.length; i++) {
                song_name[i].setAttribute('index', i);
                song_name[i].innerHTML = res.songs[i].name;
                ar_name[i].innerHTML = res.songs[i].ar[0].name;
                al_name[i].innerHTML = res.songs[i].al.name;
                //点击歌名跳转播放
                song_name[i].onclick = function () {
                    var index = this.getAttribute('index');
                    window.sessionStorage.setItem('song_id', res.songs[index].id);
                    window.sessionStorage.setItem('song_pic', res.songs[index].al.picUrl);
                    window.sessionStorage.setItem('singer_name', res.songs[index].ar[0].name);
                    location.assign('play.html');
                }
            }
        }
    })
}
function singer_result(u, content, type) {
    $ajax({
        url: 'https://autumnfish.cn/' + u + content + '&type=' + type,
        // data: {
        //     keywords: content,
        // },
        success: function (response) {
            var res = JSON.parse(response).result;
            console.log(res);
            //歌手信息
            for (var i = 0; i < singer.length; i++) {
                singer_img[i].setAttribute('index', i);
                if (res.artists[i].name) {
                    singer_img[i].src = res.artists[i].picUrl;
                }
                else {
                    singer[i].style.display = 'none';
                }
                singer_name[i].innerHTML = res.artists[i].name + '<span>🎵</span>';
                console.log(res);
                singer_img[i].onclick = function () {
                    var index = this.getAttribute('index');
                    //存储歌手id号
                    window.sessionStorage.setItem('singer_id', res.artists[index].id);
                    location.assign('singer.html');
                }
            }
        }
    })
}
// for (var i = 0; i < singer_img.length; i++) {
//     console.log(singer_img[i].src);
//     if (singer_img[i].src == "file:///C:/Users/82068/Desktop/text/nginx-1.20.0/cat/images/lazy.png") {
//         singer[i].style.display = 'none';
//     }
// }
result('/cloudsearch?keywords=', keywords, 1);
singer_result('/cloudsearch?keywords=', keywords, 100);
//歌单信息部分
var list_img = document.querySelectorAll('.list_img');
var list_name = document.querySelectorAll('.list_name');
var creator = document.querySelectorAll('.creator');
var collect = document.querySelectorAll('.collect');
function songlist_result(u, content, type) {
    $ajax({
        url: 'https://autumnfish.cn/' + u + content + '&type=' + type,
        // data: {
        //     keywords: content,
        // },
        success: function (response) {
            var list_result = JSON.parse(response).result.playlists;
            for (var i = 0; i < list_img.length; i++) {
                list_name[i].setAttribute('index', i);
                list_img[i].src = list_result[i].coverImgUrl;
                list_name[i].innerHTML = list_result[i].name;
                creator[i].innerHTML = 'by:   ' + list_result[i].creator.nickname;
                collect[i].innerHTML = '收藏量：' + list_result[i].bookCount;
                list_name[i].onclick = function () {
                    var index = this.getAttribute('index');
                    window.sessionStorage.setItem('rec_id', list_result[index].id);
                    location.assign('index_song.html');
                }
            }
        }
    })
}
songlist_result('/cloudsearch?keywords=', keywords, 1000);
//大搜索栏搜索部分
var input_box = document.querySelector('.input_box');
var input_btn = document.querySelector('.input_btn');
let keys = [];
input_box.oninput = function () {
    if (input_box.value != '') {
        keys = input_box.value;
        input_btn.onclick = function () {
            result('/cloudsearch?keywords=', keys, 1);//搜索歌曲信息
            window.sessionStorage.setItem('keywords', keys);
            singer_result('/cloudsearch?keywords=', keys, 100);
            songlist_result('/cloudsearch?keywords=', keys, 1000);
        }
    }
}

