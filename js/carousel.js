// カスタムカルーセル（jQueryなし）
class CustomCarousel {
    constructor(container) {
        this.container = container;
        this.wrapper = container.querySelector('.carousel-wrapper');
        this.dotsContainer = container.querySelector('.carousel-dots');
        this.prevBtn = container.querySelector('.carousel-nav.prev');
        this.nextBtn = container.querySelector('.carousel-nav.next');
        
        this.slides = [];
        this.currentSlide = 0;
        this.autoplayInterval = null;
        this.autoplayDelay = 5000;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.startAutoplay();
        
        // テスト用のダミーコンテンツを追加
        console.log('カルーセル初期化完了、テスト用コンテンツを追加');
        this.addTestSlide();
    }
    
    addSlide(slideData) {
        const slideElement = this.createSlideElement(slideData);
        this.wrapper.appendChild(slideElement);
        this.slides.push(slideElement);
        
        // 最初のスライドをアクティブにする
        if (this.slides.length === 1) {
            slideElement.classList.add('active');
        }
        
        this.updateDots();
    }
    
    createSlideElement(slideData) {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        
        // 画像パスのフォールバック処理
        const imagePath = slideData.homeImage || slideData.image || 'img/banner1.png';
        
        // リンクパスの処理 - トップページからのパスに調整
        const linkPath = slideData.link.startsWith('pages/') ? slideData.link : `pages/${slideData.link}`;
        
        // スライドデータを要素に保存（後でクリック時に参照するため）
        slide.dataset.link = linkPath;
        
        slide.innerHTML = `
            <div class="carousel-slide-content" style="cursor: pointer;">
                <img src="${imagePath}" alt="${slideData.title}" loading="lazy" 
                     onerror="console.error('画像読み込みエラー:', this.src); this.style.display='none';">
                <div class="carousel-content">
                    <h2>${slideData.title}</h2>
                </div>
            </div>
        `;
        
        console.log('スライド要素作成:', slideData.title, 'パス:', imagePath, 'リンク:', linkPath); // デバッグ用
        
        return slide;
    }
    
    updateDots() {
        // ドットをクリア
        this.dotsContainer.innerHTML = '';
        
        // 新しいドットを作成
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `スライド ${index + 1} に移動`);
            
            if (index === this.currentSlide) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
            
            this.dotsContainer.appendChild(dot);
        });
    }
    
    goToSlide(index) {
        if (index < 0 || index >= this.slides.length) return;
        
        // 現在のスライドを非アクティブに
        this.slides[this.currentSlide].classList.remove('active');
        
        // 新しいスライドをアクティブに
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');
        
        // ドットを更新
        this.updateDots();
        
        // オートプレイをリセット
        this.resetAutoplay();
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        this.goToSlide(prevIndex);
    }
    
    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // カルーセルのクリックイベント - 現在のスライドのリンクに遷移
        this.wrapper.addEventListener('click', (e) => {
            // ナビゲーションボタンのクリックは除外
            if (e.target.closest('.carousel-nav')) {
                return;
            }
            
            const currentSlide = this.slides[this.currentSlide];
            if (currentSlide && currentSlide.dataset.link) {
                console.log('カルーセルクリック - 遷移先:', currentSlide.dataset.link);
                window.location.href = currentSlide.dataset.link;
            }
        });
        
        // キーボードナビゲーション
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        
        // タッチスワイプ対応
        this.addTouchSupport();
        
        // ホバー時にオートプレイを一時停止
        this.container.addEventListener('mouseenter', () => {
            this.pauseAutoplay();
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.startAutoplay();
        });
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;
        
        this.wrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        this.wrapper.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            this.handleSwipe();
        });
        
        const handleSwipe = () => {
            const diffX = startX - endX;
            const diffY = startY - endY;
            const minSwipeDistance = 50;
            
            // 横方向のスワイプが縦方向より大きい場合のみ処理
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            } else if (Math.abs(diffX) < 30 && Math.abs(diffY) < 30) {
                // タップの場合（移動距離が小さい場合）は現在のスライドのリンクに遷移
                const currentSlide = this.slides[this.currentSlide];
                if (currentSlide && currentSlide.dataset.link) {
                    console.log('カルーセルタップ - 遷移先:', currentSlide.dataset.link);
                    window.location.href = currentSlide.dataset.link;
                }
            }
        };
        
        this.handleSwipe = handleSwipe;
    }
    
    startAutoplay() {
        if (this.slides.length <= 1) return;
        
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    }
    
    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    resetAutoplay() {
        this.pauseAutoplay();
        this.startAutoplay();
    }
    
    clear() {
        this.pauseAutoplay();
        this.wrapper.innerHTML = '';
        this.dotsContainer.innerHTML = '';
        this.slides = [];
        this.currentSlide = 0;
    }
    
    destroy() {
        this.pauseAutoplay();
        // イベントリスナーの削除等、必要に応じて追加
    }
    
    addTestSlide() {
        const testSlide = {
            title: "テストスライド",
            homeImage: "img/banner1.png",
            link: "projects/project1.html"
        };
        
        console.log('テストスライドを追加:', testSlide);
        this.addSlide(testSlide);
    }
}

