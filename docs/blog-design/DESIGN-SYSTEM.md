# 개인 블로그 디자인 시스템 설계안

기준일: 2026-10-15 · 상태: 문서 제안, 구현 전  
기준 디자인: 현재 프로젝트의 `public/token-meter/` 구현  
화면 설계: [BLOG-SCREENS.md](BLOG-SCREENS.md)

## 1. 적용 범위와 판단 기준

현재 Token Meter 페이지의 색상, 글꼴, 큰 제목, 얇은 구분선, 넓은 여백,
파란색 강조, 작은 모서리, 테마 전환을 개인 블로그에 확장한다.
현재 실행 중인 웹사이트와 앱 코드는 이 설계로 변경하지 않는다.

문서의 표기는 다음과 같다.

| 표기 | 의미 |
| --- | --- |
| **유지** | 현재 구현에서 확인한 값이나 동작을 그대로 사용 |
| **확장** | 블로그에 필요한 역할을 기존 값과 표현으로 구성. 현재 구현된 기능이라는 뜻은 아님 |
| **기존 기능** | 기존 블로그의 데이터·탐색 기능. 시각 기준과 구분 |

우선순위는 이번 사용자 요청 → 현재 Token Meter 구현 → 호환되는 기존 블로그
기능과 선호 기록이다. 루트 `DESIGN.md`는 이전 배민 스타일이므로 이번 디자인의
색상·글꼴·모서리 기준으로 사용하지 않는다. 이 문서는 그 파일을 대체하거나
프로젝트 규칙에 자동 등록하지 않는다.

이전 선호 중 검색 placeholder `검색`, 44px 검색 컨트롤, 목록 제목의 hover
밑줄 생략, 읽기 시간 생략, 본문 이미지의 프레임 생략은 유지한다.
이전에 목차를 생략한 기록은 이번의 명시적인 TOC 설계 요청에 따라 이번 안에
적용하지 않는다. 선호 기록 자체는 수정하지 않는다.

## 2. 현재 디자인 분석

### 2.1 시각적 성격

밝은 회백색 종이 위에 짙은 녹회색 텍스트를 배치하고, 파란색으로 동작과
일부 강조를 표시한다. 작은 캡션과 큰 제목의 크기 차이가 명확하다.
섹션은 대부분 배경을 공유하며 1px 선과 여백으로 구분된다.
단단한 사각형 버튼, 6px 이미지 프레임, 원형 아이콘 컨트롤을 함께 사용한다.

원본의 카드 역할은 제품 이미지 프레임과 팝오버에 집중된다.
콘텐츠 전체를 둥근 상자에 넣는 방식은 현재 기준 디자인의 주된 표현이 아니다.
블로그 글 목록은 이 섹션 구분 방식을 작은 글 단위로 반복한다.

### 2.2 근거 파일

| 확인 항목 | 근거 |
| --- | --- |
| 색상 및 테마 | [styles.css](../../public/token-meter/styles.css:207) |
| 페이지 너비·헤더·글꼴 위계 | [styles.css](../../public/token-meter/styles.css:294) |
| Hero·버튼 | [styles.css](../../public/token-meter/styles.css:546) |
| 이미지·상세 섹션 | [styles.css](../../public/token-meter/styles.css:962) |
| 모바일 메뉴 | [styles.css](../../public/token-meter/styles.css:1231) |
| 한글 글꼴 선언 | [styles.css](../../public/token-meter/styles.css:1227) |
| 실제 로컬 폰트 | [fonts.css](../../public/token-meter/fonts.css:14) |
| 갤러리·테마 인터랙션 | [interactions.js](../../public/token-meter/interactions.js:39) |
| 기존 원본 비교 캡처·실측 | [REPORT.md](../token-meter/REPORT.md) |

현재 브라우저에서도 배경 `#fcfdfb`, DM Sans 중심의 글꼴, weight 550 제목과
모바일 메뉴를 확인했다. 특정 화면에서 측정된 제목 픽셀 크기는 viewport에 따라
달라지므로 고정된 디자인 토큰으로 오인하지 않는다.

