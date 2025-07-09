# プロジェクトリスト自動化システム

このシステムにより、新しいプロジェクトを簡単に追加できるようになりました。

## 🚀 新しいプロジェクトの追加方法

### 方法1: projects-data.js ファイルを直接編集

1. `/js/projects-data.js` ファイルを開きます
2. `projectsData` 配列に新しいプロジェクトオブジェクトを追加します：

```javascript
{
    id: 4, // 自動生成されるため省略可能
    title: "新しいプロジェクトのタイトル",
    date: "2025.3.1", // YYYY.MM.DD形式
    tag: "カテゴリ", // 例: "デザイン", "開発", "UI/UX"
    image: "../img/project_image.png",
    link: "projects/project4.html",
    description: "プロジェクトの説明"
}
```

### 方法2: ブラウザの開発者コンソールを使用

1. プロジェクトリストページを開きます
2. ブラウザの開発者ツール（F12）を開きます
3. コンソールタブで以下のコマンドを実行：

```javascript
addProject(
    "新しいプロジェクト",
    "2025.3.15",
    "開発",
    "../img/new-project.png",
    "projects/new-project.html",
    "新しいプロジェクトの説明"
);
```

## 📋 利用可能な管理機能

### プロジェクト統計の確認
```javascript
getProjectStats();
```

### プロジェクトの検索
```javascript
searchProjects("Maximum");
```

### 最新プロジェクトの取得
```javascript
getLatestProjects(3); // 最新3件
```

### プロジェクトの削除
```javascript
removeProject(1); // ID:1のプロジェクトを削除
```

### プロジェクトの更新
```javascript
updateProject(1, {
    title: "更新されたタイトル",
    tag: "新しいカテゴリ"
});
```

### タグでフィルタリング
```javascript
filterProjectsByTag("デザイン");
filterProjectsByTag("all"); // すべて表示
```

## 🎨 カスタマイズ

### 新しいタグの追加
プロジェクトを追加する際に新しいタグを指定すると、自動的にシステムに追加されます。

### スタイルの変更
CSSファイル（`/css/projects.css`）を編集してプロジェクトカードのデザインを変更できます。

## 💾 データの永続化

- プロジェクトデータはローカルストレージに自動保存されます
- `exportProjectsAsJSON()` でデータをJSONファイルとしてエクスポートできます

## 🔧 トラブルシューティング

### プロジェクトが表示されない場合
1. ブラウザの開発者コンソールでエラーを確認
2. `generateProjectsList()` を実行してリストを再生成
3. 画像パスが正しいか確認

### データが保存されない場合
1. `saveProjectsToLocalStorage()` を手動実行
2. ブラウザがローカルストレージをサポートしているか確認

## 📝 注意事項

- 画像ファイルは `/img/` フォルダに配置してください
- プロジェクト詳細ページは `/pages/projects/` フォルダに作成してください
- 日付は必ず `YYYY.MM.DD` 形式で入力してください

---

このシステムにより、新しいプロジェクトの追加が大幅に簡単になり、自動的にプロジェクトリストに反映されます。
