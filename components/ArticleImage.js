"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./ArticleImage.css";

function ImageViewer({ src, alt, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, []);

  return createPortal(
    <dialog ref={dialogRef} className="article-image-viewer" aria-label="이미지 원본 보기" onClose={onClose}>
      <div className="article-image-viewer-tools">
        <span>이미지 원본</span>
        <button type="button" autoFocus onClick={() => dialogRef.current.close()}>닫기</button>
      </div>
      <p className="article-image-viewer-help">가로·세로로 스크롤해 자세히 볼 수 있습니다.</p>
      <div className="article-image-viewer-canvas" tabIndex={0} role="region" aria-label="원본 이미지, 가로와 세로로 스크롤할 수 있습니다">
        {/* Keep the source dimensions so charts remain legible on small screens. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} decoding="async" />
      </div>
    </dialog>,
    document.body
  );
}

export default function ArticleImage({ alt, src, loading = "lazy", decoding = "async", ...props }) {
  const [open, setOpen] = useState(false);
  // Explicitly decorative images retain their original presentation without an extra focus stop.
  // eslint-disable-next-line @next/next/no-img-element
  const image = <img {...props} src={src} alt={alt} loading={loading} decoding={decoding} />;
  if (!alt || !src) return image;

  return (
    <>
      <a className="article-image-link" href={src} aria-label={`이미지 원본 보기: ${alt}`} onClick={(event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        setOpen(true);
      }}>
        {image}
      </a>
      {open && <ImageViewer src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
}
