// 获取存储的数据
var user_img = document.getElementById('user_img');
var user_name = document.getElementById('user_name');
user_img.src = sessionStorage.getItem('img_url');
user_name.innerHTML = sessionStorage.getItem('nickname');
//获取所点击的歌曲的id(获取音乐url 歌词)
var song_id = [];
song_id = sessionStorage.getItem('song_id');
console.log(song_id);
//获取歌曲的封面
var album_img = document.getElementById('album_img');
album_img.src = sessionStorage.getItem('song_pic');
var music_img = document.querySelector('.music_img');
music_img.src = album_img.src;
//获取歌曲名 歌手名
let song_name = document.getElementById('song_name');
let singer_name = document.getElementById('singer_name');
song_name.innerHTML = sessionStorage.getItem('song_name');
singer_name.innerHTML = sessionStorage.getItem('singer_name');
//console.log(song_name.innerHTML);

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
let count = 0;//记录当前歌曲
//mym.src = musicArr[count]; //路径
//mym.play(); //开始播放 刷新页面即可自动播放
//mname.innerHTML = musicArr[count];//显示歌曲名字

//获取歌曲url,歌词部分
function post() {
    //alert(1);
}
let music_baseurl = 'https://music.163.com/song/media/outer/url?id=';
let musicArr = [];//存放歌曲url的数组
//console.log(musicArr.url);
mym.src = music_baseurl + song_id + '.mp3';
//只需要获取歌曲id即可获得歌曲url
//设置点击事件实现暂停、播放
play.addEventListener('click', function () {
    if (mym.paused) {
        mym.play();
        this.innerHTML = "暂停";
    } else {
        mym.pause();
        this.innerHTML = "播放";
    }
});
//点击音量条上的小图标实现静音控制
jy.addEventListener("click", function () {
    if (mym.muted) {
        mym.muted = false;
        this.innerHTML = '有音';
        mym.play();
    }
    else {
        mym.muted = true;
        this.innerHTML = '静音';
    }
});
var voice_span = document.getElementById("voice_span");//拖动条
var voice_box = document.getElementById("voice_box");
var voice = document.getElementById("voice");//音量盒子
var P1 = document.getElementById("p1");//显示音量数值
voice_span.style.left = 60 + 'px';//默认初始状态
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
        P1.innerHTML = "音量：" + voice_num;
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
    totalTime.innerHTML = hour + ':' + minute + ':' + second;
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
    current.innerHTML = hour + ':' + minute + ':' + second;
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
    count++;
    if (count > musicArr.length - 1) {
        count = 0;
    }
    mym.src = musicArr[count];
    mname.innerHTML = musicArr[count];
});

// 歌曲上一首切换
rewind.addEventListener('click', function () {
    count--;
    if (count === -1) {
        count = musicArr.length - 1;
    }
    mym.src = musicArr[count];
    mname.innerHTML = musicArr[count];
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
    mname.innerHTML = musicArr[count];
});
