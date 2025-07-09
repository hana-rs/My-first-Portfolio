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
        
        slide.innerHTML = `
            <a href="pages/${slideData.link}">
                <img src="${slideData.homeImage || slideData.image}" alt="${slideData.title}" loading="lazy">
            </a>
            <div class="carousel-content">
                <h2>${slideData.title}</h2>
            </div>
        `;
        
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
        
        this.wrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.wrapper.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
        
        const handleSwipe = () => {
            const diffX = startX - endX;
            const minSwipeDistance = 50;
            
            if (Math.abs(diffX) > minSwipeDistance) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
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
}

// グローバルなカルーセルインスタンス
let projectCarousel = null;

// カルーセル初期化関数
function initializeProjectCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (carouselContainer) {
        projectCarousel = new CustomCarousel(carouselContainer);
        console.log('カスタムカルーセルが初期化されました');
    } else {
        console.log('カルーセルコンテナが見つかりません');
    }
}

// DOMが読み込まれたら初期化
document.addEventListener('DOMContentLoaded', () => {
    initializeProjectCarousel();
});
