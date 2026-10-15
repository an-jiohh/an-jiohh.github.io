---
schema: omd.preferences/v1
design_md_hash_at_creation: 0d002cb28a3fcb0703a888981e817849e64a63c33dcd02a88c67b30e785d4fcc
---

# Preference Log

## 2026-07-24T05:05:27.092Z — do-not-show-the-recent-records-eyebrow-a

```omd-meta
id: pref_mryh8d9y_28976f03
timestamp: 2026-07-24T05:05:27.092Z
scope: visualTheme
signal: user-correction
confidence: explicit
status: pending
source_agent: codex
source_context: "app/page.js"
```

Do not show the recent-records eyebrow above the home post list.

## 2026-07-24T05:11:32.442Z — archive-pages-omit-eyebrow-copy-and-read

```omd-meta
id: pref_mryhg76l_9b76ae20
timestamp: 2026-07-24T05:11:32.442Z
scope: visualTheme
signal: user-correction
confidence: explicit
status: pending
source_agent: codex
source_context: "app, components, data, lib"
```

Archive pages omit eyebrow copy and reading-time metadata, editorial images are unframed, post-card titles do not underline on hover, and category navigation uses the label category.

## 2026-07-24T06:33:09.462Z — search-controls-use-a-compact-52px-heigh

```omd-meta
id: pref_mrykd5qx_df0d6ba7
timestamp: 2026-07-24T06:33:09.462Z
scope: layout
signal: user-correction
confidence: explicit
status: pending
source_agent: codex
source_context: "app/blog/[...slug]/page.js, app/globals.css"
```

Search controls use a compact 52px height and article pages omit the table of contents.

## 2026-07-24T07:12:52.675Z — article-shells-align-to-the-post-hero-wi

```omd-meta
id: pref_mryls8nj_2d88b208
timestamp: 2026-07-24T07:12:52.675Z
scope: layout
signal: user-correction
confidence: explicit
status: pending
source_agent: codex
source_context: "app/globals.css"
```

Article shells align to the post hero width while article text stays at the readable text measure.

## 2026-07-24T07:21:17.134Z — mobile-article-reading-must-fit-the-view

```omd-meta
id: pref_mrym31w0_e1b46303
timestamp: 2026-07-24T07:21:17.134Z
scope: layout
signal: user-correction
confidence: explicit
status: pending
source_agent: codex
source_context: "app/globals.css"
```

Mobile article reading must fit the viewport with code blocks scrolling locally and aligned title and body content edges.

## 2026-07-24T07:36:19.138Z — article-cards-keep-borders-and-match-the-readin

```omd-meta
id: pref_mrymmdvm_328c485f
timestamp: 2026-07-24T07:36:19.138Z
scope: layout
signal: user-correction
confidence: explicit
status: pending
source_agent: codex
source_context: "app/globals.css"
```

Article cards retain their borders on mobile and desktop, while the hero and article shells share the readable text measure so desktop cards have no oversized empty sides.

## 2026-07-24T07:48:07.509Z — article-page-uses-one-outer-container-width

```omd-meta
id: pref_mryn1kgl_061122f6
timestamp: 2026-07-24T07:48:07.509Z
scope: layout
signal: user-correction
confidence: explicit
status: pending
source_agent: codex
source_context: "app/globals.css"
```

Article pages use one shared outer container width for the header, hero, and article card; only the prose column is constrained for long-form readability.

## 2026-07-24T08:03:57.757Z — post-detail-header-and-cards-share-the-readi

```omd-meta
id: pref_mrynlxod_9390d239
timestamp: 2026-07-24T08:03:57.757Z
scope: layout
signal: user-correction
confidence: explicit
status: pending
source_agent: codex
source_context: "components/SiteHeader.js, app/globals.css"
```

On post detail pages, the header and both article cards share the readable-card width so no empty side space remains inside the article card.

## 2026-07-24T08:06:43.189Z — keep-the-existing-post-card-width-and-fill-i

```omd-meta
id: pref_mrynphbp_ed1ad3f9
timestamp: 2026-07-24T08:06:43.189Z
scope: layout
signal: user-correction
confidence: explicit
status: pending
source_agent: codex
source_context: "components/SiteHeader.js, app/globals.css"
```

Keep the existing post-page card width and let prose fill the card's inner width instead of narrowing the post header or card.

## 2026-07-24T08:14:09.627Z — use-a-slightly-narrower-shared-site-container

```omd-meta
id: pref_mrynz1sr_323a2ba3
timestamp: 2026-07-24T08:14:09.627Z
scope: layout
signal: user-correction
confidence: explicit
status: pending
source_agent: codex
source_context: "app/globals.css"
```

Use a slightly narrower shared site container while preserving the card-to-prose proportion across the blog.

## 2026-07-24T08:21:08.269Z — keep-the-search-placeholder-to-a-single-word

```omd-meta
id: pref_mryo80to_c3213b35
timestamp: 2026-07-24T08:21:08.269Z
scope: voice
signal: user-correction
confidence: explicit
status: pending
source_agent: codex
source_context: "components/SiteHeader.js"
```

Keep the search input placeholder to the single word “검색”.

## 2026-07-24T08:24:28.003Z — match-the-search-control-height-to-navigation

```omd-meta
id: pref_mryocaxv_b0e30c17
timestamp: 2026-07-24T08:24:28.003Z
scope: components.navigation
signal: user-correction
confidence: explicit
status: pending
source_agent: codex
source_context: "app/globals.css"
```

Match the search control height to the 44px navigation controls.


## 2026-10-15T06:46:38.975718+00:00 — restore-mint-character-and-reading-layout

```omd-meta
id: pref_mint_706e274a
timestamp: 2026-10-15T06:46:38.975718+00:00
scope: visualTheme
signal: user-correction
confidence: explicit
status: pending
source_agent: codex
source_context: "app/design-tokens.css, components/HeroBio.js, app/globals.css"
```

Use the original mint green and existing character logo. Remove the large hero star, hero CTA, supporting bio and footer slogan. Name the post archive 게시글, align the native sort chevron inside its field, and give the article a fluid main column with a narrower 220px TOC and no unused trailing grid space.