## 3. 디자인 토큰

토큰 이름은 문서상의 재사용 이름이다. 실제 CSS 변수나 파일을 생성한 것은 아니다.
현재 변수의 값은 유지하고, 블로그 컴포넌트가 사용하는 의미만 분명하게 한다.

### 3.1 색상

| 의미 토큰 | 현재 변수 | Light | Dark | 용도 |
| --- | --- | --- | --- | --- |
| `color.canvas` | `--paper` | `#fcfdfb` | `#141a17` | 페이지 바탕 |
| `color.ink` | `--ink` | `#17201e` | `#edf1ed` | 제목·본문·입력값 |
| `color.muted` | `--muted` | `#606560` | `#abb5ad` | 요약·날짜·캡션 |
| `color.accent` | `--blue` | `#254ee8` | `#91a8ff` | 링크·활성 항목·포커스 |
| `color.line` | `--line` | `#dce0dc` | `#343e38` | 섹션·행 구분선 |
| `color.lineStrong` | `--strong-line` | `#cbd2c9` | `#455149` | 입력·컨트롤 테두리 |
| `color.surface` | `--surface` | `#ffffff` | `#1c2420` | 메뉴·팝오버 |
| `color.subtle` | `--subtle` | `#eef1ec` | `#1b231e` | 인라인 코드·가벼운 안내 |
| `color.media` | `--media` | `#edf0ed` | `#232d26` | 코드·미디어 보조 영역 |
| `color.hover` | `--hover` | `#edf1ff` | `#28334c` | 메뉴 및 선택 가능한 행 상태 |
| `color.actionFill` | `--solid-blue` | `#254ee8` | `#304fc7` | 주 버튼·공통 푸터 |
| `color.onAction` | 기존 white | `#ffffff` | `#ffffff` | 주 버튼·푸터 텍스트 |
| `color.actionHover` | 기존 CTA hover | `#183dbf` | `#183dbf` | 주 버튼 hover |

모두 **유지** 값이다. 다크 테마에서 링크의 밝은 파랑과 버튼의 진한 파랑을
구별한다. `color.accent`를 흰 글자의 버튼 배경으로 대신 사용하지 않는다.
현재 CTA hover의 단일 색은 그대로 기록하되 임의의 새 다크 hover 색은 만들지 않는다.

**확장 규칙:** 본문은 `ink`, 글 요약은 `muted`를 사용한다. 에러·빈 상태·복사
확인은 같은 팔레트와 명시적인 문장으로 표시한다. 코드 문법 강조를 위해 새로운
빨강·노랑·보라 팔레트를 도입하지 않는다. 썸네일·본문 이미지의 실제 색은
콘텐츠 색이며 UI 토큰에 추가하지 않는다.

### 3.2 폰트와 굵기

| 역할 | 값 | 기준 |
| --- | --- | --- |
| Latin | `DM Sans`, `DM Sans Fallback` | 유지, 현재 로컬 가변 폰트 |
| 한국어 | `Apple SD Gothic Neo`, `Malgun Gothic`, `Noto Sans KR`, sans-serif fallback | 유지, 현재 `html[lang=ko] body` 선언 |
| 코드 | `ui-monospace`, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace | 유지, 현재 reset 선언 |
| 제한된 편집 강조 | Georgia, serif | 유지, 푸터와 짧은 강조에서만 사용 |
| 본문 | 400 | 유지 |
| 푸터 큰 문구 | 500 | 유지 |
| 제목·내비게이션·버튼 | 550 | 유지 |
| 개인 워드마크 | 750 | 유지, 워드마크 역할에 한정 |

DM Sans는 한글을 포함하는 폰트로 간주하지 않는다. 현재 로컬 Noto Sans JP
파일은 관찰된 일부 일본어 subset이며 한국어 본문용 폰트 팩이 아니다.
한글은 현재 구현에 이미 선언된 시스템 fallback을 사용한다. OS별 한글 자형 차이는
남으며, 특정 한글 웹폰트를 새로 선택하는 작업은 이번 설계 범위에 포함하지 않는다.

