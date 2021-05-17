//判断是否登录
var user_img = document.getElementById('user_img');
if (sessionStorage.getItem('img_url')) {

}
else {
    user_img.style.display = 'none';
}

// 获取存储的数据
var user_img = document.getElementById('user_img');
var user_name = document.getElementById('user_name');
user_img.src = sessionStorage.getItem('img_url');
user_name.innerHTML = sessionStorage.getItem('nickname');
//获取歌曲的封面
var album_img = document.getElementById('album_img');
//album_img.src = sessionStorage.getItem('song_pic');
var music_img = document.querySelector('.music_img');
music_img.src = album_img.src;
//获取歌曲名 歌手名
let song_name = document.getElementById('song_name');
let singer_name = document.getElementById('singer_name');
//song_name.innerHTML = sessionStorage.getItem('song_name');
//singer_name.innerHTML = sessionStorage.getItem('singer_name');

//下端播放栏部分
let mym = document.getElementById('mym');
let play = document.getElementById('play');
let forward = document.getElementById('forward');
let rewind = document.getElementById('rewind');
let jy = document.getElementById('jy');
let ylt_bg = document.getElementById('ylt_bg');
let jindu_bg = document.getElementById('jindu_bg');
let jindu_color = document.getElementById('jindu_color');
let totalTime = document.getElementById('totalTime');
let current = document.getElementById('current');
let startX; // 鼠标开始按下的位置
mym.volume = 0.5;//初始音量为0.5

