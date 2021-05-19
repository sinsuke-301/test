// 获取存储的数据
image.src = sessionStorage.getItem('img_url');
login_name.innerHTML = sessionStorage.getItem('nickname');
var my_id1 = [];//获取用户id
my_id1 = sessionStorage.getItem('my_id');
console.log(my_id1);

//二次存储 跳转首页保存登陆状态
window.sessionStorage.setItem('login_img', login_img.src);
window.sessionStorage.setItem('login_name', login_name.innerHTML);

//个人主页部分
var person_head = document.querySelector('.person_head');
var person_name = document.querySelector('.name');
person_head.src = image.src;
person_name.innerHTML = login_name.innerHTML;
//点击logo返回首页
var logo = document.querySelector('.logo');
logo.onclick = function () {
    //记录浏览历史，可实现后退功能
    location.assign('index.html');
}
function post() {
    //alert('成功发送了请求');
}
//let xhr = [];
function person(u, my_id1) {
    $ajax({
        url: baseUrl + u,
        data: {
            uid: my_id1
        },
        success: function (response) {
            var xhr = JSON.parse(response).profile;//获取用户信息
            var fans = document.querySelector('.fans');
            fans.innerHTML = '关注：' + xhr.follows + ' | 粉丝：' + xhr.followeds;
        }
    })
}
person('user/detail', my_id1);
//获取用户最近在听
let my_song = [];
var fav_music = document.querySelector('.fav_music');
var song_name = fav_music.querySelectorAll('.song_name');
var ar_name = fav_music.querySelectorAll('.ar_name');
var al_name = fav_music.querySelectorAll('.al_name');
var time = document.querySelectorAll('.time');
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
//获取音乐的时长 传递song_id参数
var music_box = document.querySelector('.music_box');
function music_time(song_id, text) {
    music_box.src = 'https://music.163.com/song/media/outer/url?id=' + song_id + '.mp3';
    music_box.load();
    console.log(song_id);
    music_box.addEventListener('loadedmetadata', function () {
        let hour = Math.floor(music_box.duration / 3600);
        let other = music_box.duration % 3600;
        let minute = Math.floor(other / 60);
        let second = Math.floor(other % 60);
        (hour < 10) && (hour = "0" + hour);
        (minute < 10) && (minute = "0" + minute);
        (second < 10) && (second = "0" + second);
        text.innerHTML = minute + ':' + second;
        console.log(minute + ':' + second);
        //console.log(num);
    })
}
for (var i = 0; i < time.length; i++) {
    time[i].setAttribute('index', i);
    var num = i;
    music_time(my_song[num].song.id, time[num]);
}
for (var i = 0; i < 15; i++) {
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
        //console.log(index);
        //获取点击歌曲的id并进行存储 存储歌曲名称 歌手
        console.log(my_song[index].song.id);
        //console.log(song_id_all); //这个bug一旦运行就会出现跨域问题！！
        window.sessionStorage.setItem('song_id', my_song[index].song.id);
        window.sessionStorage.setItem('song_pic', my_song[index].song.al.picUrl);
        window.sessionStorage.setItem('song_name', my_song[index].song.name);
        window.sessionStorage.setItem('singer_name', my_song[index].song.ar[0].name);
        //存储点击歌曲的位置
        window.sessionStorage.setItem('index', index);
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
var songlist_box = songlist.querySelectorAll('.box');
var songlist_img = songlist.querySelectorAll('.image_box');
var songlis_a = songlist.querySelectorAll('.image_a');
var songlist_id = [];//存放歌单的id
playlist('/user/playlist?uid=' + my_id1, post);//获取用户歌单
for (var i = 0; i < my_playlist.length; i++) {
    songlist_img[i].src = my_playlist[i].coverImgUrl;
    songlis_a[i].innerHTML = my_playlist[i].name;
    songlist_id[i] = my_playlist[i].id;
}
for (var i = my_playlist.length; i < 10; i++) {
    songlist_box[i].style.display = 'none';
}
console.log(my_playlist);
var songlist_box = songlist.querySelectorAll('.box');
let my_song1 = [];
function my_songlist1(address, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback();
            my_song1 = JSON.parse(this.responseText).playlist;
        }
    };
    let url = baseUrl + address;
    xhttp.open("GET", url, false);
    xhttp.send('{}');
}
//console.log(my_song1);
for (var i = 0; i < songlist_box.length; i++) {
    songlist_box[i].setAttribute('index', i);
    songlist_box[i].onclick = function () {
        var index = this.getAttribute('index');
        my_songlist1('/playlist/detail?id=' + songlist_id[index], post);
        window.sessionStorage.setItem('rec_id', songlist_id[index]);
        location.assign('index_song.html');
        console.log(my_song1);
    }
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
    //点击我创建的歌单跳转到指定位置
    var linkc = document.querySelector('#linkc')
    var songlist_c = document.querySelector('#songlist_c')
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
        to(songlist_c)
    });

    // 图标的显示部分
    var icon_box = document.querySelectorAll('.icon_box');
    var songlist_li = document.querySelectorAll('.songlist_li');
    for (var i = 0; i < 15; i++) {
        songlist_li[i].setAttribute('index', i);
        icon_box[i].style.display = 'none';
        songlist_li[i].onmouseover = function () {
            for (var i = 0; i < 15; i++) {
                icon_box[i].style.display = 'none';
            }
            var index = this.getAttribute('index');
            icon_box[index].style.display = 'block';
            songlist_li[index].onmouseleave = function () {
                icon_box[index].style.display = 'none';
            }
        }
    }
})
