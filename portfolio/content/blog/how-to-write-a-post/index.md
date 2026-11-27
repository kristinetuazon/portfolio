---
title: How to write a post
summary: A sample post that shows everything a post can do. It's a draft, so it only appears when you run the site locally.
publishedAt: 2026-11-27
tags: [guide, meta]
cover: cover.jpg
coverAlt: Someone in a plaid kimono and beret taking a photo with a film camera on an old wooden street.
draft: true
---

This post is a **draft** (`draft: true` at the top), so it shows up in `npm run dev` but not on the live site. Copy this folder to start a new post, or delete it once you've published your first real one.

## Text

Write normal Markdown: **bold**, _italic_, [links](https://github.com/kristinetuazon), and `inline code`. Links to other sites open in a new tab.

- Bullet lists
- work like this

1. So do
2. numbered lists

> A regular quote looks like this.

## Callouts

> [!NOTE]
> Useful background the reader might want.

> [!TIP]
> A shortcut or a nicer way to do something.

> [!WARNING]
> Something that can go wrong.

`[!IMPORTANT]` and `[!CAUTION]` work too.

## Images

Put the image file in `public/blog/<post-folder>/` and refer to it by file name:

![The same photo, used inside a post](cover.jpg)

## Code

```ts
const greet = (name: string) => `Hello, ${name}!`;
console.log(greet("world"));
```

## Tables

| Field         | Required | Example      |
| ------------- | -------- | ------------ |
| `title`       | yes      | My new post  |
| `publishedAt` | yes      | 2026-11-27   |
| `tags`        | no       | [career]     |
