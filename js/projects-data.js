// プロジェクトデータを管理するファイル
// 新しいプロジェクトを追加する場合は、このファイルのprojectsData配列に新しいオブジェクトを追加してください

const projectsData = [
    {
        id: 1,
        title: "Maximum.vcの共同開発にデザイナーとして参加",
        date: "2025.1.1",
        tag: "デザイン",
        image: "../img/banner1.png", // プロジェクトリストページから見たパス
        homeImage: "img/banner1.png", // トップページから見たパス
        link: "projects/project1.html",
        description: "Maximum.vcの共同開発プロジェクトにデザイナーとして参加しました。"
    },
    // {
    //     id: 2,
    //     title: "プロジェクト2のタイトル",
    //     date: "2025.1.15",
    //     tag: "開発",
    //     image: "../img/banner1.png",
    //     homeImage: "img/banner1.png",
    //     link: "projects/project2.html",
    //     description: "プロジェクト2の詳細な説明です。"
    // },
    // {
    //     id: 3,
    //     title: "プロジェクト3のタイトル",
    //     date: "2025.2.1",
    //     tag: "UI/UX",
    //     image: "../img/banner1.png",
    //     homeImage: "img/banner1.png",
    //     link: "projects/project3.html",
    //     description: "プロジェクト3の詳細な説明です。"
    // }
    // 新しいプロジェクトを追加する場合は、以下の形式で配列に追加してください：
    /*
    {
        id: 4,
        title: "新しいプロジェクトのタイトル",
        date: "2025.3.1",
        tag: "カテゴリ",
        image: "../img/project_image.png",
        link: "projects/project4.html",
        description: "プロジェクトの説明"
    }
    */
];

// プロジェクトリストを動的に生成する関数
function generateProjectsList() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) {
        console.error('projects-grid要素が見つかりません');
        return;
    }

    // 既存のプロジェクトをクリア
    projectsGrid.innerHTML = '';

    // プロジェクトデータを日付順（新しい順）でソート
    const sortedProjects = projectsData.sort((a, b) => {
        const dateA = new Date(a.date.replace(/\./g, '-'));
        const dateB = new Date(b.date.replace(/\./g, '-'));
        return dateB - dateA;
    });

    // 各プロジェクトのHTMLを生成
    sortedProjects.forEach(project => {
        const projectElement = createProjectElement(project);
        projectsGrid.appendChild(projectElement);
    });
}

// 個別のプロジェクト要素を作成する関数
function createProjectElement(project) {
    const projectLink = document.createElement('a');
    projectLink.href = project.link;
    projectLink.className = 'projectlink';

    projectLink.innerHTML = `
        <div class="projectlist-container"> 
            <img src="${project.image}" class="project-image" alt="${project.title}">
            <div class="projectlist-box">
                <div class="projectlist-head">
                    <div class="project-time">${project.date}</div>
                    <div class="project-tag">${project.tag}</div>
                </div>
                <div class="project-title"><p>${project.title}</p></div>
            </div>
        </div>
    `;

    return projectLink;
}

// 新しいプロジェクトを追加する関数
function addNewProject(newProject) {
    // IDが指定されていない場合は自動生成
    if (!newProject.id) {
        const maxId = Math.max(...projectsData.map(p => p.id), 0);
        newProject.id = maxId + 1;
    }

    // プロジェクトデータに追加
    projectsData.push(newProject);
    
    // プロジェクトリストを再生成
    generateProjectsList();
    
    console.log('新しいプロジェクトが追加されました:', newProject);
}

// プロジェクトを削除する関数
function removeProject(projectId) {
    const index = projectsData.findIndex(p => p.id === projectId);
    if (index !== -1) {
        const removedProject = projectsData.splice(index, 1)[0];
        generateProjectsList();
        console.log('プロジェクトが削除されました:', removedProject);
        return removedProject;
    }
    return null;
}

// プロジェクトを更新する関数
function updateProject(projectId, updatedData) {
    const index = projectsData.findIndex(p => p.id === projectId);
    if (index !== -1) {
        projectsData[index] = { ...projectsData[index], ...updatedData };
        generateProjectsList();
        console.log('プロジェクトが更新されました:', projectsData[index]);
        return projectsData[index];
    }
    return null;
}

// タグでプロジェクトをフィルタリングする関数
function filterProjectsByTag(tag) {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    const filteredProjects = tag === 'all' ? projectsData : projectsData.filter(p => p.tag === tag);
    
    projectsGrid.innerHTML = '';
    filteredProjects.forEach(project => {
        const projectElement = createProjectElement(project);
        projectsGrid.appendChild(projectElement);
    });
}

