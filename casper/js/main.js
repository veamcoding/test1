$(function() {

    const $secvisual = $("section.visual");
    const $secBest = $("section.best");
    const $secGuide = $("section.guide");
    const $secEvent = $("section.event");

    const $noticeModal = $(".layerPop .noticeModal");
    const $guideModal = $(".layerPop .guideModal");

    const saveChecked = JSON.parse(localStorage.getItem("checked"));

    if (saveChecked) {  // 1주일간 보지 않기 클릭이 되어있는 경우
        $("body").removeClass("popupOn");
        $noticeModal.hide();
    } else {           // 1주일간 보지 않기 클릭이 되어있는 경우
        $("body").addClass("popupOn");
        $noticeModal.show();
    }

    const $video = $guideModal.find("video").get(0);
    const $noticeChk = $noticeModal.find("#chk");

    let isChecked = false;

// 메인 팝업 체크 이벤트 발생시 로컬스토리지에 true/false 전달 기능
    $noticeChk.on("change", function() {
        isChecked = $(this).prop("checked");
        localStorage.setItem("checked", isChecked);
    });

    $noticeModal.find(".close").on("click", function() {
        $("body").removeClass("popupOn");
        $noticeModal.hide();
    });

    $secGuide.find(".guideImg").on("click", function() {
        $("body").addClass("popupOn");
        $guideModal.show();

        $video.play();
        $video.muted = false;
    });

    $guideModal.find(".close").on("click", function() {
        $("body").removeClass("popupOn");
        $guideModal.hide();

        $video.pause();
        $video.currentTime = 0;
    });

    $guideModal.find(".sound").on("click", function() {
        if ($video.muted === false) {
            $video.muted = true;
            $(this).find("img").attr("src", "images/popup_icon_sound-on.png");
        } else {
            $video.muted = false;
            $(this).find("img").attr("src", "images/popup_icon_mute.png");
        }
    });

    $guideModal.find(".refresh").on("click", function() {
        $video.currentTime = 0;
        $video.play();
    });

    $guideModal.find(".play").on("click", function() {
        if ($video.paused) { // 정지된 상태
            $video.play();
            $(this).find("img").attr("src", "images/popup_icon_pause.png");
        } else {
            $video.pause();
            $(this).find("img").attr("src", "images/popup_icon_play.png");
        }
    });

    $guideModal.find(".fullscreen").on("click", function() {
        $video.requestFullscreen();
    });



    $noticeModal.find(".slider").slick({
        arrows: true,
        prevArrow: $noticeModal.find(".prevArrow"),
        nextArrow: $noticeModal.find(".nextArrow"),

        dots: true,
        appendDots: $noticeModal.find(".dots"),
        dotsClass: "customDots"
    });

    $secBest.find(".slider").slick({
        centerMode: true,
        centerPadding: "23%",
        arrows: true,
        prevArrow: $secBest.find(".prevArrow"),
        nextArrow: $secBest.find(".nextArrow"),

        dots: true,
        appendDots: $secBest.find(".dotsArea"),
        dotsClass: "customDots",

        responsive: [
            {
                breakpoint: 768,
            },
            {
                breakpoint: 480,
                settings: {
                    centerMode: false,
                    slidesToShow: 1,
                }
            }
        ]
    });


    $secEvent.find(".slider").slick({
        dots: true,
        appendDots: $secEvent.find(".dotsArea"),
        dotsClass: "customDots",

        arrows: true,
        prevArrow: $secEvent.find(".prevArrow"),
        nextArrow: $secEvent.find(".nextArrow"),
    });


    const floatingTop = $(".floatingTop");
    const floatingBtm = $(".floatingBtm");

    let $win = $(window);
    let $winWidth = $win.innerWidth();
    let scrollTop = 0;

    // 윈도우에서 스크롤을 이동하면 발생되는 이벤트
    $(window).on("scroll", function() {
        // $(this).scrollTop(); // 스크롤 좌표를 px 단위로 알려준다.
        scrollTop = $(this).scrollTop();
        scrollEvent();
    });

    $(window).on("resize", function() {
        $winWidth = $win.innerWidth();
        scrollEvent();
        hoverHeaderEvent();
    });

    scrollEvent();
    hoverHeaderEvent();

    function hoverHeaderEvent() {
        const $header = $(".header");

        if ($winWidth > 768) {
            $header.find("nav").css("display", "inline-block");
            $header.on("mouseenter", function () {
                $(this).addClass("active");
            });
            $header.on("mouseleave", function () {
                $(this).removeClass("active");
            });
        } else {
            $header.find("nav").css("display", "none");
            $header.off("mouseenter");
        }
    }

    function scrollEvent() {
        scrollHeaderEvent();
        if ( $winWidth > 768 ) {
            showFloatingMenu();
        } else {
            floatingTop.removeClass("on");
            floatingBtm.removeClass("on");
        }
    }

    function scrollHeaderEvent() {
        if (scrollTop > 200) {
            $(".header").addClass("on");
        } else {
            $(".header").removeClass("on");
        }
    }

    function showFloatingMenu() {
        if (scrollTop > 1000) {
            floatingTop.addClass("on");
            floatingBtm.addClass("on");
        } else {
            floatingTop.removeClass("on");
            floatingBtm.removeClass("on");
        }
    }

    // $(window).innerWidth();
    // $(window).innerHeight();

    // 윈도우 스크린 사이즈가 변경될때 실행되는 이벤트



    // 윈도우에서 마우스를 이동하면 발생되는 이벤트
    // $(window).on("mousemove", function() {});

});