영문 장식 제목은 기존 음수 자간을 유지한다. 한국어 긴 제목에는 기존
`.detail-summary h2`의 `-0.035em`을 재사용하는 **언어 확장**을 적용한다.
한국어 본문의 자간은 normal이다. 새로운 글꼴·필기체·폭 좁은 디스플레이 폰트는 추가하지 않는다.

### 3.3 타이포그래피 역할

| 토큰 | 데스크톱 | 모바일 | Weight / line-height | 출처·적용 |
| --- | --- | --- | --- | --- |
| `type.brand` | 34px | 30px, 360px 이하 24px | 750 / 1 | 워드마크 유지 |
| `type.display` | `clamp(42px,6.5vw,94px)` | 700px 이하 `clamp(35px,9vw,60px)` | 550 / 1.09 | 짧은 페이지 제목 유지 |
| `type.articleTitle` | `clamp(28px,4vw,48px)` | 같은 fluid 값 | 550 / 1.45 | 기존 story-intro 제목을 글 제목으로 확장 |
| `type.section` | `clamp(27px,3.1vw,42px)` | 같은 fluid 값 | 550 / 1.5 | 본문 h2·주요 섹션 제목 |
| `type.itemTitle` | 25px | 700px 이하 22px | 550 / 1.5 | 기존 detail-summary 제목을 행·h3에 확장 |
| `type.body` | 17px | 480px 이하 15px | 400 / 2 | 기존 intro/body 값을 읽기 본문에 확장 |
| `type.summary` | 14px | 14px | 400 / 1.95 | 목록 요약 유지 |
| `type.metadata` | 12px | 12px | 400 / 1.5 | 날짜·개수·간단한 보조 정보 |
| `type.control` | 14px | 14px | 550 / 1.5 | 내비·검색·필터 확장 |
| `type.primary` | 13px | 13px | 550 / 1.5 | 기존 주 버튼 유지 |
| `type.caption` | 12px | 12px | 400 / 1.6 | 기존 이미지 캡션 유지 |
| `type.code` | 14px | 14px | 400 / 1.7 | 기존 14px·1.7 값을 코드 역할에 확장 |
| `type.h4` | 16px | 16px | 550 / 2 | 기존 본문 크기·제목 굵기 조합 확장 |

영문 display 자간은 `-0.065em`, section은 `-0.04em`, itemTitle은 `-0.035em`.
본문·코드·메타데이터는 normal이다. 코드와 날짜·개수에는 숫자 정렬이 필요한
경우 현재 counter의 `tabular-nums`를 재사용한다.

display는 `글`, `카테고리`처럼 짧은 제목에 사용한다. 긴 게시글 제목을 94px로
표시하거나 말줄임하지 않는다. 제목은 내용 길이에 따라 여러 줄이 될 수 있다.
목록 요약만 기존 블로그의 3줄 제한을 재사용하고, 상세 본문과 제목에는 적용하지 않는다.

### 3.4 레이아웃·여백

| 토큰 | 값 | 사용 |
| --- | --- | --- |
| `layout.pageMax` | 1,280px | 공통 외곽 컨테이너 유지 |
| `layout.gutter` | 56px → 1,100px 이하 36px → 760px 이하 20px | 기존 wrap 그대로 |
| `layout.proseMax` | 800px | 기존 story-copy를 읽기 폭으로 확장 |
| `layout.introMax` | 900px | 기존 story-intro의 소개 폭 유지 |
| `layout.summaryMax` | 640px | 기존 요약 최대 폭 유지 |
| `layout.railWidth` | 280px | 기존 블로그 aside 폭을 TOC에 재사용하는 확장 |
| `layout.columnGap` | 60px | 원본 상세 그리드 간격 유지 |
| `layout.mediaColumns` | 0.9fr / 1.1fr | 사진이 실제로 있는 소개·특집에만 유지 |
| `layout.headerHeight` | 110px → 760px 이하 82px | 공통 헤더 유지 |
| `layout.anchorOffset` | 36px | 기존 scroll-padding 유지 |
| `space.section` | 80px → 800px 이하 50px | 원본 상세 섹션의 세로 리듬 |
| `space.intro` | 70px → 480px 이하 40px | 소개 전후 간격 |
| `space.row` | 24px | 기존 미디어 padding을 목록 행 padding으로 확장 |
| `space.content` | 16px | 문단·설명 사이 |
| `space.headingAfter` | 24px 또는 25px | intro / story heading 역할에 따라 유지 |
| `space.inline` | 8px / 12px / 16px / 20px / 24px | 아이콘·태그·도구 행 |
| `space.mediaPadding` | 24px → 480px 이하 16px | 원본 미디어·코드 영역 |