// グローバルなカルーセルインスタンス
let projectCarousel = null;

// カルーセル初期化関数
function initializeProjectCarousel() {
    console.log('カルーセル初期化開始'); // デバッグ用
    
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (carouselContainer) {
        try {
            if (projectCarousel) {
                console.log('既存のカルーセルを破棄します');
                projectCarousel.destroy();
                projectCarousel = null;
            }
            
            projectCarousel = new CustomCarousel(carouselContainer);
            console.log('カスタムカルーセルが初期化されました');
            
            // 初期化完了後、すぐにプロジェクトデータの読み込みを試行
            if (typeof generateHomepageCarousel === 'function') {
                console.log('carousel.js: 初期化後すぐにカルーセル生成を試行'); // デバッグ用
                setTimeout(() => {
                    generateHomepageCarousel();
                }, 50);
            } else {
                console.log('generateHomepageCarousel関数が定義されていません');
            }
            
        } catch (error) {
            console.error('カルーセル初期化中にエラーが発生しました:', error);
        }
    } else {
        console.log('カルーセルコンテナが見つかりません');
    }
}

// DOMが読み込まれたら初期化
document.addEventListener('DOMContentLoaded', () => {
    console.log('carousel.js: DOMContentLoaded'); // デバッグ用
    setTimeout(() => {
        initializeProjectCarousel();
    }, 100);
});

// さらに確実にするため、window.loadでも試行
window.addEventListener('load', () => {
    console.log('carousel.js: window load'); // デバッグ用
    setTimeout(() => {
        if (!projectCarousel) {
            initializeProjectCarousel();
        }
    }, 200);
});

// デバッグ用の関数をウィンドウオブジェクトに追加
window.debugCarousel = function() {
    console.log('=== カルーセルデバッグ情報 ===');
    console.log('projectCarousel:', projectCarousel);
    console.log('カルーセルコンテナ:', document.querySelector('.carousel-container'));
    console.log('カルーセルラッパー:', document.querySelector('.carousel-wrapper'));
    console.log('カルーセルドット:', document.querySelector('.carousel-dots'));
    console.log('プロジェクトデータ:', projectsData);
    console.log('===============================');
    
    if (projectCarousel) {
        console.log('カルーセルスライド数:', projectCarousel.slides.length);
        console.log('現在のスライド:', projectCarousel.currentSlide);
    }
};

// ページ読み込み後にデバッグ情報を表示
window.addEventListener('load', () => {
    setTimeout(() => {
        console.log('デバッグ関数を実行中...');
        window.debugCarousel();
    }, 1000);
});
