// 記事データを管理するファイル
// 新しい記事を追加する場合は、このファイルのarticlesData配列に新しいオブジェクトを追加してください

const articlesData = [
    {
        id: 1,
        title: "Webサイトを公開しました",
        date: "2024.12.6",
        link: "articles/article1.html",
        homeLink: "pages/articles/article1.html", // トップページから見たリンク
        description: "ポートフォリオサイトを公開しました。"
    },
    {
        id: 2,
        title: "基本情報技術者試験に合格しました",
        date: "2025.1.1",
        link: "articles/article2.html",
        homeLink: "pages/articles/article2.html",
        description: "基本情報技術者試験に合格した報告です。"
    }
    // 新しい記事を追加する場合は、以下の形式で配列に追加してください：
    /*
    {
        id: 3,
        title: "新しい記事のタイトル",
        date: "2025.3.1",
        link: "articles/article3.html",
        homeLink: "pages/articles/article3.html",
        description: "記事の説明"
    }
    */
];

// 記事リストを動的に生成する関数（記事リストページ用）
function generateArticlesList() {
    const articlesContainer = document.querySelector('.main-contents');
    
    if (!articlesContainer) {
        console.log('記事コンテナが見つかりません');
        return;
    }

    // 既存の記事リンクを削除（記事リストページ用のもののみ）
    const existingArticles = articlesContainer.querySelectorAll('.articlespage-list');
    existingArticles.forEach(article => article.remove());

    // 記事データを日付順（新しい順）でソート
    const sortedArticles = articlesData.sort((a, b) => {
        const dateA = new Date(a.date.replace(/\./g, '-'));
        const dateB = new Date(b.date.replace(/\./g, '-'));
        return dateB - dateA;
    });

    // ページタイトルの後に記事を挿入
    const pageTitle = articlesContainer.querySelector('.page-title');
    
    if (pageTitle) {
        sortedArticles.forEach(article => {
            const articleElement = createArticleElement(article, false); // false = 記事リストページ用
            pageTitle.insertAdjacentElement('afterend', articleElement);
        });
    } else {
        // ページタイトルが見つからない場合は、コンテナに直接追加
        console.log('.page-title要素が見つかりません。コンテナに直接追加します。');
        sortedArticles.forEach(article => {
            const articleElement = createArticleElement(article, false);
            articlesContainer.appendChild(articleElement);
        });
    }
}

// トップページの記事リストを生成する関数
function generateHomepageArticles() {
    console.log('generateHomepageArticles called'); // デバッグ用
    const articlesSection = document.querySelector('#articles');
    
    if (!articlesSection) {
        console.log('記事セクションが見つかりません（トップページ以外の可能性があります）');
        return;
    }

    console.log('記事セクションが見つかりました:', articlesSection); // デバッグ用

    // 既存の記事リンクとグリッドコンテナを削除
    const existingArticles = articlesSection.querySelectorAll('.articles-list');
    const existingGrid = articlesSection.querySelector('.articles-grid');
    console.log('削除する既存記事数:', existingArticles.length); // デバッグ用
    existingArticles.forEach(article => article.remove());
    if (existingGrid) existingGrid.remove();

    // 記事データを日付順（新しい順）でソート
    const sortedArticles = articlesData.sort((a, b) => {
        const dateA = new Date(a.date.replace(/\./g, '-'));
        const dateB = new Date(b.date.replace(/\./g, '-'));
        return dateB - dateA;
    });

    console.log('ソートされた記事データ:', sortedArticles); // デバッグ用

    // 最新の3件を表示
    const latestArticles = sortedArticles.slice(0, 3);
    console.log('表示する最新記事:', latestArticles); // デバッグ用
    
    const moreButton = articlesSection.querySelector('.more');
    const sectionTitle = articlesSection.querySelector('.mainpage-titles');
    console.log('Moreボタン:', moreButton); // デバッグ用
    console.log('セクションタイトル:', sectionTitle); // デバッグ用
    
    // 記事を縦に並べて挿入
    if (moreButton) {
        latestArticles.forEach((article, index) => {
            console.log(`記事${index + 1}を挿入中:`, article); // デバッグ用
            const articleElement = createArticleElement(article, true); // true = トップページ用
            moreButton.insertAdjacentElement('beforebegin', articleElement);
        });
    } else {
        // Moreボタンが見つからない場合は、記事セクションの末尾に追加
        console.log('Moreボタンが見つかりません。記事セクションの末尾に追加します。');
        latestArticles.forEach((article, index) => {
            console.log(`記事${index + 1}を追加中:`, article); // デバッグ用
            const articleElement = createArticleElement(article, true);
            articlesSection.appendChild(articleElement);
        });
    }
    
    console.log('記事の挿入完了'); // デバッグ用
}

