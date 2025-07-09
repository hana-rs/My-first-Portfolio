# プロジェクト・記事リスト自動化システム

このシステムにより、新しいプロジェクトと記事を簡単に追加でき、**プロジェクトリストページ・記事リストページ・トップページの全てに自動で反映**されるようになりました。

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
    image: "../img/project_image.png", // トップページ用画像パス
    link: "projects/project4.html", // プロジェクト詳細ページパス（プロジェクトリストページから）
    description: "プロジェクトの説明"
}
```

### 方法2: ブラウザの開発者コンソールを使用

1. プロジェクトリストページ **または** トップページを開きます
2. ブラウザの開発者ツール（F12）を開きます
3. コンソールタブで以下のコマンドを実行：

```javascript
addProject(
    "新しいプロジェクト",
    "2025.3.15",
    "開発",
    "../img/new-project.png", // トップページから見た画像パス
    "projects/new-project.html", // プロジェクトリストページから見たリンクパス
    "新しいプロジェクトの説明"
);
```

## 📝 新しい記事の追加方法

### 方法1: articles-data.js ファイルを直接編集

1. `/js/articles-data.js` ファイルを開きます
2. `articlesData` 配列に新しい記事オブジェクトを追加します：

```javascript
{
    id: 3, // 自動生成されるため省略可能
    title: "新しい記事のタイトル",
    date: "2025.3.1", // YYYY.MM.DD形式
    link: "articles/article3.html", // 記事リストページから見たリンク
    homeLink: "pages/articles/article3.html", // トップページから見たリンク
    description: "記事の説明"
}
```

### 方法2: ブラウザの開発者コンソールを使用

1. 記事リストページ **または** トップページを開きます
2. ブラウザの開発者ツール（F12）を開きます
3. コンソールタブで以下のコマンドを実行：

```javascript
addArticle(
    "新しい記事のタイトル",
    "2025.3.15",
    "articles/new-article.html",
    "新しい記事の説明"
);
```

## 🎠 カルーセル機能

- **自動同期**: プロジェクトリストに追加されたプロジェクトは、自動的にトップページのカルーセルにも表示されます
- **最新順表示**: カルーセルには最新の3件のプロジェクトが日付順で表示されます
- **自動更新**: プロジェクトの追加・削除・更新時にカルーセルも自動で更新されます

## � Recent Articles機能

- **自動同期**: 記事リストに追加された記事は、自動的にトップページのRecent Articlesにも表示されます
- **最新順表示**: Recent Articlesには最新の3件の記事が日付順で表示されます
- **自動更新**: 記事の追加・削除・更新時にRecent Articlesも自動で更新されます

## �📋 利用可能な管理機能

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

### カルーセルの手動更新
```javascript
generateHomepageCarousel(); // トップページのカルーセルを再生成
```

### 記事統計の確認
```javascript
getArticleStats();
```

### 記事の検索
```javascript
searchArticles("Web");
```

### 最新記事の取得
```javascript
getLatestArticles(3); // 最新3件
```

### 記事の削除
```javascript
removeArticle(1); // ID:1の記事を削除
```

### 記事の更新
```javascript
updateArticle(1, {
    title: "更新されたタイトル"
});
```

### 記事リストの手動更新
```javascript
generateArticlesList(); // 記事リストページを再生成
generateHomepageArticles(); // トップページのRecent Articlesを再生成
```

## 🎨 カスタマイズ

### 新しいタグの追加
プロジェクトを追加する際に新しいタグを指定すると、自動的にシステムに追加されます。

### スタイルの変更
- プロジェクトカード: `/css/projects.css`を編集
- 記事リスト: `/css/articles.css`を編集
- カルーセル: `/css/style.css`の`.slider`関連スタイルを編集

### カルーセル表示件数の変更
`js/projects-data.js`の`generateHomepageCarousel()`関数内の以下の行を編集：
```javascript
const latestProjects = sortedProjects.slice(0, 3); // 3を任意の数に変更
```

### Recent Articles表示件数の変更
`js/articles-data.js`の`generateHomepageArticles()`関数内の以下の行を編集：
```javascript
const latestArticles = sortedArticles.slice(0, 3); // 3を任意の数に変更
```

## 💾 データの永続化

- プロジェクトデータはローカルストレージに自動保存されます
- 記事データもローカルストレージに自動保存されます
- `exportProjectsAsJSON()` でプロジェクトデータをJSONファイルとしてエクスポートできます
- `exportArticlesAsJSON()` で記事データをJSONファイルとしてエクスポートできます

## 🔧 トラブルシューティング

### プロジェクトが表示されない場合
1. ブラウザの開発者コンソールでエラーを確認
2. `generateProjectsList()` を実行してリストを再生成
3. 画像パスが正しいか確認

### カルーセルが動作しない場合
1. ブラウザの開発者コンソールでエラーを確認
2. `generateHomepageCarousel()` を実行してカルーセルを再生成
3. jQueryとSlickライブラリが正しく読み込まれているか確認
4. ページをリロードしてスクリプトの読み込み順序を確認

### 記事が表示されない場合
1. ブラウザの開発者コンソールでエラーを確認
2. `generateArticlesList()` を実行して記事リストを再生成
3. `generateHomepageArticles()` を実行してRecent Articlesを再生成
4. リンクパスが正しいか確認

### データが保存されない場合
1. `saveProjectsToLocalStorage()` を手動実行（プロジェクト用）
2. `saveArticlesToLocalStorage()` を手動実行（記事用）
3. ブラウザがローカルストレージをサポートしているか確認

## 📝 注意事項

- 画像ファイルは `/img/` フォルダに配置してください
- プロジェクト詳細ページは `/pages/projects/` フォルダに作成してください
- 記事詳細ページは `/pages/articles/` フォルダに作成してください
- 日付は必ず `YYYY.MM.DD` 形式で入力してください
- **プロジェクト画像パス**: 
  - `image`: プロジェクトリストページから見たパス（例: `../img/image.png`）
  - `homeImage`: トップページから見たパス（例: `img/image.png`）
- **プロジェクトリンクパス**: プロジェクトリストページから見たパスを指定（例: `projects/project.html`）
- **記事リンクパス**: 
  - `link`: 記事リストページから見たパス（例: `articles/article.html`）
  - `homeLink`: トップページから見たパス（例: `pages/articles/article.html`）
- カルーセルには最新の3件のプロジェクトが自動表示されます
- Recent Articlesには最新の3件の記事が自動表示されます
- jQueryとSlickライブラリが正しく読み込まれている必要があります

## 🔄 自動同期機能

このシステムの最大の特徴は **完全自動同期** です：

### プロジェクト管理
1. **プロジェクト追加** → プロジェクトリスト + トップページカルーセルに自動追加
2. **プロジェクト削除** → 両方の場所から自動削除
3. **プロジェクト更新** → 両方の場所で自動更新
4. **日付順ソート** → 常に最新のプロジェクトが上位表示

### 記事管理
1. **記事追加** → 記事リスト + トップページRecent Articlesに自動追加
2. **記事削除** → 両方の場所から自動削除
3. **記事更新** → 両方の場所で自動更新
4. **日付順ソート** → 常に最新の記事が上位表示

---

このシステムにより、新しいプロジェクトと記事の追加が大幅に簡単になり、自動的にプロジェクトリスト・記事リスト・トップページの全てに反映されます。
