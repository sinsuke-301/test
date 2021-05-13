//等页面加载完全部元素，获取完所有元素的属性
window.addEventListener('load', function () {
    //歌单推荐播放效果
    var banner_one = document.querySelector('.banner_one');
    var boxes = banner_one.querySelectorAll('.image');
    var broadcast = banner_one.querySelectorAll('.broadcast');
    var images = banner_one.querySelectorAll('.image_box');
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].setAttribute('index', i);
        broadcast[i].style.transform = "scale(" + 0 + ")";
        boxes[i].onmouseover = function () {
            for (var i = 0; i < boxes.length; i++) {
                //所有图片恢复原先的尺寸
                images[i].style.transform = "scale(" + 1 + ")";
                //获取当前盒子的索引号
                var index = this.getAttribute('index');
                images[index].style.transform = "scale(" + 1.1 + ")";
                broadcast[index].style.transform = "scale(" + 1 + ")";
                boxes[index].onmouseleave = function () {
                    images[index].style.transform = "scale(" + 1 + ")";
                    broadcast[index].style.transform = "scale(" + 0 + ")";
                }
            }
        }
    }

    //新歌首发的播放效果
    var new_image = document.querySelectorAll('.new_image');
    var newes = document.querySelectorAll('.newes');
    var playes = document.querySelectorAll('.play');
    for (var i = 0; i < new_image.length; i++) {
        new_image[i].setAttribute('index', i);
        playes[i].style.transform = "scale(" + 0 + ")";
        new_image[i].onmouseover = function () {
            for (var i = 0; i < new_image.length; i++) {
                //所有图片恢复原先大小
                newes[i].style.transform = "scale(" + 1 + ")";
                //获取当前盒子的索引号
                var index = this.getAttribute('index');
                newes[index].style.transform = "scale(" + 1.1 + ")";
                playes[index].style.transform = "scale(" + 1 + ")";
                new_image[index].onmouseleave = function () {
                    newes[index].style.transform = "scale(" + 1 + ")";
                    playes[index].style.transform = "scale(" + 0 + ")";
                }
            }
        }
    }
    // 排行榜模块的播放效果
    var rank_box = document.querySelector('.rank_box');
    var rank_ul = rank_box.querySelector('ul');
    var rank_li = rank_ul.querySelectorAll('li');
    var rank_play = rank_box.querySelectorAll('.rank_play');
    var rank_span = rank_box.querySelectorAll('span');
    var rank_img = rank_box.querySelectorAll('.rank_img');
    for (var i = 0; i < rank_li.length; i++) {
        rank_li[i].setAttribute('index', i);
        rank_img[i].style.transform = "scale(" + 1 + ")";
        rank_play[i].style.transform = "scale(" + 0 + ")";
        rank_li[i].onmouseover = function () {
            for (var i = 0; i < rank_li.length; i++) {
                var index = this.getAttribute('index');
                rank_img[index].style.transform = "scale(" + 1.1 + ")";
                rank_play[index].style.transform = "scale(" + 1 + ")";
                rank_span[index].style.display = 'none';
                rank_li[index].onmouseleave = function () {
                    rank_img[index].style.transform = "scale(" + 1 + ")";
                    rank_play[index].style.transform = "scale(" + 0 + ")";
                    rank_span[index].style.display = 'block';
                }
            }
        }
    }
    //banner_one模块两边的两边箭头（尝试以数组的方式写一下 简化代码)
    var banner_one = document.querySelector('.banner_one');
    var banner = banner_one.querySelectorAll('.banner');
    var left = banner_one.querySelectorAll('.left');
    var right = banner_one.querySelectorAll('.right');
    for (var i = 0; i < banner.length; i++) {
        banner[i].setAttribute('index', i);
        banner[i].addEventListener('mouseover', function () {
            for (var i = 0; i < banner.length; i++) {
                left[i].style.left = -260 + 'px';
                right[i].style.right = -260 + 'px';
                left[i].style.color = "white";
                right[i].style.color = "white";
            }
            var index = this.getAttribute('index');
            left[index].style.left = -160 + 'px';
            right[index].style.right = -160 + 'px';
            left[index].style.color = "black";
            right[index].style.color = "black";
            banner[index].addEventListener('mouseleave', function () {
                left[index].style.left = -260 + 'px';
                right[index].style.right = -260 + 'px';
                left[index].style.color = "#f7f7f7";
                right[index].style.color = "#f7f7f7";
            })
        })
    }
    //各个轮播滚动的盒子
    var lunbo = banner_one.querySelectorAll('.lunbo');
    //每个盒子的小圆点部分 根据自身图片个数自动变化小圆点个数
    var dot_all = banner_one.querySelectorAll('.dot');
    var bannerWidth = 1200;
    //1号轮播盒子
    var num_one = 0;
    var circle_one = 0;
    //动态生成小圆点 随图片数量变化而变化
    for (var i = 0; i < lunbo[0].children.length; i++) {
        //创造新的节点小li
        var li_one = document.createElement('li');
        li_one.setAttribute('index', i);
        //将li插入到ol里面
        dot_all[0].appendChild(li_one);
        //小圆圈的排他思想
        li_one.addEventListener('click', function () {
            for (var i = 0; i < dot_all[0].children.length; i++) {
                dot_all[0].children[i].className = '';
            }
            this.className = 'selected';
            var index_one = this.getAttribute('index');
            num_one = circle_one = index_one;
            animate(lunbo[0], -index_one * bannerWidth);
        })
    }
    dot_all[0].children[0].className = 'selected';
    function circleChange_one() {
        //小圆圈随着点击一起变化
        for (var i = 0; i < dot_all[0].children.length; i++) {
            //清除类名
            dot_all[0].children[i].className = '';
        }
        //留下当前小圆圈的类名
        dot_all[0].children[circle_one].className = 'selected';
    }
    //克隆第一张照片放到ul最后面
    var first = lunbo[0].children[0].cloneNode(true);
    lunbo[0].appendChild(first);
    //右侧箭头做法
    right[0].addEventListener('click', function () {
        if (num_one == lunbo[0].children.length - 1) {
            lunbo[0].style.left = 0;
            num_one = 0;
        }
        num_one++;
        animate(lunbo[0], -num_one * bannerWidth);
        circle_one++;
        if (circle_one == dot_all[0].children.length) {
            circle_one = 0;
        }
        circleChange_one();
    });
    //左侧箭头做法
    left[0].addEventListener('click', function () {
        if (num_one == 0) {
            num_one = lunbo[0].children.length - 1;
            lunbo[0].style.left = -(num_one * bannerWidth) + 'px';
        }
        num_one--;
        animate(lunbo[0], -num_one * bannerWidth);
        circle_one--;
        circle_one = circle_one < 0 ? dot_all[0].children.length - 1 : circle_one;
        circleChange_one();
    });
    //2号轮播盒子
    var num_two = 0;
    var circle_two = 0;
    //动态生成小圆点 随图片数量变化而变化
    for (var i = 0; i < lunbo[1].children.length; i++) {
        //创造新的节点小li
        var li_two = document.createElement('li');
        li_two.setAttribute('index', i);
        //将li插入到ol里面
        dot_all[1].appendChild(li_two);
        //小圆圈的排他思想
        li_two.addEventListener('click', function () {
            for (var i = 0; i < dot_all[1].children.length; i++) {
                dot_all[1].children[i].className = '';
            }
            this.className = 'selected';
            var index_two = this.getAttribute('index');
            num_two = circle_two = index_two;
            animate(lunbo[1], -index_two * bannerWidth);
        })
    }
    dot_all[1].children[0].className = 'selected';
    function circleChange_two() {
        //小圆圈随着点击一起变化
        for (var i = 0; i < dot_all[1].children.length; i++) {
            //清除类名
            dot_all[1].children[i].className = '';
        }
        //留下当前小圆圈的类名
        dot_all[1].children[circle_two].className = 'selected';
    }
    //克隆第一张照片放到ul最后面
    var first = lunbo[1].children[0].cloneNode(true);
    lunbo[1].appendChild(first);
    //右侧箭头做法
    right[1].addEventListener('click', function () {
        if (num_two == lunbo[1].children.length - 1) {
            lunbo[1].style.left = 0;
            num_two = 0;
        }
        num_two++;
        animate(lunbo[1], -num_two * bannerWidth);
        circle_two++;
        if (circle_two == dot_all[1].children.length) {
            circle_two = 0;
        }
        circleChange_two();
    });
    //左侧箭头做法
    left[1].addEventListener('click', function () {
        if (num_two == 0) {
            num_two = lunbo[1].children.length - 1;
            lunbo[1].style.left = -(num_two * bannerWidth) + 'px';
        }
        num_two--;
        animate(lunbo[1], -num_two * bannerWidth);
        circle_two--;
        circle_two = circle_two < 0 ? dot_all[1].children.length - 1 : circle_one;
        circleChange_two();
    });
    //3号轮播盒子
    var num_three = 0;
    var circle_three = 0;
    //动态生成小圆点 随图片数量变化而变化
    for (var i = 0; i < lunbo[2].children.length; i++) {
        //创造新的节点小li
        var li_three = document.createElement('li');
        li_three.setAttribute('index', i);
        //将li插入到ol里面
        dot_all[2].appendChild(li_three);
        //小圆圈的排他思想
        li_three.addEventListener('click', function () {
            for (var i = 0; i < dot_all[2].children.length; i++) {
                dot_all[2].children[i].className = '';
            }
            this.className = 'selected';
            var index_three = this.getAttribute('index');
            num_three = circle_three = index_three;
            animate(lunbo[2], -index_three * bannerWidth);
        })
    }
    dot_all[2].children[0].className = 'selected';
    function circleChange_three() {
        //小圆圈随着点击一起变化
        for (var i = 0; i < dot_all[2].children.length; i++) {
            //清除类名
            dot_all[2].children[i].className = '';
        }
        //留下当前小圆圈的类名
        dot_all[2].children[circle_three].className = 'selected';
    }
    //克隆第一张照片放到ul最后面
    var first = lunbo[2].children[0].cloneNode(true);
    lunbo[2].appendChild(first);
    //右侧箭头做法
    right[2].addEventListener('click', function () {
        if (num_three == lunbo[2].children.length - 1) {
            lunbo[2].style.left = 0;
            num_three = 0;
        }
        num_three++;
        animate(lunbo[2], -num_three * bannerWidth);
        circle_three++;
        if (circle_three == dot_all[2].children.length) {
            circle_three = 0;
        }
        circleChange_three();
    });
    //左侧箭头做法
    left[2].addEventListener('click', function () {
        if (num_three == 0) {
            num_three = lunbo[2].children.length - 1;
            lunbo[2].style.left = -(num_three * bannerWidth) + 'px';
        }
        num_three--;
        animate(lunbo[2], -num_three * bannerWidth);
        circle_three--;
        circle_three = circle_three < 0 ? dot_all[2].children.length - 1 : circle_one;
        circleChange_three();
    });
    //登陆部分
    var login_btn1 = document.querySelector('.login_btn1');
    var login = document.querySelector('.login');
    var close_btn = document.querySelector('.close');
    login_btn1.onclick = function () {
        login.style.display = 'block';
        //出现登录模块后滚动条禁止滚动 溢出隐藏
        document.documentElement.style.overflow = 'hidden';
    }
    close_btn.onclick = function () {
        login.style.display = 'none';
        //恢复滚动页面
        document.documentElement.style.overflow = 'visible';
    }
    //轮播图模块
    var left1 = document.querySelector('.left1');
    var right1 = document.querySelector('.right1');
    var carousel = document.querySelector('.carousel_box');
    var carouselWidth = carousel.offsetWidth;
    left1.style.display = 'none';
    right1.style.display = 'none';
    carousel.addEventListener('mouseenter', function () {
        left1.style.display = 'block';
        right1.style.display = 'block';
        //鼠标经过暂停滚动
        clearInterval(timer);//清除定时器
        timer = null;
    })
    carousel.addEventListener('mouseleave', function () {
        left1.style.display = 'none';
        right1.style.display = 'none';
        timer = setInterval(function () {
            right1.click();
            //手动调用点击事件
        }, 2000);
    })
    //动态生成小圆点 随图片数量变化而变化
    var ul = carousel.querySelector('ul');
    var ol = carousel.querySelector('.dot');
    console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        //创造新的节点小li
        var li = document.createElement('li');
        //将li插入到ol里面
        li.setAttribute('index', i);
        //记录小圆点的索引号，建立自定义属性
        ol.appendChild(li);
        //小圆圈的排他思想
        li.addEventListener('click', function () {
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'selected';
            //当点击这个小圆点时，获取当前索引号
            var index = this.getAttribute('index');
            num = circle = index;
            console.log(carouselWidth);
            console.log(index);
            animate(ul, -index * carouselWidth);
        })
    }
    function circleChange() {
        //小圆圈随着点击一起变化
        for (var i = 0; i < ol.children.length; i++) {
            //清楚类名
            ol.children[i].className = '';
        }
        //留下当前小圆圈的类名
        ol.children[circle].className = 'selected';
    }
    ol.children[0].className = 'selected';
    //克隆第一张照片放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击左右按钮滚动图片
    var num = 0;
    var circle = 0;
    right1.addEventListener('click', function () {
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * carouselWidth);
        circle++;
        if (circle == ol.children.length) {
            circle = 0;
        }
        circleChange();
    });
    //左侧按钮做法
    left1.addEventListener('click', function () {
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -(num * carouselWidth) + 'px';
        }
        num--;
        animate(ul, -num * carouselWidth);
        circle--;
        circle = circle < 0 ? ol.children.length - 1 : circle;
        circleChange();
    });
    //自动播放功能
    var timer = setInterval(function () {
        right1.click();
        //手动调用点击事件
    }, 2000);
})