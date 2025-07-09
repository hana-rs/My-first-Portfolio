// 記事管理用のヘルパー関数
// このファイルは開発者が記事を簡単に管理するためのユーティリティを提供します

/**
 * 新しい記事を簡単に追加するためのヘルパー関数
 * @param {string} title - 記事のタイトル
 * @param {string} date - 日付（YYYY.MM.DD形式）
 * @param {string} linkPath - 記事詳細ページのパス（記事リストページから見た）
 * @param {string} description - 記事の説明（オプション）
 */
function addArticle(title, date, linkPath, description = '') {
    const newArticle = {
        title: title,
        date: date,
        link: linkPath,
        homeLink: `pages/${linkPath}`, // トップページから見たパス
        description: description
    };
    
    addNewArticle(newArticle);
    
    return newArticle;
}

/**
 * 記事数を取得
 * @returns {number} 記事の総数
 */
function getArticleCount() {
    return articlesData.length;
}

/**
 * 記事をタイトルで検索
 * @param {string} searchTerm - 検索キーワード
 * @returns {Array} マッチする記事配列
 */
function searchArticlesByTitle(searchTerm) {
    return searchArticles(searchTerm);
}

/**
 * ローカルストレージに記事データを保存
 */
function saveArticlesToLocalStorage() {
    try {
        localStorage.setItem('portfolioArticles', JSON.stringify(articlesData));
        console.log('記事データがローカルストレージに保存されました');
    } catch (error) {
        console.error('ローカルストレージへの保存に失敗しました:', error);
    }
}

/**
 * ローカルストレージから記事データを読み込み
 */
function loadArticlesFromLocalStorage() {
    try {
        const saved = localStorage.getItem('portfolioArticles');
        if (saved) {
            const savedArticles = JSON.parse(saved);
            // 既存のデータと統合
            savedArticles.forEach(article => {
                if (!articlesData.find(a => a.id === article.id)) {
                    articlesData.push(article);
                }
            });
            generateArticlesList();
            generateHomepageArticles();
            console.log('ローカルストレージから記事データを読み込みました');
        }
    } catch (error) {
        console.error('ローカルストレージからの読み込みに失敗しました:', error);
    }
}

/**
 * 記事データをJSONファイルとしてエクスポート
 */
function exportArticlesAsJSON() {
    const dataStr = JSON.stringify(articlesData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'articles-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('記事データをエクスポートしました');
}

// 使用例をコンソールに表示する関数
function showArticlesUsageExamples() {
    console.log(`
=== 記事管理システム 使用例 ===

1. 新しい記事を追加（記事リスト & トップページに自動反映）:
   addArticle(
       "新しい記事のタイトル",
       "2025.3.15",
       "articles/new-article.html",
       "新しい記事の説明"
   );

2. 記事統計を確認:
   getArticleStats();

3. 記事を検索:
   searchArticles("Web");

4. 最新の記事を取得:
   getLatestArticles(3); // 最新3件

5. 記事データをエクスポート:
   exportArticlesAsJSON();

6. 記事を削除:
   removeArticle(1); // ID:1の記事を削除

7. 記事を更新:
   updateArticle(1, {
       title: "更新されたタイトル"
   });

8. 記事リストを手動で再生成:
   generateArticlesList(); // 記事リストページ
   generateHomepageArticles(); // トップページ

注意: 記事の追加・削除・更新は自動的にトップページの Recent Articles にも反映されます。
Recent Articles には最新の3件の記事が表示されます。

詳細はブラウザの開発者コンソールで各関数を実行してください。
    `);
}

// ページロード時に使用例を表示
document.addEventListener('DOMContentLoaded', function() {
    // ローカルストレージからデータを読み込み
    loadArticlesFromLocalStorage();
    
    // 開発モードの場合は使用例を表示
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        showArticlesUsageExamples();
    }
});
