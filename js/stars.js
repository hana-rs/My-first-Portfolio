// 星空エフェクト生成JavaScript

// 星を生成するJavaScript
function createStars() {
    const starsContainer = document.getElementById('stars-container');
    if (!starsContainer) return;
    
    const numStars = 150; // 星の数
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // ランダムなサイズの星を生成
        const size = Math.random();
        if (size < 0.6) {
            star.classList.add('small');
        } else if (size < 0.9) {
            star.classList.add('medium');
        } else {
            star.classList.add('large');
        }
        
        // 時々特別に明るい星を作成
        if (Math.random() < 0.1) {
            star.classList.add('bright');
        }
        
        // ランダムな位置に配置
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // ランダムなアニメーション遅延
        star.style.animationDelay = Math.random() * 3 + 's';
        
        starsContainer.appendChild(star);
    }
    
    // 星座のようなラインをいくつか追加
    createConstellationLines(starsContainer);
}

// 星座のようなラインを生成
function createConstellationLines(container) {
    const numLines = 8;
    for (let i = 0; i < numLines; i++) {
        const line = document.createElement('div');
        line.className = 'constellation-line';
        
        // ランダムな位置と角度
        const angle = Math.random() * 360;
        const length = 50 + Math.random() * 100;
        
        line.style.left = Math.random() * 80 + 10 + '%';
        line.style.top = Math.random() * 80 + 10 + '%';
        line.style.width = length + 'px';
        line.style.transform = `rotate(${angle}deg)`;
        line.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(line);
    }
}

// 流れ星を生成
function createShootingStar() {
    const starsContainer = document.getElementById('stars-container');
    if (!starsContainer) return;
    
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    
    // ランダムな開始位置（画面の上部や左側）
    const startX = Math.random() * 200 - 100; // -100 to 100
    const startY = Math.random() * 200 - 100; // -100 to 100
    
    shootingStar.style.left = startX + 'px';
    shootingStar.style.top = startY + 'px';
    
    starsContainer.appendChild(shootingStar);
    
    // アニメーション終了後に削除
    setTimeout(() => {
        if (shootingStar.parentNode) {
            shootingStar.parentNode.removeChild(shootingStar);
        }
    }, 3000);
}

// 星空エフェクトを初期化
function initStarryNight() {
    // 星のコンテナを作成
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    starsContainer.id = 'stars-container';
    
    // bodyの最初に追加
    document.body.insertBefore(starsContainer, document.body.firstChild);
    
    // 星を生成
    createStars();
    
    // 時々流れ星を生成
    setInterval(function() {
        if (Math.random() < 0.1) { // 10%の確率で流れ星
            createShootingStar();
        }
    }, 10000); // 10秒ごとにチェック
}

// ページ読み込み時に星空エフェクトを初期化
document.addEventListener('DOMContentLoaded', function() {
    initStarryNight();
});