원본은 모든 간격이 한 가지 배수로 맞춰진 시스템이 아니다. 17px CTA 스택,
19px hero 제목 상단, 25px heading 하단 등은 해당 조합의 값으로 유지한다.
공통 컴포넌트에 쓰는 간격만 이름을 붙이고 전체 사이트를 임의의 8px 그리드로 재정렬하지 않는다.

### 3.5 선·모서리·깊이

| 토큰 | 값 | 사용 |
| --- | --- | --- |
| `border.divider` | 1px solid `line` | 섹션·글 행·표·본문 하단 |
| `border.control` | 1px solid `lineStrong` | 검색·선택 컨트롤 확장 |
| `radius.flat` | 0 | 글 행·내비·카테고리 텍스트 |
| `radius.action` | 4px | 주 버튼·검색 입력 외곽 확장 |
| `radius.media` | 6px | 미디어·코드 영역 확장 |
| `radius.focus` | 3px | 현재 링크 포커스 표현 |
| `radius.round` | 50% | 44px 원형 아이콘 버튼 |
| `shadow.popover` | `0 12px 28px rgba(20,22,20,.12)` | 현재 언어·모바일 메뉴 |

글 카드 hover에 부유 그림자, scale, 입체 테두리를 추가하지 않는다.
본문 이미지는 현재 사용자 선호에 따라 프레임 없이 표시하고 원본 비율을 유지한다.
표와 코드의 외곽은 원본 미디어 영역을 확장한 1px 선·6px 모서리를 사용한다.

## 4. 공통 UI 컴포넌트 계약

### 4.1 구성 목록

| 컴포넌트 | 원본에서 가져오는 표현 | 블로그에서의 역할 |
| --- | --- | --- |
| `BlogShell` | paper / wrap / 얇은 경계 | 모든 화면의 외곽 정렬 |
| `BlogHeader` | wordmark / desktop-nav / theme-switcher / nav-menu | 개인 이름·홈·글·카테고리·검색·테마 |
| `PageIntro` | detail-hero / title-row / summary | 페이지·게시글 제목과 설명 |
| `SectionHeader` | 큰 heading / 오른쪽 텍스트 링크 | 최신 글·카테고리·관련 탐색 |
| `PostRow` | story-section의 상단 선·타입·여백 | 최신 글·전체 글·검색 결과 공통 |
| `CategoryRow` | 얇은 선·텍스트·숫자 | 카테고리 이름·실제 글 수 |
| `TagLink` | detail-links / story-links | 카테고리 링크·글의 태그 |
| `SearchField` | 네이티브 input / 기존 컨트롤 크기·선 | label `검색`, placeholder `검색` |
| `SortControl` | 네이티브 select / 작은 텍스트 | 수정일 기준 최신순·오래된순 |
| `Pagination` | screen-arrow의 44px 원·disabled | 목록 이전·다음 및 현재 페이지 |
| `ArticleProse` | story-copy / story-intro / ink | Markdown 장문 읽기 |
| `CodeBlock` | media / 6px 모서리 / mono reset | 코드·언어 라벨·복사 |
| `ArticleTOC` | 메뉴·텍스트 링크·파란 현재 항목 | 본문 제목 앵커 탐색 |
| `AdjacentPosts` | detail-start의 선·탐색 링크 | 실제 이전·다음 글 |
| `FeedbackMessage` | 기존 보조 텍스트·링크 | 로딩·검색 없음·복사 오류 |
| `BlogFooter` | 원본 solid-blue 푸터 | 개인 GitHub·위로 이동·이름 |