// トップページのカルーセルを生成する関数
function generateHomepageCarousel() {
    console.log('generateHomepageCarousel called'); // デバッグ用
    console.log('projectCarousel exists:', typeof projectCarousel !== 'undefined' && projectCarousel); // デバッグ用
    console.log('projectsData:', projectsData); // デバッグ用
    
    // カルーセルインスタンスが存在しない場合は初期化を待つ
    if (!projectCarousel) {
        console.log('カルーセルが初期化されていません。少し待ってから再試行します。');
        setTimeout(() => {
            generateHomepageCarousel();
        }, 200);
        return;
    }

    try {
        // 既存のスライドをクリア
        projectCarousel.clear();

        // プロジェクトデータを日付順（新しい順）でソート
        const sortedProjects = projectsData.sort((a, b) => {
            const dateA = new Date(a.date.replace(/\./g, '-'));
            const dateB = new Date(b.date.replace(/\./g, '-'));
            return dateB - dateA;
        });

        console.log('ソートされたプロジェクトデータ:', sortedProjects); // デバッグ用

        // 最新の3件をカルーセルに追加
        const latestProjects = sortedProjects.slice(0, 3);
        console.log('表示する最新プロジェクト:', latestProjects); // デバッグ用
        
        if (latestProjects.length === 0) {
            console.warn('表示するプロジェクトがありません');
            return;
        }
        
        latestProjects.forEach((project, index) => {
            console.log(`プロジェクト${index + 1}をカルーセルに追加:`, project); // デバッグ用
            
            // 画像パスをより確実にチェック
            const imagePath = project.homeImage || project.image || 'img/banner1.png';
            console.log(`使用する画像パス: ${imagePath}`); // デバッグ用
            
            projectCarousel.addSlide({
                ...project,
                homeImage: imagePath
            });
        });
        
        console.log('カルーセルの生成完了'); // デバッグ用
    } catch (error) {
        console.error('カルーセル生成中にエラーが発生しました:', error);
    }
}

// プロジェクト追加時にカルーセルも更新する関数を修正
const originalAddNewProject = addNewProject;
function addNewProject(newProject) {
    // 元の関数を実行
    const result = originalAddNewProject(newProject);
    
    // カルーセルも更新
    generateHomepageCarousel();
    
    return result;
}

// プロジェクト削除時にカルーセルも更新する関数を修正
const originalRemoveProject = removeProject;
function removeProject(projectId) {
    const result = originalRemoveProject(projectId);
    
    // カルーセルも更新
    generateHomepageCarousel();
    
    return result;
}

// プロジェクト更新時にカルーセルも更新する関数を修正
const originalUpdateProject = updateProject;
function updateProject(projectId, updatedData) {
    const result = originalUpdateProject(projectId, updatedData);
    
    // カルーセルも更新
    generateHomepageCarousel();
    
    return result;
}

// DOM読み込み完了時にプロジェクトリストとカルーセルを生成
document.addEventListener('DOMContentLoaded', function() {
    console.log('projects-data.js: DOMContentLoaded イベント発火'); // デバッグ用
    generateProjectsList();
    
    // カルーセルが初期化されるまで待機してからカルーセルを生成
    function initCarouselWhenReady(retryCount = 0) {
        console.log(`projects-data.js: カルーセル初期化チェック中... (試行 ${retryCount + 1})`); // デバッグ用
        console.log('projectCarousel存在:', typeof projectCarousel !== 'undefined' && projectCarousel); // デバッグ用
        console.log('generateHomepageCarousel存在:', typeof generateHomepageCarousel !== 'undefined'); // デバッグ用
        
        if (typeof projectCarousel !== 'undefined' && projectCarousel) {
            console.log('projects-data.js: カルーセル生成開始'); // デバッグ用
            generateHomepageCarousel();
        } else if (retryCount < 50) { // 最大5秒間待機
            // カルーセルがまだ初期化されていない場合は100ms後に再試行
            console.log('projects-data.js: カルーセル未初期化、再試行中...'); // デバッグ用
            setTimeout(() => {
                initCarouselWhenReady(retryCount + 1);
            }, 100);
        } else {
            console.error('projects-data.js: カルーセルの初期化がタイムアウトしました');
        }
    }
    
    // より短い遅延で開始
    setTimeout(() => {
        console.log('projects-data.js: カルーセル初期化待機開始'); // デバッグ用
        initCarouselWhenReady();
    }, 100);
});

// window.loadでも試行（保険）
window.addEventListener('load', function() {
    console.log('projects-data.js: window load イベント発火'); // デバッグ用
    
    setTimeout(() => {
        if (typeof projectCarousel !== 'undefined' && projectCarousel) {
            console.log('projects-data.js: window load時にカルーセル生成'); // デバッグ用
            generateHomepageCarousel();
        } else {
            console.log('projects-data.js: window load時もカルーセル未初期化'); // デバッグ用
            
            // 最後の手段として、直接初期化を試行
            setTimeout(() => {
                if (typeof initializeProjectCarousel === 'function') {
                    console.log('projects-data.js: カルーセルを強制初期化'); // デバッグ用
                    initializeProjectCarousel();
                    
                    setTimeout(() => {
                        if (projectCarousel) {
                            generateHomepageCarousel();
                        }
                    }, 100);
                } else {
                    console.error('projects-data.js: initializeProjectCarousel関数が見つかりません');
                }
            }, 500);
        }
    }, 300);
});
