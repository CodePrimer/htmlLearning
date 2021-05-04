function animate(obj, target, callback) {
    // 添加回调函数参数 callback
    // console.log(obj.timer);
    if (typeof (obj.timer) != 'undefined') {
        // console.log('清除已有定时器');
        clearInterval(obj.timer);
    }
    obj.timer = setInterval(function () {
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // 回调函数写到定时器结束里边
            if (callback) {
                callback();
            }
            // 利用短路运算
            // callback && callback();
        }
        // console.log('offsetLeft: ' + obj.offsetLeft);
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // console.log('step: ' + step);
        obj.style.left = (obj.offsetLeft + step) + 'px';
        // console.log('left: ' + (obj.offsetLeft + step) + 'px');
    }, 15);
}