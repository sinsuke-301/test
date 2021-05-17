window.addEventListener('load', function () {
    var user_name = sessionStorage.getItem('login_name');
    var user_img = sessionStorage.getItem('login_img');
    console.log(user_name);
    console.log(user_img);
    //判断页面是否第一次打开
    if (!window.name) {
        //console.log("第一次打开");
        window.name = "myname" //第一次打开时设置name
        localStorage.clear(); //清全部缓存

    }
    else if (sessionStorage.getItem('nickname') == null) {
        //二次刷新页面且还未登录
    }
    else if (sessionStorage.getItem('login_name') == sessionStorage.getItem('nickname')) {
        back_new.style.display = 'block';
        image.style.display = 'block';
        login_name.style.display = 'inline-block';
        image.src = sessionStorage.getItem('login_img');
        login_name.innerHTML = sessionStorage.getItem('login_name');
        login_btn1.style.display = 'none';
    }

})
let baseUrl = 'https://autumnfish.cn/'
function post() {
    //alert('成功发送了请求')
}
//登录模块
var phone = document.getElementById('phone');
var secret_num = document.getElementById('secret_num');
var login_btn2 = document.getElementById('login_btn2');
var login_btn1 = document.querySelector('.login_btn1');
var image = document.getElementById('login_img');
var login_box = document.getElementById('login_box');
var login_name = document.getElementById('login_name');
var warn = document.getElementById('warn');
var back_new = document.getElementById('back_new');
back_new.style.display = 'none';
warn.style.display = 'none';
login_name.style.display = 'none';
image.style.display = 'none';
//let baseUrl = 'https://autumnfish.cn/login/cellphone?phone=';
var img_url = [];//获取头像的数组
var nickname = [];//获取用户名称的数组
var my_id = [];//获取用户的id号
var cookie = [];//获取登录接口的cookie
login_btn2.onclick = function () {
    let phonewords = phone.value;
    let secretwords = secret_num.value;
    let address = 'login/cellphone?phone=' + phonewords + '&password=' + secretwords;
    login(address, post);
}
//登录界面的跳转
image.addEventListener('click', function () {
    //记录浏览历史，可实现后退功能
    location.assign('Mymusic.html');
})
//我的音乐页面跳转
var my_music = document.querySelector('.my_music');
my_music.onclick = function () {
    //判断是否登录
    if (sessionStorage.getItem('login_name') || sessionStorage.getItem('nickname')) {
        location.assign('Mymusic.html');
    }
    else {
        login_box.style.display = 'block';
    }

}
//退出按钮点击事件
back_new.onclick = function () {
    //sessionStorage.clear()//删除全部信息
    //删除用户信息
    sessionStorage.removeItem('login_name');
    sessionStorage.removeItem('nickname');
    sessionStorage.removeItem('login_img');
    sessionStorage.removeItem('user_cookie');
    location.assign(location)
    //强制从服务器重新加载当前页面 即刷新
}
function login(address, callback) {
    let http = new XMLHttpRequest();
    // http.withCredentials = true 部分请求或许需要该配置，具体请先查看文档
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            if (http.status >= 200 && http.status < 300) {
                console.log(JSON.parse(http.responseText));
                img_url = JSON.parse(http.responseText).profile.avatarUrl;
                nickname = JSON.parse(http.responseText).profile.nickname;
                cookie = JSON.parse(http.responseText).cookie;
                // login_status = JSON.parse(http.responseText).loginType;
                // window.sessionStorage.setItem('login_status', login_status);
                image.src = img_url;
                login_name.innerHTML = nickname;
                my_id = JSON.parse(http.responseText).account.id;
                console.log(my_id);

                //存储用户头像 用户名
                window.sessionStorage.setItem('img_url', img_url);
                window.sessionStorage.setItem('nickname', nickname);
                window.sessionStorage.setItem('my_id', my_id);
                //存储登录接口cookie 评论用
                window.sessionStorage.setItem('user_cookie', cookie);
                console.log(cookie);
                login_box.style.display = 'none';
                login_btn1.style.display = 'none';
                back_new.style.display = 'block';
                image.style.display = 'block';
                login_name.style.display = 'inline-block';
                document.documentElement.style.overflow = 'visible';
                //恢复滚动页面
            }
            else {
                warn.style.display = 'block';
            }
        }

    };
    //GET POST
    let url = baseUrl + address;
    http.open("GET", url, true);
    http.send('');
}