let count = 0;//记录当前歌曲的位置
count = sessionStorage.getItem('index');
//获取歌单id号
let rec_id = [];
rec_id = sessionStorage.getItem('rec_id');
let music_baseurl = 'https://music.163.com/song/media/outer/url?id=';
var id_box = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];//存放十首歌曲的id
var musicArr = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];//存放url地址
//获取歌曲列表
var music_name = document.querySelectorAll('.music_name');
var music_ar_name = document.querySelectorAll('.music_ar_name');
var musictime = document.querySelectorAll('.musictime');
function musiclist(u, rec_id) {
    $ajax({
        url: 'https://autumnfish.cn/' + u,
        data: {
            id: rec_id
        },
        success: function (response) {
            var music_str = JSON.parse(response).playlist;
            for (var i = 0; i < music_name.length; i++) {
                music_name[i].setAttribute('num', i);
                music_name[i].innerHTML = music_str.tracks[i].name;
                music_ar_name[i].innerHTML = music_str.tracks[i].ar[0].name;
                id_box[i] = music_str.tracks[i].id;
                musicArr[i] = music_baseurl + music_str.tracks[i].id + '.mp3';
                music_name[i].onclick = function () {
                    var num = this.getAttribute('num');
                    while (ul.hasChildNodes()) {
                        ul.removeChild(ul.firstChild);
                    }
                    count = num;
                    mym.src = musicArr[num];
                    song_detail('song/detail', id_box[num]);
                    min = '00';
                    secs = '00';
                    lyric_attain('lyric', id_box[num]);
                    review('/comment/music?id=', id_box[num])

                }
            }
        }
    })
}
musiclist('playlist/detail', rec_id);
console.log(id_box);
console.log(musicArr);
//获取所点击的歌曲的id(获取音乐url 歌词)
let song_id = [];
song_id = sessionStorage.getItem('song_id');
console.log(song_id);
mym.src = music_baseurl + song_id + '.mp3';
//只需要获取歌曲id即可获得歌曲url
//封面 歌手 歌名
function song_detail(u, song_id) {
    $ajax({
        url: 'https://autumnfish.cn/' + u,
        data: {
            ids: song_id
        },
        success: function (response) {
            var song_str = JSON.parse(response).songs[0];
            console.log(song_str);
            album_img.src = song_str.al.picUrl;
            song_name.innerHTML = song_str.name;
            singer_name.innerHTML = song_str.ar[0].name;
            music_img.src = album_img.src;
        }
    })
}
song_detail('song/detail', song_id);
//获取歌曲url,歌词部分
function post() {
    //alert(1);
}
//歌词滚动部分
//var str_box = [];//获取原歌词
//var str_box1 = [];//获取翻译后的歌词
var str = [];
var timer = []
var ul = document.querySelector('.lyric')
var frg = document.createDocumentFragment()
var mins;
var secs;
//var ad = document.querySelector('audio')
var currtime;//定义全局变量 进度条变化 歌曲正常播放 歌词随之变化滚动
function lyric_attain(u, song_id) {
    $ajax({
        url: 'https://autumnfish.cn/' + u,
        data: {
            id: song_id
        },
        success: function (response) {
            var str_box = JSON.parse(response).lrc;
            str = str_box.lyric;
            var lrc = [];
            var arr = str.split('\n')//以回车作为分隔符 分割歌词
            var reg = /\[(\d{2}:\d{2})\.\d{2,3}\](.+)/
            //var change_lrc = str1.split(/\s*\n*\[.*?\]\s*/).filter(v => !!v)
            arr.forEach(function (a) {
                //forEach for循环的简化写法
                if (reg.exec(a) != null) {
                    timer.push(reg.exec(a)[1])//推入歌词对应时间的项
                    lrc.push(reg.exec(a)[2])//推入对应歌词的项
                }
            })
            //console.log(arr);
            lrc.forEach(function (a) {
                var li = document.createElement('li')
                //while (a.indexOf("\\n") >= 0) { a = a.replace("\\n", " \n "); }
                li.innerText = a
                console.log(a);
                frg.appendChild(li)
                //forEach for循环的简化写法
            })
            ul.appendChild(frg)

        }
    })
}
lyric_attain('lyric', song_id);
mym.ontimeupdate = function () {
    currtime = parseInt(this.currentTime)//返回十进制整数
    mins = parseInt(currtime / 60)
    secs = currtime % 60
    if (mins < 10) mins = '0' + mins
    if (secs < 10) secs = '0' + secs
    var timstr = mins + ':' + secs
    timer.forEach(function (a, i) {
        if (a == timstr) {
            ul.style.top = 40 - i * 33.5 + 'px'
            for (var j = 0; j < ul.children.length; j++) {
                ul.children[j].className = ''
            }
            ul.children[i].className = 'active'
        }
    })
}
//设置点击事件实现暂停、播放
play.addEventListener('click', function () {
    if (mym.paused) {
        mym.play();
        this.innerHTML = "&#xe76a;";
    } else {
        mym.pause();
        this.innerHTML = "&#xe60f;";
    }
});
//点击音量条上的小图标实现静音控制
jy.addEventListener("click", function () {
    if (mym.muted) {
        mym.muted = false;
        this.innerHTML = '&#xe80c;';
    }
    else {
        mym.muted = true;
        this.innerHTML = '&#xe600;';
    }
});
var voice_span = document.getElementById("voice_span");//拖动条
var voice_box = document.getElementById("voice_box");
var voice = document.getElementById("voice");//音量盒子
var P1 = document.getElementById("p1");//显示音量数值
voice_span.style.left = 60 + 'px';//默认初始状态 50%的音量
voice.style.width = 60 + 'px';
voice_span.onmousedown = function (e) {
    event.preventDefault(); // 阻止默认事件
    var evt = e || event;//考虑兼容性
    var x = evt.offsetX;
    voice_box.onmousemove = function (e) {
        event.preventDefault(); // 阻止默认事件
        var evt = e || event;
        voice_span.style.left = evt.clientX - voice_box.offsetLeft - x + "px";
        if (evt.clientX - voice_box.offsetLeft - x <= 0) {
            voice_span.style.left = "0px";
        }
        if (evt.clientX - voice_box.offsetLeft - x >= 120) {
            voice_span.style.left = "120px";
        }
        var voice_num = Math.floor(voice_span.offsetLeft / 1.2);
        P1.innerHTML = voice_num + '%';//显示当时音量
        voice.style.width = voice_span.offsetLeft + "px";
        mym.volume = voice_num / 100;
        //console.log(mym.volume);
    }
    document.onmouseup = function () {
        voice_box.onmousemove = null;
    }
}
//获取歌曲的总时长，和歌曲播放进度
// 总时长
mym.addEventListener("loadedmetadata", function () {
    let hour = Math.floor(mym.duration / 3600);
    let other = mym.duration % 3600;
    let minute = Math.floor(other / 60);
    let second = Math.floor(other % 60);
    (hour < 10) && (hour = "0" + hour);
    (minute < 10) && (minute = "0" + minute);
    (second < 10) && (second = "0" + second);
    totalTime.innerHTML = minute + ':' + second;
})
// 当前播放进度，结合 timeupdate事件
mym.addEventListener("timeupdate", function () {
    let hour = Math.floor(mym.currentTime / 3600);
    let other = mym.currentTime % 3600;
    let minute = Math.floor(other / 60);
    let second = Math.floor(other % 60);
    (hour < 10) && (hour = "0" + hour);
    (minute < 10) && (minute = "0" + minute);
    (second < 10) && (second = "0" + second);
    current.innerHTML = minute + ':' + second;
    jindu_color.style.width = 100 * mym.currentTime / mym.duration + "%";
});
//歌曲进度条的快进
//进度条（快进、后退）
let jMove = function () {
    let x = event.offsetX;
    jindu_color.style.width = x + "px";
    mym.currentTime = "" + parseInt(x * mym.duration / 440) + "";
};
jindu_bg.addEventListener('mousedown', function () {
    let mouseX = event.offsetX;
    jindu_color.style.width = mouseX + "px";
    mym.currentTime = "" + parseInt(mouseX * mym.duration / 440) + "";
    jindu_bg.addEventListener("mousemove", jMove);
});
jindu_bg.addEventListener("mouseup", function () {
    jindu_bg.removeEventListener("mousemove", jMove);
});
jindu_bg.addEventListener("mouseleave", function () {
    jindu_bg.removeEventListener("mousemove", jMove);
});
// 歌曲下一首切换
forward.addEventListener("click", function () {
    while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild);
    }
    count++;
    if (count > musicArr.length - 1) {
        count = 0;
    }
    mym.src = musicArr[count];
    song_detail('/song/detail', id_box[count]);
    min = '0' + '0';
    secs = '0' + '0';
    lyric_attain('lyric', id_box[count]);
    review('/comment/music?id=', id_box[count])


});

