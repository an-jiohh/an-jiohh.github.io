# 지호의 블로그

`Next.js App Router + Velite + static export` 기반의 GitHub Pages 블로그입니다.

## 로컬 실행

의존성 설치:

```bash
npm install
```

로컬 환경 변수 설정:

```bash
cp .env.example .env.local
```

개발 서버 실행:

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열면 됩니다.

## 정적 빌드

GitHub Pages 배포와 동일한 방식으로 빌드:

```bash
npm run build
```

정적 결과물 확인:

```bash
npm run serve
```

기본 출력 디렉터리는 `out/` 입니다.

## GTM 설정

로컬에서 GTM을 켜려면 `.env.local`에 아래 값을 넣습니다.

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

환경 변수가 없으면 빌드는 그대로 성공하고, GTM 스크립트만 삽입되지 않습니다.

## GitHub Pages 배포

배포는 GitHub Actions가 `main` 브랜치 push를 감지해 `out/`을 `gh-pages` 브랜치로 배포합니다.

GitHub 저장소에서 아래 값을 등록해야 운영 배포에도 GTM이 삽입됩니다.

`Settings > Secrets and variables > Actions > Variables`

- Name: `NEXT_PUBLIC_GTM_ID`
- Value: 실제 사용할 GTM 컨테이너 ID

이 값은 공개 가능한 식별자이므로 `Secret`이 아니라 `Variable`로 관리합니다.
