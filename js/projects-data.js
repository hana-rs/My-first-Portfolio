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
    {
        id: 2,
        title: "プロジェクト2のタイトル",
        date: "2025.1.15",
        tag: "開発",
        image: "../img/banner1.png",
        homeImage: "img/banner1.png",
        link: "projects/project2.html",
        description: "プロジェクト2の詳細な説明です。"
    },
    {
        id: 3,
        title: "プロジェクト3のタイトル",
        date: "2025.2.1",
        tag: "UI/UX",
        image: "../img/banner1.png",
        homeImage: "img/banner1.png",
        link: "projects/project3.html",
        description: "プロジェクト3の詳細な説明です。"
    }
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
    const slider = document.querySelector('.slider');
    
    if (!slider) {
        console.log('カルーセル要素が見つかりません（トップページ以外の可能性があります）');
        return;
    }

    // 既存のSlickを破棄（存在する場合）
    if (typeof $ !== 'undefined' && $.fn.slick && $(slider).hasClass('slick-initialized')) {
        $(slider).slick('unslick');
    }

    // 既存のスライドをクリア
    slider.innerHTML = '';

    // プロジェクトデータを日付順（新しい順）でソート
    const sortedProjects = projectsData.sort((a, b) => {
        const dateA = new Date(a.date.replace(/\./g, '-'));
        const dateB = new Date(b.date.replace(/\./g, '-'));
        return dateB - dateA;
    });

    // 最新の3件をカルーセルに追加
    const latestProjects = sortedProjects.slice(0, 3);
    
    latestProjects.forEach(project => {
        const slideElement = createCarouselSlide(project);
        slider.appendChild(slideElement);
    });

    // Slickカルーセルを初期化（jQueryが利用可能な場合）
    if (typeof $ !== 'undefined' && $.fn.slick) {
        // 少し遅延を入れてSlickを初期化
        setTimeout(() => {
            $(slider).slick({
                autoplay: true,
                dots: true,
                arrows: false,
                fade: true,
                autoplaySpeed: 5000,
                adaptiveHeight: true
            });
        }, 100);
    } else {
        console.warn('jQuery または Slick が読み込まれていません');
    }
}

// カルーセル用のスライド要素を作成する関数
function createCarouselSlide(project) {
    const slideOuter = document.createElement('div');
    slideOuter.className = 'slick-outer';

    slideOuter.innerHTML = `
        <li><a href="pages/${project.link}"><img src="${project.homeImage || project.image}" alt="${project.title}"></a></li>
        <div class="slick-content">
            <h2>${project.title}</h2>
        </div>
    `;

    return slideOuter;
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
    generateProjectsList();
    
    // jQueryが読み込まれるまで待機してからカルーセルを初期化
    function initCarouselWhenReady() {
        if (typeof $ !== 'undefined' && $.fn.slick) {
            generateHomepageCarousel();
        } else {
            // jQueryがまだ読み込まれていない場合は100ms後に再試行
            setTimeout(initCarouselWhenReady, 100);
        }
    }
    
    initCarouselWhenReady();
});
