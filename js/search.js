//等页面加载完全部元素，获取完所有元素的属性
window.addEventListener('load', function () {
    //搜索栏动画部分
    var search_box = document.querySelector('.search');//搜索大盒子
    var search_input = search_box.querySelector('input');//搜索框
    var search_menu = search_box.querySelector('ul');//索引菜单
    // search_box.addEventListener('mouseover', function () {
    //     search_input.style.width = 180 + 'px';
    // })
    search_input.addEventListener('focusin', function () {
        search_menu.style.height = 500 + 'px';//长度设的长一点
        //search_input.style.width = 180 + 'px';
    })
    search_input.addEventListener('focusout', function () {
        search_menu.style.height = 0 + 'px';
        //search_input.style.width = 0 + 'px';
    })


    let baseUrl = 'https://autumnfish.cn/'
    function post() {
        //alert('成功发送了请求')
    }
    //设置一个存放搜索结果的数组
    // let res = []
    //获取html的div元素
    //动态渲染
    let ul = document.getElementById('search_menu')
    var lis = ul.querySelectorAll('li');
    //热门搜索关键词
    function search_hots(u) {
        $ajax({
            url: baseUrl + u,
            success: function (response) {
                var res = JSON.parse(response).result.hots;
                //console.log(res);
                for (let i = 0; i < res.length - 5; i++) {
                    //将其文本内容设置为对应的请求结果
                    lis[i].setAttribute('index', i);
                    lis[i].innerText = i + 1 + '         ' + res[i].first
                }
            }
        })
    }
    search_hots('/search/hot');
    //搜索栏索引部分
    let active_search = '/search/suggest?';
    //let res1 = [];
    function song_datail(u, song_id) {
        $ajax({
            url: baseUrl + u,
            data: {
                ids: song_id,
            },
            success: function (response) {
                var detail = JSON.parse(response).songs[0];
                //console.log(detail);
                window.sessionStorage.setItem('song_pic', detail.al.picUrl);
                window.sessionStorage.setItem('song_name', detail.name);
                window.sessionStorage.setItem('singer_name', detail.ar[0].name);
                location.assign('play.html');
            }
        })
    }
    function search1(u, content) {
        $ajax({
            url: baseUrl + u + '&limit=5',
            data: {
                keywords: content,
            },
            success: function (response) {
                var res1 = JSON.parse(response).result.songs;
                for (var i = 0; i < lis.length - 1; i++) {
                    lis[i].setAttribute('index', i);
                    lis[i].innerText = i + 1 + '         ' + res1[i].name;
                    lis[i].onclick = function () {
                        var index = this.getAttribute('index');
                        window.sessionStorage.setItem('index', index);
                        window.sessionStorage.setItem('song_id', res1[index].id);
                        song_datail('/song/detail', sessionStorage.getItem('song_id'));
                        //location.assign('play.html');
                    }
                }
            }
        })
    }
    let sth = [];
    var search = document.querySelector('.search');
    var search_input = search.querySelector('input');
    search_input.oninput = function () {
        //div.innerHTML = input.value;
        if (search_input.value != '') {
            sth = search_input.value;
            //search1(active_search + sth, post);
            search1('/search/suggest', sth);
            // song_datail('/song/detail', sessionStorage.getItem('song_id'));
        }
        else {
            search_hots('/search/hot');
        }
        //历史记录节点的添加和删除
        var find_btn = document.querySelector('.find');
        find_btn.onclick = function () {
            console.log(sth);
            console.log(lis.length);
            var li = document.createElement('li');
            li.innerHTML = sth + "<a href='javascript:;'>✖</a>";
            ul.appendChild(li);
            var as = ul.querySelectorAll('a');
            for (var j = 0; j < as.length; j++) {
                as[j].onclick = function () {
                    ul.removeChild(this.parentNode);//a的父亲就是li
                }
            }
            //存储搜索的关键词
            window.sessionStorage.setItem('keywords', sth);
            location.assign('search.html');//历史记录会保存不了，之后改改
        }
    }
})