`PostRow`는 배경을 채우지 않은 행이다. 날짜·태그·제목·요약·이동 링크를
배치한다. 제목 링크와 태그 링크는 형제 요소로 둔다. 전체 행을 하나의 링크로
감싼 뒤 안에 태그 링크를 넣는 중첩 링크 구조는 사용하지 않는다.

공통 헤더의 브랜드 텍스트와 푸터 내용은 현재 블로그의 실제 개인 이름과
GitHub URL로 교체하는 콘텐츠 확장이다. `takeru`, Tokyo, 제품 다운로드 문구,
Token Meter 제품 이미지를 개인의 신원·블로그 콘텐츠로 그대로 옮기지 않는다.

### 4.2 상태 규칙

| 상태 | 계약 |
| --- | --- |
| Default | canvas / ink / line, 원래 타입·간격 |
| Hover | 링크 ink → accent. 주 버튼은 기존 actionHover. 메뉴 항목만 hover 배경 |
| Focus | 링크 3px accent outline, offset 6px. icon·menu 2px, offset 4px. 조밀한 컨트롤은 기존 gallery의 inset outline 재사용 |
| Active / current | 텍스트 accent와 `aria-current`. 선택 필터는 얇은 accent 밑선으로 확장 |
| Pressed | 네이티브 pressed·입력 동작 유지. 별도의 scale·bounce·새 눌림 색 없음 |
| Disabled | 실제 disabled 속성, 원본 arrow의 opacity 0.3을 재사용. 비활성 이유가 필요한 경우 문장으로 설명 |
| Loading | 기존 영역의 텍스트 상태, `role=status`. 줄어든 opacity·shimmer·spinner를 새 장식으로 추가하지 않음 |
| Empty | 영역 heading와 구체적인 안내·텍스트 링크. 큰 빈 카드나 일러스트 없음 |
| Error | ink 본문으로 실패 사실과 재시도 방법. 새 의미 색 없음 |

원본 주 버튼에는 별도 disabled 규칙이 없고, disabled 확장은 원형 버튼에서
가져온 것이다. 입력·코드 복사·TOC 상태도 현재 원본에 존재하는 기능으로 주장하지 않는다.
터치에서 hover에 의존하는 정보는 두지 않는다. 새 컨트롤은 기존 icon/button의
최소 44px 조작 영역을 재사용한다. 12px 메타데이터는 단독 조작 컨트롤로 만들지 않는다.

## 5. 반응형 계약

원본이 사용하는 경계와 역할을 유지한다. 아래 항목은 누적 적용된다.

| 경계 | 유지되는 동작 | 블로그 확장 |
| --- | --- | --- |
| >1,100px | 최대 1,280px, 좌우 56px | 상세에서 본문 + 280px TOC, gap 60px |
| ≤1,100px | 좌우 36px | TOC를 본문 앞 접이식 블록으로 이동, 본문 최대 800px |
| ≤1,000px | detail-summary 보조 열 290px, gap 35px | 홈 소개의 보조 탐색 열에만 사용 |
| ≤800px | 미디어 상세가 한 열, 세로 간격 50px | 글 행의 보조 메타를 위로, 이전·다음은 한 열 |
| ≤760px | 좌우 20px, 헤더 82px, desktop-nav 숨김 | 햄버거 메뉴, 검색은 본문 상단 또는 메뉴 안으로 이동 |
| ≤700px | hero-summary 한 열, 큰 별표 숨김 | 제목 아래 설명·탐색을 한 열로, 한국어 긴 제목 보호 |
| ≤480px | 본문 15px, 미디어 padding 16px | 태그·필터 줄바꿈, 코드·표만 내부 가로 스크롤 |
| ≤360px | 헤더 gap 6px, 워드마크 24px | 브랜드·메뉴·테마를 축소된 헤더 안에 유지 |

