$(document).ready(function () {
    $('.slider').slick({
        autoplay: true,        // 自動再生を有効化
        dots: true,            // ナビゲーション用のドットを表示
        arrows: false,         // 矢印を表示
        fade: false,            // フェードの有効化
        autoplaySpeed: 3000,   // 自動再生の速度 (ミリ秒)
    });

    // ハンバーガーメニューの制御
    const hamburger = document.getElementById('hamburger');
    const gnav = document.getElementById('gnav');
    
    if (hamburger && gnav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            gnav.classList.toggle('active');
        });
        
        // メニュー項目がクリックされたときにメニューを閉じる
        const menuLinks = gnav.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                gnav.classList.remove('active');
            });
        });
    }
});