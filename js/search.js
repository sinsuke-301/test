//等页面加载完全部元素，获取完所有元素的属性
window.addEventListener('load', function () {
    //搜索栏动画部分
    var search_box = document.querySelector('.search');//搜索大盒子
    var search_input = search_box.querySelector('input');//搜索框
    var search_menu = search_box.querySelector('ul');//索引菜单
    search_box.addEventListener('mouseover', function () {
        search_input.style.width = 180 + 'px';
    })
    search_input.addEventListener('focusin', function () {
        search_menu.style.height = 200 + 'px';
        search_input.style.width = 180 + 'px';
    })
    search_input.addEventListener('focusout', function () {
        search_menu.style.height = 0 + 'px';
        search_input.style.width = 0 + 'px';
    })


    let baseUrl = 'https://autumnfish.cn/'
    function post() {
        //alert('成功发送了请求')
    }
    //设置一个存放搜索结果的数组
    let res = []
    //这是一个用来发起请求的函数
    function search(address, callBack) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callBack()
                //将请求结果存放到全局对象中
                res = JSON.parse(this.responseText).result.hots
                //获取热门搜索信息
            }
        };
        let url = baseUrl + address
        xhttp.open("GET", url, false);
        xhttp.send('{}');
    }
    //调用函数发起请求
    search('/search/hot', post)
    //console.log(res);
    //获取html的div元素
    let ul = document.getElementById('search_menu')
    var lis = ul.querySelectorAll('li');
    //动态渲染
    for (let i = 0; i < res.length - 5; i++) {
        //将其文本内容设置为对应的请求结果
        lis[i].innerText = i + 1 + '         ' + res[i].first
    }
    //搜索栏索引部分
    let active_search = '/search/suggest?keywords=';
    function search1(address, callBack) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callBack()
                //将请求结果存放到全局对象中
                res = JSON.parse(this.responseText).result.allMatch;
            }
        };
        let url = baseUrl + address + '&type=mobile';
        xhttp.open("GET", url, false);
        xhttp.send('{}');
    }
    let sth = [];
    var search = document.querySelector('.search');
    var search_input = search.querySelector('input');
    search_input.oninput = function () {
        //div.innerHTML = input.value;
        if (search_input.value != '') {
            sth = search_input.value;
            search1(active_search + sth, post);
            //console.log(res.length);
            for (var i = 0; i < res.length - 1; i++) {
                //创建一个新的li标签
                //var li = document.createElement('li')
                //将其文本内容设置为对应的请求结果
                lis[i].innerText = i + 1 + '         ' + res[i].keyword;
                //将其添加到ul中
                //ul.appendChild(li)
            }
        }
    }
})