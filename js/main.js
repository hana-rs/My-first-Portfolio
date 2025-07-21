// ハンバーガーメニューの制御
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded'); // デバッグ用
    
    const hamburger = document.getElementById('hamburger');
    const gnav = document.getElementById('gnav');
    
    console.log('hamburger:', hamburger); // デバッグ用
    console.log('gnav:', gnav); // デバッグ用
    
    if (hamburger && gnav) {
        // ハンバーガーメニューのクリックイベント
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Hamburger clicked'); // デバッグ用
            
            hamburger.classList.toggle('active');
            gnav.classList.toggle('active');
            
            console.log('Classes after toggle:', {
                hamburger: hamburger.className,
                gnav: gnav.className
            }); // デバッグ用
            
            // ボディのスクロールを制御
            if (gnav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // メニュー項目がクリックされたときにメニューを閉じる
        const menuLinks = gnav.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                gnav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // メニュー外をクリックしたときにメニューを閉じる
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !gnav.contains(e.target)) {
                hamburger.classList.remove('active');
                gnav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // 画面リサイズ時にメニューの状態をリセット
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                gnav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.error('Hamburger menu elements not found');
    }
});

// スムーススクロール機能
document.addEventListener('DOMContentLoaded', function() {
    // アンカーリンクがクリックされた時にスムーススクロールを実行
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // ヘッダーの高さを考慮したオフセット
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// トップに戻るボタンの機能
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopButton = document.getElementById('scroll-to-top');
    
    if (scrollToTopButton) {
        // スクロールイベントを監視してボタンの表示/非表示を制御
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });
        
        // ボタンクリック時にトップへスムーススクロール
        scrollToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