// 個別の記事要素を作成する関数
function createArticleElement(article, isHomepage = false) {
    console.log('createArticleElement called:', { article, isHomepage }); // デバッグ用
    
    const articleLink = document.createElement('a');
    
    if (isHomepage) {
        articleLink.className = 'articles-list';
        articleLink.href = article.homeLink;
        console.log('トップページ用記事要素作成:', article.homeLink); // デバッグ用
        
        // トップページ用：Articlesページと同じデザイン
        articleLink.innerHTML = `
            <span class="articles-time">${article.date}</span>
            <span class="articles-title">${article.title}</span>
        `;
    } else {
        articleLink.className = 'articlespage-list';
        articleLink.href = article.link;
        console.log('記事リストページ用要素作成:', article.link); // デバッグ用
        
        // 記事リストページ用：既存のデザインを維持
        articleLink.innerHTML = `
            <span class="articles-time">${article.date}</span>
            <span class="articles-title">${article.title}</span>
        `;
    }

    console.log('作成された記事要素:', articleLink); // デバッグ用
    return articleLink;
}

// 新しい記事を追加する関数
function addNewArticle(newArticle) {
    // IDが指定されていない場合は自動生成
    if (!newArticle.id) {
        const maxId = Math.max(...articlesData.map(a => a.id), 0);
        newArticle.id = maxId + 1;
    }

    // 記事データに追加
    articlesData.push(newArticle);
    
    // 記事リストを再生成
    generateArticlesList();
    generateHomepageArticles();
    
    console.log('新しい記事が追加されました:', newArticle);
}

// 記事を削除する関数
function removeArticle(articleId) {
    const index = articlesData.findIndex(a => a.id === articleId);
    if (index !== -1) {
        const removedArticle = articlesData.splice(index, 1)[0];
        generateArticlesList();
        generateHomepageArticles();
        console.log('記事が削除されました:', removedArticle);
        return removedArticle;
    }
    return null;
}

// 記事を更新する関数
function updateArticle(articleId, updatedData) {
    const index = articlesData.findIndex(a => a.id === articleId);
    if (index !== -1) {
        articlesData[index] = { ...articlesData[index], ...updatedData };
        generateArticlesList();
        generateHomepageArticles();
        console.log('記事が更新されました:', articlesData[index]);
        return articlesData[index];
    }
    return null;
}

// 記事を検索する関数
function searchArticles(searchTerm) {
    const term = searchTerm.toLowerCase();
    return articlesData.filter(article => 
        article.title.toLowerCase().includes(term) ||
        article.description.toLowerCase().includes(term)
    );
}

// 最新の記事を取得する関数
function getLatestArticles(count = 3) {
    const sortedArticles = articlesData.sort((a, b) => {
        const dateA = new Date(a.date.replace(/\./g, '-'));
        const dateB = new Date(b.date.replace(/\./g, '-'));
        return dateB - dateA;
    });
    
    return sortedArticles.slice(0, count);
}

// 記事統計情報を取得する関数
function getArticleStats() {
    return {
        totalArticles: articlesData.length,
        latestArticle: getLatestArticles(1)[0] || null
    };
}

// DOM読み込み完了時に記事リストを生成
document.addEventListener('DOMContentLoaded', function() {
    console.log('articles-data.js: DOMContentLoaded イベント発火'); // デバッグ用
    
    // 少し遅延させて他のスクリプトが読み込まれるのを待つ
    setTimeout(() => {
        console.log('articles-data.js: 記事リスト生成開始'); // デバッグ用
        
        // ページタイプを判定して適切な関数を実行
        const isArticlesListPage = document.querySelector('.page-title');
        const isHomePage = document.querySelector('#articles');
        
        if (isArticlesListPage && !isHomePage) {
            // 記事リストページの場合
            console.log('記事リストページを検出');
            generateArticlesList();
        } else if (isHomePage) {
            // トップページの場合
            console.log('トップページを検出');
            generateHomepageArticles();
        }
    }, 100);
});

// ページが完全に読み込まれた後にも実行（保険）
window.addEventListener('load', function() {
    console.log('articles-data.js: window load イベント発火'); // デバッグ用
    setTimeout(() => {
        const isHomePage = document.querySelector('#articles');
        if (isHomePage) {
            generateHomepageArticles();
        }
    }, 200);
});
