//let baseUrl = 'https://autumnfish.cn/';
function post() {
    //alert('成功发送了请求')
}
let res = [];//存放result
let songlist_img = [];//存放歌单封面
let songlist_inform = [];//存放歌单信息
//获取歌单信息的函数
function songlist(u) {
    $ajax({
        url: baseUrl + u,
        success: function (response) {
            var res = JSON.parse(response).result;
            let image_box = document.querySelectorAll('.image_box');
            let image_a = document.querySelectorAll('.image_a');
            var recommend_box = document.querySelector('.recommend_box');
            let rec_box = recommend_box.querySelectorAll('.box');//获取每个歌单盒子
            //歌单推荐部分
            for (var i = 0; i < 30; i++) {
                image_a[i].innerHTML = res[i].name;
                image_box[i].src = res[i].picUrl;
                rec_box[i].setAttribute('index', i);
                rec_box[i].onclick = function () {
                    location.assign('index_song.html');//跳转到新页面
                    //存储当前点击歌单的id号
                    var index = this.getAttribute('index');
                    window.sessionStorage.setItem('rec_id', res[index].id);
                }
            }
        }
    })
}
songlist('personalized?limit=30');
// function songlist(address, callBack) {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             callBack();
//             //将请求结果存放到全局对象中
//             res = JSON.parse(this.responseText).result;
//             //获取热门搜索信息
//         }
//     };
//     let url = baseUrl + address;
//     xhttp.open("GET", url, false);
//     xhttp.send('{}');
// }
// songlist('personalized?limit=30', post);
console.log(res);
// let image_box = document.querySelectorAll('.image_box');
// let image_a = document.querySelectorAll('.image_a');
// var recommend_box = document.querySelector('.recommend_box');
// let rec_box = recommend_box.querySelectorAll('.box');//获取每个歌单盒子
// //歌单推荐部分
// for (var i = 0; i < 30; i++) {
//     image_a[i].innerHTML = res[i].name;
//     image_box[i].src = res[i].picUrl;
//     rec_box[i].setAttribute('index', i);
//     rec_box[i].onclick = function () {
//         location.assign('index_song.html');//跳转到新页面
//         //存储当前点击歌单的id号
//         var index = this.getAttribute('index');
//         window.sessionStorage.setItem('rec_id', res[index].id);
//     }
// }
//新歌首发部分
//获取新歌函数
let album = [];
// function newsongs(address, callBack) {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             callBack();
//             //将请求结果存放到全局对象中
//             album = JSON.parse(this.responseText).albums;
//             //获取热门搜索信息
//         }
//     };
//     let url = baseUrl + address;
//     xhttp.open("GET", url, false);
//     xhttp.send('{}');
// }
function newsongs(u) {
    $ajax({
        url: baseUrl + u,
        success: function (response) {
            var album = JSON.parse(response).albums;
            let newes = document.querySelectorAll('.newes');
            let new_a = document.querySelectorAll('.new_a');
            let new_p = document.querySelectorAll('.new_p');
            let new_span = document.querySelectorAll('.new_span');
            for (var i = 0; i < 54; i++) {
                // newsongs('/album/new?area=KR&limit=54', post);
                //console.log(album[i]);
                newes[i].src = album[i].blurPicUrl;
                new_a[i].innerHTML = album[i].name;
                new_p[i].innerHTML = album[i].artist.name;
            }
        }
    })
}
newsongs('/album/new?area=KR&limit=54');
// let newes = document.querySelectorAll('.newes');
// let new_a = document.querySelectorAll('.new_a');
// let new_p = document.querySelectorAll('.new_p');
// let new_span = document.querySelectorAll('.new_span');
// for (var i = 0; i < 54; i++) {
//     newsongs('/album/new?area=KR&limit=54', post);
//     //console.log(album[i]);
//     newes[i].src = album[i].blurPicUrl;
//     new_a[i].innerHTML = album[i].name;
//     new_p[i].innerHTML = album[i].artist.name;
// }
//新碟首发模块
let radio = [];
function newradio(u) {
    $ajax({
        url: baseUrl + u,
        success: function (response) {
            var radio = JSON.parse(response).albums;
            let radio_all = document.querySelector('.radio_all');
            let radio_img = document.querySelectorAll('.radio_img');
            let radio_a = radio_all.querySelectorAll('.radio_a');
            let radio_p = radio_all.querySelectorAll('.radio_p');
            for (var i = 0; i < 10; i++) {
                //newradio('/album/new?area=KR&limit=10', post);
                radio_img[i].src = radio[i].picUrl;
                radio_a[i].innerHTML = radio[i].name;
                radio_p[i].innerHTML = radio[i].artist.name;
            }
        }
    })
}
newradio('/album/new?area=KR&limit=10');
// function newradio(address, callBack) {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             callBack();
//             //将请求结果存放到全局对象中
//             radio = JSON.parse(this.responseText).albums;
//             //获取热门搜索信息
//         }
//     };
//     let url = baseUrl + address;
//     xhttp.open("GET", url, false);
//     xhttp.send('{}');
// }
// let radio_all = document.querySelector('.radio_all');
// let radio_img = document.querySelectorAll('.radio_img');
// let radio_a = radio_all.querySelectorAll('.radio_a');
// let radio_p = radio_all.querySelectorAll('.radio_p');
// for (var i = 0; i < 10; i++) {
//     newradio('/album/new?area=KR&limit=10', post);
//     radio_img[i].src = radio[i].picUrl;
//     radio_a[i].innerHTML = radio[i].name;
//     radio_p[i].innerHTML = radio[i].artist.name;
// }
//排行榜模块
//let rank = [];
function ranks(u) {
    $ajax({
        url: baseUrl + u,
        success: function (response) {
            var rank = JSON.parse(response).list;
            let rank_box = document.querySelector('.rank_box');
            let rank_song = rank_box.querySelectorAll('.rank_song');
            let rank_artist = rank_box.querySelectorAll('.rank_artist');
            for (var i = 0; i < 4; i++) {
                if (i == 0) {
                    //ranks('/toplist/detail', post);
                    console.log(rank);
                }
                var s = 0;
                for (var j = 0; j < 3; j++) {
                    var n = i;
                    var num = 3 * (n + 1) - 2 + s - 1;
                    rank_song[num].innerHTML = j + 1 + '&nbsp;&nbsp;' + rank[i].tracks[j].first;
                    rank_artist[num].innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;' + rank[i].tracks[j].second;
                    s++;
                    // console.log(num);
                }

            }
        }
    })
}
ranks('/toplist/detail');
// function ranks(address, callBack) {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             callBack();
//             //将请求结果存放到全局对象中
//             rank = JSON.parse(this.responseText).list;
//             //获取热门搜索信息
//         }
//     };
//     let url = baseUrl + address;
//     xhttp.open("GET", url, false);
//     xhttp.send('{}');
// }
// let rank_box = document.querySelector('.rank_box');
// let rank_song = rank_box.querySelectorAll('.rank_song');
// let rank_artist = rank_box.querySelectorAll('.rank_artist');
// for (var i = 0; i < 4; i++) {
//     if (i == 0) {
//         ranks('/toplist/detail', post);
//         console.log(rank);
//     }
//     var s = 0;
//     for (var j = 0; j < 3; j++) {
//         var n = i;
//         var num = 3 * (n + 1) - 2 + s - 1;
//         rank_song[num].innerHTML = j + 1 + '&nbsp;&nbsp;' + rank[i].tracks[j].first;
//         rank_artist[num].innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;' + rank[i].tracks[j].second;
//         s++;
//         // console.log(num);
//     }

