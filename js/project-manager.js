// プロジェクト管理用のヘルパー関数
// このファイルは開発者がプロジェクトを簡単に管理するためのユーティリティを提供します

/**
 * 新しいプロジェクトを簡単に追加するためのヘルパー関数
 * @param {string} title - プロジェクトのタイトル
 * @param {string} date - 日付（YYYY.MM.DD形式）
 * @param {string} tag - プロジェクトのタグ/カテゴリ
 * @param {string} imagePath - 画像のパス
 * @param {string} linkPath - プロジェクト詳細ページのパス
 * @param {string} description - プロジェクトの説明（オプション）
 */
function addProject(title, date, tag, imagePath, linkPath, description = '') {
    const newProject = {
        title: title,
        date: date,
        tag: tag,
        image: imagePath,
        link: linkPath,
        description: description
    };
    
    addNewProject(newProject);
    return newProject;
}

/**
 * 利用可能なタグ一覧を取得
 * @returns {Array} タグの配列
 */
function getAvailableTags() {
    const tags = [...new Set(projectsData.map(project => project.tag))];
    return tags.sort();
}

/**
 * プロジェクト数を取得
 * @returns {number} プロジェクトの総数
 */
function getProjectCount() {
    return projectsData.length;
}

/**
 * 最新のプロジェクトを取得
 * @param {number} count - 取得する件数（デフォルト: 3）
 * @returns {Array} 最新のプロジェクト配列
 */
function getLatestProjects(count = 3) {
    const sortedProjects = projectsData.sort((a, b) => {
        const dateA = new Date(a.date.replace(/\./g, '-'));
        const dateB = new Date(b.date.replace(/\./g, '-'));
        return dateB - dateA;
    });
    
    return sortedProjects.slice(0, count);
}

/**
 * プロジェクトをタイトルで検索
 * @param {string} searchTerm - 検索キーワード
 * @returns {Array} マッチするプロジェクト配列
 */
function searchProjects(searchTerm) {
    const term = searchTerm.toLowerCase();
    return projectsData.filter(project => 
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.tag.toLowerCase().includes(term)
    );
}

/**
 * プロジェクト統計情報を取得
 * @returns {Object} 統計情報オブジェクト
 */
function getProjectStats() {
    const tagCounts = {};
    projectsData.forEach(project => {
        tagCounts[project.tag] = (tagCounts[project.tag] || 0) + 1;
    });
    
    return {
        totalProjects: projectsData.length,
        tagCounts: tagCounts,
        availableTags: getAvailableTags(),
        latestProject: getLatestProjects(1)[0] || null
    };
}

/**
 * ローカルストレージにプロジェクトデータを保存
 */
function saveProjectsToLocalStorage() {
    try {
        localStorage.setItem('portfolioProjects', JSON.stringify(projectsData));
        console.log('プロジェクトデータがローカルストレージに保存されました');
    } catch (error) {
        console.error('ローカルストレージへの保存に失敗しました:', error);
    }
}

/**
 * ローカルストレージからプロジェクトデータを読み込み
 */
function loadProjectsFromLocalStorage() {
    try {
        const saved = localStorage.getItem('portfolioProjects');
        if (saved) {
            const savedProjects = JSON.parse(saved);
            // 既存のデータと統合
            savedProjects.forEach(project => {
                if (!projectsData.find(p => p.id === project.id)) {
                    projectsData.push(project);
                }
            });
            generateProjectsList();
            console.log('ローカルストレージからプロジェクトデータを読み込みました');
        }
    } catch (error) {
        console.error('ローカルストレージからの読み込みに失敗しました:', error);
    }
}

/**
 * プロジェクトデータをJSONファイルとしてエクスポート
 */
function exportProjectsAsJSON() {
    const dataStr = JSON.stringify(projectsData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'projects-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('プロジェクトデータをエクスポートしました');
}

// 使用例をコンソールに表示する関数
function showUsageExamples() {
    console.log(`
=== プロジェクト管理システム 使用例 ===

1. 新しいプロジェクトを追加:
   addProject(
       "新しいプロジェクト",
       "2025.3.15",
       "開発",
       "../img/new-project.png",
       "projects/new-project.html",
       "新しいプロジェクトの説明"
   );

2. 利用可能なタグを確認:
   getAvailableTags();

3. プロジェクト統計を確認:
   getProjectStats();

4. プロジェクトを検索:
   searchProjects("Maximum");

5. 最新のプロジェクトを3件取得:
   getLatestProjects(3);

6. プロジェクトデータをエクスポート:
   exportProjectsAsJSON();

7. プロジェクトを削除:
   removeProject(1); // ID:1のプロジェクトを削除

詳細はブラウザの開発者コンソールで各関数を実行してください。
    `);
}

// ページロード時に使用例を表示
document.addEventListener('DOMContentLoaded', function() {
    // ローカルストレージからデータを読み込み
    loadProjectsFromLocalStorage();
    
    // 開発モードの場合は使用例を表示
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        showUsageExamples();
    }
});
