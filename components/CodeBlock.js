"use client";

import { Children, isValidElement, useEffect, useRef, useState } from "react";

export default function CodeBlock({ children, className = "", ...props }) {
  const preRef = useRef(null);
  const codeRef = useRef(null);
  const timerRef = useRef(null);
  const [hasCode, setHasCode] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const [copyState, setCopyState] = useState("idle");
  const codeChild = Children.toArray(children).find((child) => isValidElement(child) && child.type === "code");
  const language = /(?:^|\s)language-([^\s]+)/.exec(codeChild?.props.className || "")?.[1];

  useEffect(() => {
    const pre = preRef.current;
    codeRef.current = pre.querySelector("code");
    const measure = () => {
      setHasCode(Boolean(codeRef.current?.textContent.trim()));
      setOverflows(pre.scrollWidth > pre.clientWidth + 1);
    };
    const frame = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(pre);
    if (codeRef.current) observer.observe(codeRef.current);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      clearTimeout(timerRef.current);
    };
  }, [children]);

  async function copyCode() {
    clearTimeout(timerRef.current);
    try {
      await navigator.clipboard.writeText(codeRef.current.textContent);
      setCopyState("copied");
      timerRef.current = setTimeout(() => setCopyState("idle"), 2400);
    } catch {
      setCopyState("error");
    }
  }

  return (
    <div className="code-block">
      {(language || hasCode) && (
        <div className="code-block-header">
          {language && <span className="code-language">{language}</span>}
          {hasCode && (
            <button type="button" className="code-copy" onClick={copyCode} aria-label="코드 복사">
              {copyState === "copied" ? "복사됨" : "복사"}
            </button>
          )}
          <span className="sr-only" role="status">{copyState === "copied" ? "코드를 복사했습니다." : ""}</span>
        </div>
      )}
      {copyState === "error" && (
        <p className="code-copy-feedback" role="status">복사하지 못했습니다. 코드를 직접 선택해 주세요.</p>
      )}
      <pre {...props} ref={preRef} className={className} tabIndex={overflows ? 0 : undefined} aria-label={overflows ? "가로로 스크롤할 수 있는 코드" : undefined}>
        {children}
      </pre>
    </div>
  );
}
