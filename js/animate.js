function animate(obj, target, callback) {
    //设置定时器
    //1.有个bug 不停点击速度会越来越快
    //解决方案：让元素只有一个定时器执行
    //清除原先的定时器 
    //核心算法：（目标值-现在的位置）/10 作为每次移动的距离步长
    //console.log(callback);
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        //缓动动画效果
        if (obj.offsetLeft == target) {
            //停止定时器
            clearInterval(obj.timer);
            //回调函数，等事件执行完才执行
            if (callback) {
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 20)
}