// 歌曲上一首切换
rewind.addEventListener('click', function () {
    while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild);
    }
    count--;
    if (count === -1) {
        count = musicArr.length - 1;
    }
    mym.src = musicArr[count];
    song_detail('/song/detail', id_box[count]);
    min = '0' + '0';
    secs = '0' + '0';
    lyric_attain('lyric', id_box[count]);
    review('/comment/music?id=', id_box[count])
});
// 切换后播放
mym.addEventListener("loadstart", function () {
    mym.play();
});
//播放完毕 自动播放
mym.addEventListener("ended", function () {
    count++;
    if (count > musicArr.length - 1) {
        count = 0;
    }
    mym.src = musicArr[count];
});



//热门评论和歌曲列表tab栏切换
var head1 = document.querySelectorAll('.head1');
var music_tab = document.querySelectorAll('.music_tab');
music_tab[0].style.display = 'block';
music_tab[1].style.display = 'none';
for (var i = 0; i < 2; i++) {
    head1[i].setAttribute('index', i);
    head1[i].addEventListener('click', function () {
        for (var j = 0; j < 2; j++) {
            music_tab[j].style.display = 'none';
            head1[j].className = 'head1';
        }
        var index = this.getAttribute('index');
        music_tab[index].style.display = 'block';
        head1[index].className = 'head1 selected';
    })
}

//获取歌曲评论模块
var review_songlist_box = document.querySelector('.review_songlist_box');
function review(u, song_id) {
    $ajax({
        url: 'https://autumnfish.cn/' + u + song_id + '&limit=1',
        success: function (response) {
            var review_str = JSON.parse(response).hotComments;//存放评论相关数据
            for (var i = 0; i < 15; i++) {
                var review_box = document.querySelector('.review_box');
                var review_img = review_box.querySelectorAll('.review_img');
                var nickname = review_box.querySelectorAll('.nickname');
                var view = review_box.querySelectorAll('.view');
                review_img[i].src = review_str[i].user.avatarUrl;
                nickname[i].innerHTML = review_str[i].user.nickname;
                view[i].innerHTML = review_str[i].content;
            }
        }
    })
}
review('/comment/music?id=', song_id)
//经过评论部分显示滚动条
review_songlist_box.style.overflowY = 'hidden';
review_songlist_box.addEventListener('mouseover', function () {
    review_songlist_box.style.overflowY = 'auto';
    review_songlist_box.addEventListener('mouseleave', function () {
        review_songlist_box.style.overflowY = 'hidden';
    })
})