상세에서 800px 본문은 최대치다. TOC가 있는 구간의 남는 폭에 따라 본문이
줄어들며 `min-width:0`을 유지한다. 페이지 전체에는 가로 스크롤이 생기지 않는다.
목록·카테고리·검색은 공통 단일 목록을 사용하고, 화면마다 다른 카드 그리드를 만들지 않는다.

헤더는 현재 원본처럼 일반 문서 흐름에 둔다. 고정 헤더를 새로 도입하지 않는다.
TOC의 desktop sticky만 확장하며 top 36px를 기존 앵커 여백에서 가져온다.

## 6. 애니메이션·인터랙션 계약

| 역할 | 값·동작 | 적용 |
| --- | --- | --- |
| 테마 전환 | 600ms, `cubic-bezier(0.2,0.7,0,1)`, 클릭 중심 `circle(0%) → circle(150%)` | 공통 헤더 유지 |
| 주 버튼 hover | background 180ms | 기존 CTA 유지 |
| 원형 버튼 | background-color / color 160ms ease | 페이지네이션 확장 |
| 메뉴 화살표·햄버거 | transform / background-color 180ms ease | 현재 모바일 메뉴 유지 |
| 글 제목 링크 | 기존 색상 변경 | scale·밑줄·신규 등장 효과 없음 |
| 앵커 이동 | 기존 native smooth scroll, offset 36px | TOC·위로 이동 확장 |
| 실제 이미지 갤러리 | 클릭 smooth, 방향키·Home·End·드래그 종료 instant | 여러 실제 이미지가 있는 글에만 선택 사용 |

원본 상세 페이지에 스크롤 등장 효과가 없으므로 글 행·본문·목차에도 fade-in,
parallax, 카운터 애니메이션을 추가하지 않는다. 검색 결과 갱신도 페이드로 숨기지 않는다.

모션 축소 설정에서는 CSS animation·transition을 제거하고 앵커·갤러리를 즉시
이동한다. View Transition 미지원 시 테마만 즉시 변경한다. 사용자가 지정하지
않은 테마는 시스템 설정을 따르고, 지정한 테마는 새로고침 뒤에도 유지한다.

모바일 메뉴는 원본의 `<details>` 열림·닫힘 및 햄버거→X 변환을 유지한다.
Escape·바깥 클릭 닫기는 원본에 없는 추가 기능이므로 현재 안의 메뉴 동작으로
지정하지 않는다. 전체 화면 drawer나 배경 dim을 추가하지 않는다.

## 7. 일관성 검수 기준

1. 모든 화면이 같은 semantic color 토큰과 같은 테마 전환을 사용한다.
2. 게시글 목록·카테고리 글 목록·검색 결과에 동일한 PostRow를 사용한다.
3. 큰 제목은 짧은 페이지명, 긴 게시글 제목은 읽기용 title 역할을 사용한다.
4. 카드 그림자·새 색·새 서체·큰 pill·그라데이션을 도입하지 않는다.
5. 선은 1px, 역할에 따른 모서리는 0 / 4 / 6px / 원형으로 유지한다.
6. 모바일에서 제목과 본문 시작선이 맞고 표·코드만 내부에서 가로 스크롤한다.
7. 로딩·빈 상태·오류에서도 같은 본문·링크·여백을 사용한다.
8. 제안된 확장은 실제 구현·동작 검증 전까지 구현 완료로 표시하지 않는다.

이 문서의 값은 스타일 결정을 위한 설계 사양이다. 다음 구현 단계에서는 긴 한글
제목, 한영 혼합 본문, 코드·표, 키보드 포커스, light/dark, 360·390·760·1,100·
1,440px 화면으로 실제 읽기 및 반응형 동작을 검증한다.
