// Shop Common Util
(function (win, $, doc) {
    'use strict';
    win.smg = win.smg || {};
    win.smg.newShop = win.smg.newShop || {};

    var hasOwnProperty = Object.prototype.hasOwnProperty; // Object.prototype 이 있는지 체크

    if (win.smg.newShop.common && !$.isEmptyObject(win.smg.newShop.common)) return; // isEmptyObject 객체가 empty 인지 확인
    // newShop.common 이고 newShop.common의 객체가 empty가 아니면 return 실행되지 않음.

    win.smg.newShop.common = (function () {
        return {
            customEvent : {
                PAGEIS : {
                    EVENT_MANAGER : $('<div data-evt-manager=\'page\'/>'),
                    PAGEOBJS : [],
                    REPOSITION : 'PAGE_REPOSITION'
                }
            },
            stickyDatas : [],
            breakpoints : {
                MOBILE : 768
            },
            util : { 
                isDetecting : (function () { // 브라우저 감지하는 메소드
                    // navigator: 브라우저의 정보를 가지는 객체
                    // navigator.connection: 사용자 기기의 현재 대역폭이나 과금이 되는 연결인지와 같은 시스템의 연결 정보를 알려줍니다. 이를 이용해서 사용자에게 높은 용량의 콘텐츠를 제공할지 낮은 용량의 콘텐츠를 제공할지 사용자의 연결 상태에 따라서 제공할 수 있습니다??? 신기하네

                    // navigator.platform: "MacIntel", "Win32", "FreeBSD i386", "WebTV OS"
                    var isMac = (navigator.appVersion.indexOf("Mac") !== -1), // isMac : appversion 에 Mac 이라는 문자열을 가지고 있으면 === mac 이면
                        isEmulator = navigator.connection && (navigator.platform.indexOf('Win') !== -1), // window 를 쓰는지 체크...?
                        isWinSafari = (function () { // 이건 윈도우 사파리 체크인듯
                            var appNetscape = (navigator.appName === "Netscape"), // ie 10 이하에서는 appName 이 'Microsoft Internet Explorer' 요고
                                appVersionMac = (navigator.appVersion.indexOf("Mac") !== -1), // mac 
                                userAgentSafari = (navigator.userAgent.indexOf("Safari") !== -1), // safari 인지 체크 mac 에서 safari 는 104 / chrome은 108
                                userAgentChrome = (navigator.userAgent.indexOf("Chrome") !== -1); // chrome 인지 확인
                            return (appNetscape && !appVersionMac && userAgentSafari && !userAgentChrome);
                            // netscape 이고 mac이 아니며 safari이고 크롬이 아닌 것을 리턴
                        })();
                    if ((isMac && !isEmulator) || isWinSafari) { // 만약 mac 이고 window가 아니거나, 윈도우 사파리라면 ...? ios 사파리 체크 구문
                        $('body').addClass('ios-safari'); // body에 ios-safari 추가. 맥 일때에 ios-safari 클래스 추가
                    }
                })(),
                isSupportTransform : (function () { 
                    // true 또는 false return
                    return ('WebkitTransform' in doc.body.style || 'MozTransform' in doc.body.style || 'msTransform' in doc.body.style || 'OTransform' in doc.body.style || 'transform' in doc.body.style);
                    // doc.body.style 찍어보면 CSSStyleDeclaration . dom 이 가지고 있는 style 이 모두 나옴
                    // WebkitTransform 을 document body style 에 가지고 있거나, 
                    // MozTransform 을 가지고 있거나,
                    // msTransform 을 가지고 있거나
                    // OTransform 을 가지고 있거나..
                    // transform 을 가지고 있다면~~~
                    // ie 8 이하 체크 구문 (ie 8 이하가 아니면 true / 이하이면 false return)
                })(),
                isSupportTransition : (function () { 
                    // true 또는 false return
                    // ie 9 이하 체크 구문
                    return ('WebkitTransition' in doc.body.style || 'MozTransition' in doc.body.style || 'msTransition' in doc.body.style || 'OTransition' in doc.body.style || 'transition' in doc.body.style);
                })(),
                isSupportTransforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
                    // true 또는 false return
                    // html5 / css3를 지원하는 지 체크
                    var div = document.createElement('div').style;
                    return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
                })(),
                isDevice : (function () { // device 체크
                    return ('ontouchstart' in win || (win.DocumentTouch && doc instanceof win.DocumentTouch));
                    // ontouchstart가 window 안에 있거나,
                    // documentTouch 객체가 있고, document 에 win.DocumentTouch 객체가 포함되어 있다면..?
                })(),
                isIOS : (function () { // ios 인지 체크
                    return (/iPad|iPhone|iPod/.test(navigator.userAgent));
                    // 정규식 (RegExp.prototype.test) 의 test() 메소드는 대상 문자열 속에 일치하는 문자열이 포함되어 있는지 검사하고 true / false 반환.
                    // 
                })(),
                isAemEditMode : function () {
                    return win.smg.aem.util.isAemEditMode();
                    // 이 친구는 global util js 에 있음
                    /* 
                    isAemEditMode : function() {
                        var flag = false;
                        if (win.parent && win.frameElement && $(win.parent.document).find('.foundation-authoring-ui-mode').size()) {
                            flag = true;
                        }
                        return flag;
                    },

                    window.parent : 현재 윈도우의 부모 윈도우 객체
                    win.frameElement : iframe 또는 object , null 반환 (윈도우가 다른 문서에 포함되어 있지 않거나 포함 된 문서의 출처가 다른 경우 (예 : 다른 도메인에서 찾은 경우)는 null입니다.)
                    win.parent.document에 .foundation-authoring-ui-mode 가 있으면 flag true 반환 (aem authoring mode 확인?)
                    size() === length. jqeury 3점대부터는 size() 메소드 없음.

                    */
                },
                def : function (org, src) {
                    for (var prop in src) { // 속성값 in 객체(src)
                        if (!hasOwnProperty.call(src, prop)) continue; // object 에 속성값과 객체가 없으면 다시 위로 올라가서 for 문 실행
                        // for 에서 continue를 만나면 그 아래행을 실행하지 않음. 위에서는 조건이 맞으면 continue가 되니까
                        // 객체에 속성값과 인수가 있을때까지 계속해서 실행.

                        // call() 메소드는 주어진 this 값 및 각각 전달된 인수와 함께 함수를 호출합니다.
                        if ('object' === $.type(org[prop])) { // $.type() : object의 type 을 알 수 있음.
                            // org[prop] 이 객체면
                            org[prop] = ('array' === $.type(org[prop])) ? src[prop].slice(0) : this.def(org[prop], src[prop]);
                            // org[prop]이 array 면 src[prop] 을 복사본을 새로운 배열 객체로 반환하고 아니면~ .. 요기 잘 모르겠당
                        } else {
                            org[prop] = src[prop];
                        }
                    }
                    return org;
                },
                wait : function(timeout){ // setTimeout 과 동일하게 사용. 조금 더 빠른속도? 감지? 가능
                    // promise, deferred 비동기
                    var deferred = $.Deferred(); // deferred() 를 사용해서 promise()를 사용할 수 있음.
                    // 성공했을 때에는 resolve / resolve는 done으로
                    setTimeout(deferred.resolve, timeout);
                    return deferred.promise(); // promise() 를 반환해줘야함.

                    // https://poiemaweb.com/jquery-deferred
                },
                winSize : (function () { // window size 체크
                    var isWinSafari = (function () {
                        var appNetscape = (navigator.appName === "Netscape"),
                            appVersionMac = (navigator.appVersion.indexOf("Mac") !== -1),
                            userAgentSafari = (navigator.userAgent.indexOf("Safari") !== -1),
                            userAgentChrome = (navigator.userAgent.indexOf("Chrome") !== -1);
                        return (appNetscape && !appVersionMac && userAgentSafari && !userAgentChrome);
                    })();
                    if (isWinSafari) { // 윈도우 사파리 일 때
                        return function () {
                            var win_wh = {
                                w : $(win).width(),
                                h : $(win).height()
                            };
                            return win_wh;
                        }
                    } else { // 윈도우 사파리가 아닌 모든 아이
                        return function () {
                            var win_wh = {
                                w : win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth,
                                // innerWidth: 주소창 제외한 순수한 브라우저 사이즈
                                // clientWidth: 보이는 만큼의 width
                                h : win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight
                            };
                            return win_wh;
                        }
                    }
                })(),
                requestAFrame : (function () {
                    // 브라우저에게 수행하기를 원하는 애니메이션을 알리고 다음 리페인트가 진행되기 전에 해당 애니메이션을 업데이트하는 함수를 호출하게 합니다.
                    // 이 메소드는 리페인트 이전에 실행할 콜백을 인자로 받습니다.
                    return win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame || win.msRequestAnimationFrame ||
                        function (callback) {
                            return win.setTimeout(callback, 1000 / 60);
                        };
                    // https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame
                })(),
                cancelAFrame : (function () {
                    // window.requestAnimationFrame() 을 호출하여 스케줄된 애니메이션 프레임 요청을 취소합니다.
                    // 위 친구와 함께 사용
                    return win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.webkitCancelRequestAnimationFrame || win.mozCancelAnimationFrame || win.oCancelAnimationFrame || win.msCancelAnimationFrame ||
                        function (id) {
                            win.clearTimeout(id);
                        };
                })(),
                isDevTool : function (e, _target) { // #devLayout 이 있으면 true , 없으면 false 반환
                    var _devLayout = _target.closest('#devLayout');
                    return (_devLayout.length) ? true : false;
                },
                getRestrictBytes : function (str, maxBytes) { // byte 수 쳌? string 이랑 맥스 바이트를 인자로 받는 듯
                    var strLeng = str.length,
                        rByte = 0,
                        rLen = 0,
                        strChar = '';
                    maxBytes = maxBytes || 100;
                    for (var i = 0; i < strLeng; i++) {
                        strChar = str.charAt(i);
                        if (escape(strChar).length > 4) {
                            rByte += 2;
                        } else {
                            rByte++;
                        }
                        if (rByte <= maxBytes) {
                            rLen = i+1;
                        }
                    }
                    return {
                        bytes : rByte,
                        rectLeng : rLen
                    }
                },
                imgLoader : function (selector, callback) { // selector와 callback 함수?
                    $(selector).each(function () {
                        var cb = (callback || function () {});
                        if (this.complete || $(this).height() > 0) {
                            // complete 속성은 브라우저에서 이미지로드가 완료되었는지 여부를 반환. 이미지 로드가 완료되면 true / 아니면 false
                            // 이미지 로딩이 완료 됐다면
                            cb.apply(this); // 함수 호출 (함수 인자를 배열로 전달)
                        } else { // 이미지가 로드되지 않았다면 (이미지 로딩을 끄고싶은건가)
                            $(this).on('load', function () {
                                cb.apply(this);
                                $(this).off('load');
                            });
                        }
                    });
                },
                emitter : {
                    subscribers : {},
                    on : function (event, cb, context) {
                        this.subscribers = $.extend({}, this.subscribers);
                        this.subscribers[event] = this.subscribers[event] || [];
                        this.subscribers[event].push({
                            callback : cb,
                            context : context
                        });
                    },
                    off : function (event, cb, context) {
                        var idx, subs = this.subscribers[event], sub;
                        if (subs) {
                            idx = subs.length - 1;
                            while (idx >= 0) {
                                sub = subs[idx];
                                if ((sub.callback === cb) && (!context || sub.context === context)) {
                                    subs.splice(idx, 1);
                                    break;
                                }
                                idx--;
                            }
                        }
                    },
                    emit : function (event) {
                        var subs = this.subscribers[event], idx = 0, args = Array.prototype.slice.call(arguments, 1), sub;
                        if (subs) {
                            while (idx < subs.length) {
                                sub = subs[idx];
                                sub.callback.apply(sub.context || this, args);
                                idx++;
                            }
                        }
                    }
                }
            }
        }
    })();

    var CST_EVENT = win.smg.newShop.common.customEvent,
        STICKYDATAS = win.smg.newShop.common.stickyDatas,
        UTIL = win.smg.newShop.common.util;

    if (win.smg.newShop.page && !$.isEmptyObject(win.smg.newShop.page)) return;

    win.smg.newShop.page = (function () {
        var defParams = {
            scrollDuration : 300,
            scrollLock : true,
            scrollLockClass : 'hive-scroll-lock',
            scrollLockOpts : {
                scrollLocked : false,
                lockElements : 'html',
                appliedLock : {},
                prevStyles : {},
                prevScroll : {},
                lockStyles : {
                    'overflow-y' : 'scroll',
                    'position' : 'fixed',
                    'width' : '100%'
                }
            }
        };
        return {
            init : function () {
                this.bindEvents();
            },
            bindEvents : function () {
                CST_EVENT.PAGEIS.EVENT_MANAGER.on(CST_EVENT.PAGEIS.REPOSITION, $.proxy(this.pageReposition, this));
                $(doc).on('click', '.js-top-go', $.proxy(this.pageTopgo, this));
                $(win).on('load', $.proxy(this.loadFunc, this));
            },
            pageReposition : function () {
                for (var i = 0, max = CST_EVENT.PAGEIS.PAGEOBJS.length; i < max; i++) {
                    CST_EVENT.PAGEIS.PAGEOBJS[i].reInit();
                }
            },
            loadFunc : function () {
                this.pageReposition();
            },
            stickyArea : function (targetScroll) {
                var offsetTops = [],
                    keyMins = [],
                    keyMin, height;
                for (var key in STICKYDATAS) {
                    var sticky = STICKYDATAS[key],
                        stickyData = $(sticky.name);
                    if (stickyData.offset().top <= targetScroll) {
                        keyMins.push(stickyData.offset().top);
                        keyMin = Math.max.apply(null, keyMins);
                    }
                }
                if (!keyMins.length) {
                    height = 0;
                } else {
                    for (var key in STICKYDATAS) {
                        var sticky = STICKYDATAS[key],
                            stickyData = $(sticky.name);
                        if (stickyData.offset().top === keyMin) {
                            height = stickyData.outerHeight();
                        }
                    }
                }
                return height;
            },
            scrollMoveFunc : function (target, callback) {
                if (!target.length) return;
                var scrollTop = Math.ceil(target.offset().top),
                    winTop = $(win).scrollTop(),
                    stickyHeight = this.stickyArea(scrollTop),
                    totalMoveTop = scrollTop - stickyHeight + 1,
                    cb = (callback || function () {});
                if (totalMoveTop === winTop) {
                    cb.apply(this);
                } else {
                    $('html, body').stop().animate({
                        'scrollTop' : totalMoveTop
                    }, defParams.scrollDuration, function () {
                        cb.apply(this);
                    });
                }
            },
            pageTopgo : function (e) {
                e.preventDefault();
                if ($(win).scrollTop() <= 0) return;
                $('html, body').stop().animate({
                    scrollTop : 0
                });
            },
            scrollLock : {
                init : function (type) {
                    if (!defParams.scrollLock) return;
                    var lockClass = defParams.scrollLockClass,
                        lockOpts = defParams.scrollLockOpts,
                        lockElements = $(lockOpts.lockElements);
                    lockElements.toggleClass(lockClass, type);
                    if (type) {
                        if (UTIL.isDevice && UTIL.isIOS) {
                            if (lockOpts.scrollLocked || (lockElements.data('lockScroll') != null)) return;
                            lockOpts.appliedLock = {};
                            this.saveStyles();
                            this.saveScrolls();
                            $.extend(lockOpts.appliedLock, lockOpts.lockStyles, {
                                'left' : - lockOpts.prevScroll.scrollLeft,
                                'top' : - lockOpts.prevScroll.scrollTop
                            });
                            lockElements.css(lockOpts.appliedLock);
                            lockElements.data('lockScroll', {
                                'left' : lockOpts.prevScroll.scrollLeft,
                                'top' : lockOpts.prevScroll.scrollTop
                            });
                            lockOpts.scrollLocked = true;
                        }
                    } else {
                        if (UTIL.isDevice && UTIL.isIOS) {
                            if (!lockOpts.scrollLocked || (lockElements.data('lockScroll') == null)) return;
                            this.saveStyles();
                            for (var key in lockOpts.appliedLock) {
                                delete lockOpts.prevStyles[key];
                            }
                            lockElements.attr('style', $('<x>').css(lockOpts.prevStyles).attr('style') || '');
                            lockElements.data('lockScroll', null);
                            $(win).scrollLeft(lockOpts.prevScroll.scrollLeft).scrollTop(lockOpts.prevScroll.scrollTop);
                            lockOpts.scrollLocked = false;
                        }
                    }
                },
                saveStyles : function () {
                    var styleStrs = [],
                        styleHash = {},
                        lockOpts = defParams.scrollLockOpts,
                        lockElements = $(lockOpts.lockElements),
                        styleAttr =  lockElements.attr('style');
                    if (!styleAttr) return;
                    styleStrs = styleAttr.split(';');
                    $.each(styleStrs, function styleProp (styleString) {
                        var styleString = styleStrs[styleString];
                        if (!styleString) return;
                        var keyValue = styleString.split(':');
                        if (keyValue.length < 2) return;
                        styleHash[$.trim(keyValue[0])] = $.trim(keyValue[1]);
                    });
                    $.extend(lockOpts.prevStyles, styleHash);
                },
                saveScrolls : function () {
                    var lockOpts = defParams.scrollLockOpts;
                    lockOpts.prevScroll = {
                        scrollLeft : $(win).scrollLeft(),
                        scrollTop : $(win).scrollTop()
                    };
                }
            }
        }
    })();

    $(function () {
        win.smg.newShop.page.init();
    });
})(window, window.jQuery, window.document);
(function (win, $, doc) {
    'use strict';
    win.smg = win.smg || {};
    win.smg.newShop = win.smg.newShop || {};
    win.smg.newShop['productDetailSimple'] = win.smg.newShop['productDetailSimple'] || {};
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        HCOMPONENT = win.smg.newShop['productDetailSimple'];
    HCOMPONENT.common = win.smg.newShop.common;
})(window, window.jQuery, window.document);
