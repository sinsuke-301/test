// 获取存储的数据
//window.localStorage.getItem('img_url');
image.src = sessionStorage.getItem('img_url');
//window.localStorage.getItem('nickname');
login_name.innerHTML = sessionStorage.getItem('nickname');
var my_id1 = [];//获取用户id
my_id1 = sessionStorage.getItem('my_id');
console.log(my_id1);
//获取用户信息
var phonewords = sessionStorage.getItem('phonewords');
var secretwords = sessionStorage.getItem('secretwords');
// console.log(phonewords);
// console.log(secretwords);

//个人主页部分
var person_head = document.querySelector('.person_head');
var person_name = document.querySelector('.name');
person_head.src = image.src;
person_name.innerHTML = login_name.innerHTML;

function post() {
    //alert('成功发送了请求');
}
let xhr = [];//获取用户信息
function person(address, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback();
            xhr = JSON.parse(this.responseText).profile;
        }
    };
    let url = baseUrl + address;
    xhttp.open("GET", url, false);
    xhttp.send('{}');
}
person('user/detail?uid=' + my_id1, post);
var fans = document.querySelector('.fans');
fans.innerHTML = '关注：' + xhr.follows + ' | 粉丝：' + xhr.followeds;
//console.log(xhr.follows);
//console.log(xhr.followeds);

//获取用户最近在听
let my_song = [];
function my_songlist(address, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback();
            my_song = JSON.parse(this.responseText).weekData;
        }
    };
    let url = baseUrl + address;
    xhttp.open("GET", url, false);
    xhttp.send('{}');
}
my_songlist('user/record?uid=' + my_id1 + '&type=1', post);
console.log(my_song);
var fav_music = document.querySelector('.fav_music');
var song_name = fav_music.querySelectorAll('.song_name');
var ar_name = fav_music.querySelectorAll('.ar_name');
var al_name = fav_music.querySelectorAll('.al_name');
for (var i = 0; i < 10; i++) {
    //建立自定义属性
    song_name[i].setAttribute('index', i);
    song_name[i].innerHTML = my_song[i].song.name;
    ar_name[i].innerHTML = my_song[i].song.ar[0].name;
    al_name[i].innerHTML = my_song[i].song.al.name;
    //测试点击歌曲跳转音乐播放界面
    song_name[i].addEventListener('click', function () {
        //记录浏览历史，可实现后退功能
        location.assign('play.html');
        //获取自定义属性
        var index = this.getAttribute('index');
        console.log(index);
        //获取点击歌曲的id并进行存储 存储歌曲名称 歌手
        console.log(my_song[index].song.id);
        window.sessionStorage.setItem('song_id', my_song[index].song.id);
        window.sessionStorage.setItem('song_pic', my_song[index].song.al.picUrl);
        window.sessionStorage.setItem('song_name', my_song[index].song.name);
        window.sessionStorage.setItem('singer_name', my_song[index].song.ar[0].name);
    })
}
// 我创建的歌单部分
let my_playlist = [];
function playlist(address, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback();
            my_playlist = JSON.parse(this.responseText).playlist;
        }
    };
    let url = baseUrl + address;
    xhttp.open("GET", url, false);
    xhttp.send('{}');
}
var songlist = document.querySelector('.songlist');
var songlist_img = songlist.querySelectorAll('.image_box');
var songlis_a = songlist.querySelectorAll('.image_a');
playlist('/user/playlist?uid=' + my_id1, post);
for (var i = 0; i < 10; i++) {
    songlist_img[i].src = my_playlist[i].coverImgUrl;
    songlis_a[i].innerHTML = my_playlist[i].name;
}
window.addEventListener('load', function () {
    // 我的音乐网页：收藏歌单的播放效果
    var songlist = document.querySelector('.songlist');
    var song_boxes = songlist.querySelectorAll('.image');
    var song_broadcast = songlist.querySelectorAll('.broadcast');
    var song_images = songlist.querySelectorAll('.image_box');
    for (var i = 0; i < song_boxes.length; i++) {
        song_boxes[i].setAttribute('index', i);
        song_broadcast[i].style.transform = "scale(" + 0 + ")";
        song_boxes[i].onmouseover = function () {
            for (var i = 0; i < song_boxes.length; i++) {
                //所有图片恢复原先的尺寸
                song_images[i].style.transform = "scale(" + 1 + ")";
                //获取当前盒子的索引号
                var index = this.getAttribute('index');
                song_images[index].style.transform = "scale(" + 1.1 + ")";
                song_broadcast[index].style.transform = "scale(" + 1 + ")";
                song_boxes[index].onmouseleave = function () {
                    song_images[index].style.transform = "scale(" + 1 + ")";
                    song_broadcast[index].style.transform = "scale(" + 0 + ")";
                }
            }
        }
    }
    //tab栏切换部分
    var tab = document.querySelectorAll('.tab');
    var tab_box = document.querySelectorAll('.tab_box');
    for (var i = 0; i < tab.length; i++) {
        tab[i].setAttribute('index', i);
        tab[i].onclick = function () {
            for (var i = 0; i < tab.length; i++) {
                tab[i].className = 'tab';
            }
            this.className = 'tab selected';
            var index = this.getAttribute('index');
            for (var i = 0; i < tab.length; i++) {
                tab_box[i].style.display = 'none';
            }
            tab_box[index].style.display = 'block';
        }
    }
})
