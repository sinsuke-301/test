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

//获取歌手单曲
var back_pic = document.querySelector('.back_pic');
var artist = document.querySelector('.singer_name');
var singer_id = sessionStorage.getItem('singer_id');
var song_name = document.querySelectorAll('.song_name');
var ar_name = document.querySelectorAll('.ar_name');
var al_name = document.querySelectorAll('.al_name');
//简介部分
var brief = document.querySelector('.brief');
function per_songs(u, singer_id) {
    $ajax({
        url: 'https://autumnfish.cn/' + u,
        data: {
            id: singer_id
        },
        success: function (response) {
            var per_list = JSON.parse(response);
            back_pic.src = per_list.artist.picUrl;
            artist.innerHTML = per_list.artist.name;
            brief.innerHTML = per_list.artist.briefDesc;
            for (var i = 0; i < song_name.length; i++) {
                song_name[i].setAttribute('index', i);
                song_name[i].innerHTML = per_list.hotSongs[i].name;
                ar_name[i].innerHTML = per_list.hotSongs[i].ar[0].name;
                al_name[i].innerHTML = per_list.hotSongs[i].al.name;
                song_name[i].onclick = function () {
                    var index = this.getAttribute('index');
                    window.sessionStorage.setItem('song_id', per_list.hotSongs[index].id);
                    window.sessionStorage.setItem('singer_name', per_list.hotSongs[index].ar[0].name);
                    window.sessionStorage.setItem('song_pic', per_list.hotSongs[index].al.picUrl);
                    window.sessionStorage.setItem('song_name', per_list.hotSongs[index].name);
                    location.assign('play.html');
                }
            }
        }
    })
}
per_songs('/artists', singer_id);
//专辑
var image_box = document.querySelectorAll('.image_box');
var image_a = document.querySelectorAll('.image_a');
var album_all = document.querySelector('.album_all');
var album_box = album_all.querySelectorAll('.box');
// var album_warn = document.querySelector('.album_warn');
function per_album(u, singer_id) {
    $ajax({
        url: 'https://autumnfish.cn/' + u,
        data: {
            id: singer_id
        },
        success: function (response) {
            var album = JSON.parse(response).hotAlbums;
            for (var i = 0; i < album.length; i++) {
                image_box[i].src = album[i].blurPicUrl;
                image_a[i].innerHTML = album[i].name;
            }
            if (!album.length) {
                // album_warn.innerHTML = '无';
                for (var j = 0; j < 6; j++) {
                    album_box[j].style.display = 'none';
                }
            }
            else {
                for (var j = album.length; j < 8; j++) {
                    album_box[j].style.display = 'none';
                }
            }
        }
    })
}
per_album('/artist/album', singer_id);
//相似歌手部分
var rel_img = document.querySelectorAll('.rel_img');
var rel_arname = document.querySelectorAll('.rel_arname');
var relevantlist = document.querySelector('.relevantlist');
var relevant_li = relevantlist.querySelectorAll('li');
var rel_warn = document.querySelector('.rel_warn');
function simi(u, song_id) {
    $ajax({
        url: 'https://autumnfish.cn/' + u,
        data: {
            id: singer_id
        },
        success: function (response) {
            var simi_list = JSON.parse(response).artists;
            for (var i = 0; i < simi_list.length; i++) {
                rel_arname[i].setAttribute('index', i);
                rel_img[i].src = simi_list[i].picUrl;
                rel_arname[i].innerHTML = simi_list[i].name;
                rel_arname[i].onclick = function () {
                    var index = this.getAttribute('index');
                    window.sessionStorage.setItem('singer_id', simi_list[index].id);
                    per_album('/artist/album', simi_list[index].id);
                    per_songs('/artists', simi_list[index].id);
                    simi('/simi/artist', simi_list[index].id);
                }
            }
            if (!simi_list.length) {
                rel_warn.innerHTML = '无';
                for (var j = 0; j < 8; j++) {
                    relevant_li[j].style.display = 'none';
                }
            }
            else {
                for (var j = simi_list.length; j < 8; j++) {
                    relevant_li[j].style.display = 'none';
                }
            }
        }
    })
}
simi('/simi/artist', singer_id);
//点击评论跳转到指定位置
var linkc = document.querySelector('#linkc')
var album_c = document.querySelector('#album_c')
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
    to(album_c)
});

window.addEventListener('load', function () {
    //专辑部分的动画效果
    var song_boxes = document.querySelectorAll('.image');
    var song_broadcast = document.querySelectorAll('.broadcast');
    var song_images = document.querySelectorAll('.image_box');
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
})