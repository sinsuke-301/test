//ajax封装回调函数
/* 传参时需要传入对象形式，method默认值为GET */
function $ajax({ method = "get", url, data, success, error }) {
    var xhr = null;
    try {
        xhr = new XMLHttpRequest();
    } catch (error) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    /* 判断data数据存在，则将对象转为字符串 */
    if (data) {
        data = queryString(data);
    }
    /* 判断方法是否是GET，且有无数据请求 */
    if (method == "get" && data) {
        url += "?" + data;
    }
    xhr.open(method, url, true);
    //判断是否为GET请求
    if (method == "get") {
        xhr.send();
    } else {
        //POST请求
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }
    /* 等待数据响应 */
    xhr.onreadystatechange = function () {
        /* 判断是否解析完成 */
        if (xhr.readyState == 4) {
            /* 判断本次下载的状态码是多少 */
            if (xhr.status == 200) {
                /* 
                    如何去处理数据的操作不确定
                    回调函数，将一段代码作为参数传入函数，在合适的地方调用
                */
                //判断success函数是否存在
                if (success) {
                    success(xhr.responseText);
                }
            } else {
                if (error) {
                    error("Error:" + xhr.responseText)
                }
            }
        }
    }
}
/* 将对象转成字符串 */
function queryString(obj) {
    var str = "";
    for (var attr in obj) {
        str += attr + "=" + obj[attr] + "&";
    }
    return str.substring(0, str.length - 1);
}
