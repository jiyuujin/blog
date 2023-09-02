---
layout: Article.tsx
publish_date: 2023-09-02
title: 'モダン CSS 2023'
description: '最近出てきた CSS を振り返ることで、余計なソースコードを書く必要が無くなったりします。'
slug: moderncss-2023
reaction: 🎨
category: Poem
tags:
  - GoogleIO
  - MicrosoftBuild
  - WWDC
---

これまでの記述をよりシンプルにしたり、余計なソースコードを書く必要が無くなったりします。

遅ればせながら、モダン CSS についてチェックしていきましょう。

- スクロールを実装する
  - スムーススクロール
  - スクロール位置を止める
  - スクロールの位置を調整する
  - スクロールの連動を防ぐ
- テキストを調整する
  - 一行テキストを両端に揃える
  - 行ごとの文字数を同じ数に揃える
  - 画像無しでテキストのグラデーション
- 画像を調整する
  - 画像縦横比を変更する
- コンポーネントの位置を調整する
  - 上下左右中央揃え
- コンポーネントの背景を調整する
  - すりガラス
- アクセシビリティ
  - 子要素の状態に合わせて親要素のスタイルを変更する
  - 擬似クラスを使ってフォーカスさせる
- その他
  - ビューポート単位
  - メディアクエリ記法
  - 入れ子

## スクロールを実装する

### スムーススクロール

JavaScript (smooth-scroll.min.js) を使わず CSS だけ書けば良くなりました。

```css
/* After */
scroll-behavior: smooth;
```

### スクロール位置を止める

x 方向へ止める場合は、下のように書けます。

```css
/* After */
/* x 方向、止める */
scroll-snap-type: x mandatory;
```

### スクロールの位置を調整する

固定ヘッダーの存在に合わせ、スクロール位置を変えられるようなりました。

```css
/* After */
scroll-margin-top: 60px;
```

### スクロールの連動を防ぐ

スムーススクロール同様に JavaScript を使わず調整できるようになりました。

```css
/* After */
overscroll-behavior-y: contain;
```

## テキストを調整する

### 一行テキストを両端に揃える

[CSS Text Module Level 4](https://www.w3.org/TR/css-text-4/) の
[`text-align-last`](https://www.w3.org/TR/css-text-4/#text-align-last-property)
より提示されている仕様のひとつ。

全角スペースを入力せず済むようになりました。

```css
/* After */
text-align-last: justify;
```

### 行ごとの文字数を同じ数に揃える

[CSS Text Module Level 4](https://www.w3.org/TR/css-text-4/) の
[`text-wrap`](https://www.w3.org/TR/css-text-4/#text-wrap)
より提示されている仕様のひとつ。

JavaScript を使わず調整できるようになりました。

```css
/* After */
text-wrap: balance;
```

### 画像無しでテキストのグラデーション

```css
/* After */
background-clip: text;
```

## 画像を調整する

### 画像縦横比を変更する

```css
/* Before */
padding-top: calc(100% * 9 / 16);

/* After */
aspect-ratio: 16 / 9;
```

## コンポーネントの位置を調整する

### 上下左右中央揃え

```css
/* Before */
parent {
  position: relative;
}
child {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

/* After */
displar: grid;
place^items: center;
```

## コンポーネントの背景を調整する

### すりガラス

Photoshop などですりガラス風の画像に編集する必要が無くなりました。

```css
/* After */
backdrop-filter: blur(8px);
```

## アクセシビリティ

### 子要素の状態に合わせて親要素のスタイルを変更する

[Selectors Level 4](https://www.w3.org/TR/selectors-4/) の
[`:has`](https://www.w3.org/TR/selectors-4/#relational) や
[`:valid` と `:invalid`](https://www.w3.org/TR/selectors-4/#validity-pseudos)
より提示されている仕様のひとつ。

JavaScript を使わず調整できるようになりました。

```css
/* After */
/* valid input form */
.form:has(.input:valid) {
  color: green;
}
/* invalid input form */
.form:has(.input:invalid) {
  color: red;
}
```

### 擬似クラスを使ってフォーカスさせる

[Selectors Level 4](https://www.w3.org/TR/selectors-4/) の
[`:focus-visible`](https://www.w3.org/TR/selectors-4/#the-focus-visible-pseudo)
より提示されている仕様のひとつ。

Web ブラウザにとって、フォーカスを表示させるべきかチェックします。

```css
/* After */
/* focus with tab key */
:focus-visible {
  outline: 4px solid red;
}
/* mouse click */
:focus:not(:focus-visible) {
  outline: none;
}
```

## その他

### ビューポート単位

https://web.dev/viewport-units/

### メディアクエリ記法

```css
/* Before */
/* 画面サイズ 767px 未満 */
@media (max-width: 767px) {
}
/* After */
/* 画面サイズ 767px 未満 */
@media (width < 767px) {
}

/* Before */
/* 画面サイズ 768px 以上 1023px 未満 */
@media (min-width: 768px) and (max-width: 1023px) {
}
/* After */
/* 画面サイズ 768px 以上 1023px 未満 */
@media (768px <= width < 1023px) {
}

/* Before */
/* 画面サイズ 1024px 以上 */
@media (min-width: 1024px) {
}
/* After */
/* 画面サイズ 1024px 以上 */
@media (width <= 1024px) {
}
```

### 入れ子

Sass
を使わず書けるようになったことで、特にメディアクエリを記載する場面が嬉しい。

```css
/* Before */
.parent {
}
.parent .child {
  color: red;
}

/* After */
.parent {
  .child {
    color: Red;
  }
}
```