// }
// MV模块
//let mv = [];
function mv_radio(u) {
    $ajax({
        url: baseUrl + u,
        success: function (response) {
            var mv = JSON.parse(response).data;
            let mv_box = document.querySelector('.mv_box');
            let mv_img = mv_box.querySelectorAll('.image_box');
            let mv_name = mv_box.querySelectorAll('.mv_name');
            let mv_play = mv_box.querySelectorAll('.mv_play');
            for (var i = 0; i < 40; i++) {
                if (i == 0) {
                    //mv_radio('/mv/first?limit=40', post);
                    console.log(mv);
                }
                mv_img[i].src = mv[i].cover;
                mv_name[i].innerHTML = mv[i].name;
                mv_play[i].innerHTML = '<span class="iconfont">&#xec59;&nbsp;</span>' + mv[i].playCount;
            }
        }
    })
}
mv_radio('/mv/first?limit=40');
// function mv_radio(address, callBack) {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             callBack();
//             //将请求结果存放到全局对象中
//             mv = JSON.parse(this.responseText).data;
//             //获取热门搜索信息
//         }
//     };
//     let url = baseUrl + address;
//     xhttp.open("GET", url, false);
//     xhttp.send('{}');
// }
// let mv_box = document.querySelector('.mv_box');
// let mv_img = mv_box.querySelectorAll('.image_box');
// let mv_name = mv_box.querySelectorAll('.mv_name');
// let mv_play = mv_box.querySelectorAll('.mv_play');
// for (var i = 0; i < 40; i++) {
//     if (i == 0) {
//         mv_radio('/mv/first?limit=40', post);
//         console.log(mv);
//     }
//     mv_img[i].src = mv[i].cover;
//     mv_name[i].innerHTML = mv[i].name;
//     mv_play[i].innerHTML = '<span class="iconfont">&#xec59;&nbsp;</span>' + mv[i].playCount;
// }
