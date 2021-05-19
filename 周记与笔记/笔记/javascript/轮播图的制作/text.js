//等页面加载完全部元素，获取完所有元素的属性
window.addEventListener('load', function () {
    //1.获取元素
    var left = document.querySelector('.left');
    var right = document.querySelector('.right');
    var banner = document.querySelector('.lunbo');
    var bannerWidth = banner.offsetWidth;
    banner.addEventListener('mouseenter', function () {
        left.style.display = 'block';
        right.style.display = 'block';
        //鼠标经过暂停滚动
        clearInterval(timer);
        timer = null;

    })
    banner.addEventListener('mouseleave', function () {
        left.style.display = 'none';
        right.style.display = 'none';
        timer = setInterval(function () {
            right.click();
            //手动调用点击事件
        }, 2000);
    })
    //动态生成小圆点 随图片数量变化而变化
    var ul = banner.querySelector('ul');
    var ol = banner.querySelector('.dot');
    // console.log(ul.children.length);
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
            this.className = 'current';
            //当点击这个小圆点时，获取当前索引号
            var index = this.getAttribute('index');
            num = circle = index;
            console.log(bannerWidth);
            console.log(index);
            animate(ul, -index * bannerWidth);
        })
    }
    function circleChange() {
        //小圆圈随着点击一起变化
        for (var i = 0; i < ol.children.length; i++) {
            //清楚类名
            ol.children[i].className = '';
        }
        //留下当前小圆圈的类名
        ol.children[circle].className = 'current';
    }
    ol.children[0].className = 'current';
    //克隆第一张照片fangdaoul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击左右按钮滚动图片
    var right = document.querySelector('.right');
    var left = document.querySelector('.left');
    var num = 0;
    var circle = 0;
    right.addEventListener('click', function () {
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * bannerWidth);
        circle++;
        if (circle == ol.children.length) {
            circle = 0;
        }
        circleChange();
    });
    //左侧按钮做法
    left.addEventListener('click', function () {
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -(num * bannerWidth) + 'px';
        }
        num--;
        animate(ul, -num * bannerWidth);
        circle--;
        circle = circle < 0 ? ol.children.length - 1 : circle;
        circleChange();
    });
    //自动播放功能
    var timer = setInterval(function () {
        right.click();
        //手动调用点击事件
    }, 2000);
})