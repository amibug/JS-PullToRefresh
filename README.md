# JS-PullToRefresh
移动端下拉刷新组件

## demo

![扫一扫](images/demo_qr.png)

[DEMO链接](http://s.codepen.io/hzxs1990225/debug/eNyYmK?)

## 用法(依赖jquery)

    (function() {
        $('#wrap').pullToRefresh({
            distance: 80                    //  定义下拉距离开始刷新
            msg: {
                pullText: '下拉刷新...',    // 如果用组件默认的template，可以自定义文案
                releaseText: '松开刷新   ',
                loadingText: '正在加载...'
            },
            clazz: '',                      // 如果用组件默认的template，可以追加class
            template: '<div </div>',        // 自定义下拉节点的html template
            callback: function(){}          // loading callback
        });
    }());
