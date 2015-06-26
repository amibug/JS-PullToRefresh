/**
 * Created by amibug on 2015/6/25.
 */

(function ($) {
    $.pullToRefresh = function (element, options) {
        var isSupportTouch = !!('ontouchstart' in window);

        var defaults = {
            pluginName: 'pullToRefresh',
            version: '0.0.1',
            distance: 80,
            clazz: '',
            msg: {
                pullText: '下拉刷新...',
                releaseText: '松开刷新   ',
                loadingText: '正在加载...'
            },
            template: '<div class="m-pullToRefresh {clazz}" style="height: 0px;overflow: hidden;">' +
                '<div class="message">' +
                '<i></i>' +
                '<span>{text}</span>' +
                '</div>' +
                '</div>',
            callback: $.noop
        };

        var self = this,
            $document = $(document),
            $element = $(element),
            $pullElem,
            $icon,
            $text,
            isActivated = false,
            isLoading = false;

        self.settings = {};

        self.init = function () {
            if (!isSupportTouch) {
                throw "Browser is not support this plugin!";
                return false;
            }
            self.settings = $.extend({}, defaults, options);
            self.initNode();
        };

        self.initNode = function () {
            var settings = self.settings,
                html = settings.template.replace('{clazz}', settings.clazz)
                    .replace('{text}', settings.msg.pullText);
            $element.prepend(html);
            $icon = $element.find('.m-pullToRefresh i');
            $text = $element.find('.m-pullToRefresh span');
            $pullElem = $element.find('.m-pullToRefresh');
            $element.on('touchstart', onTouchStart.bind(this))
                .on('touchmove', onTouchMove.bind(this))
                .on('touchend', onTouchEnd.bind(this))
        };


        self.reset = function () {
            $pullElem.css({'height': 0});
            isLoading = false;
        };

        var onTouchStart = function (event) {
            self.startPageY = event.originalEvent.touches[0].pageY;
            self.startScrollTop = $element.scrollTop();
        };

        var onTouchMove = function (event) {
            var settings = self.settings,
                currentPageY = event.originalEvent.touches[0].pageY,
                diff = currentPageY - self.startPageY;
            if(!!isLoading) {
                event.preventDefault();
            }
            // 下拉
            if ($element.scrollTop() <= 0 && diff > 0 && !isLoading) {
                // 解决scroll的部分是body的情况出现的问题
                if($document.scrollTop() >0 ) return;
                event.preventDefault();
                setTransition($pullElem, 0);
                if (diff > settings.distance) {
                    diff = settings.distance + (diff - settings.distance) / (diff * 0.015);
                    isActivated = true;
                    $text.text(settings.msg.releaseText);
                } else {
                    $text.text(settings.msg.pullText);
                    isActivated = false;
                }
                $pullElem.css({'height': diff});
            }
        };

        var onTouchEnd = function (event) {
            var settings = self.settings;
            setTransition($pullElem, 350);
            if (!!isActivated && !isLoading) {
                $pullElem.css({'height': settings.distance * 0.6});
                $text.text(settings.msg.loadingText);
                isLoading = true;
                settings.callback();
            } else if(!isLoading) {
                $pullElem.css({'height': 0});
            }
            isActivated = false;
        };


        var setTransition = function (dom, num) {
            dom.css({
                '-webkit-transition': 'height ' + num + 'ms',
                'transition': 'height ' + num + 'ms'
            });
        };

        self.init();

    };

    $.fn.pullToRefresh = function (options) {
        return this.each(function () {
            if (undefined == $(this).data('pullToRefresh')) {
                var plugin = new $.pullToRefresh(this, options);
                $(this).data('pullToRefresh', plugin);
            }
        });
    };

})(window.jQuery || window.Zepto);