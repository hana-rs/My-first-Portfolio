$(document).ready(function () {
    $('.slider').slick({
        autoplay: true,        // 自動再生を有効化
        dots: true,            // ナビゲーション用のドットを表示
        arrows: false,         // 矢印を表示
        fade: false,            // フェードの有効化
        autoplaySpeed: 3000,   // 自動再生の速度 (ミリ秒)
    });
});