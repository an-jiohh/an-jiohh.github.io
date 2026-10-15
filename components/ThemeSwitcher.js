"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Icon from "./Icon";

const storageKey = "jiho-blog-theme";
let preference;

function storedPreference() {
  try {
    const value = localStorage.getItem(storageKey);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return preference ?? null;
  }
}

function currentTheme() {
  const theme = document.documentElement.dataset.theme;
  return theme === "light" || theme === "dark" ? theme :
    matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribe(onChange) {
  const root = document.documentElement;
  const system = matchMedia("(prefers-color-scheme: dark)");
  preference = storedPreference();
  const synchronize = () => {
    root.dataset.theme = preference ?? (system.matches ? "dark" : "light");
    onChange();
  };
  const systemChanged = () => {
    if (preference === null) synchronize();
  };
  const storageChanged = (event) => {
    if (event.key !== storageKey && event.key !== null) return;
    preference = storedPreference();
    synchronize();
  };
  const observer = new MutationObserver(onChange);
  observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  system.addEventListener("change", systemChanged);
  window.addEventListener("storage", storageChanged);
  synchronize();
  return () => {
    observer.disconnect();
    system.removeEventListener("change", systemChanged);
    window.removeEventListener("storage", storageChanged);
  };
}

const serverTheme = () => "light";

export default function ThemeSwitcher() {
  const theme = useSyncExternalStore(subscribe, currentTheme, serverTheme);
  const active = useRef(null);
  const revision = useRef(0);
  const target = useRef(null);
  const label = theme === "dark" ? "밝은 테마로 전환" : "어두운 테마로 전환";

  useEffect(() => {
    const cancel = () => {
      revision.current += 1;
      active.current?.animation?.cancel();
      active.current?.transition.skipTransition();
      active.current = null;
      target.current = null;
      delete document.documentElement.dataset.themeTransition;
    };
    const storageChanged = (event) => {
      if (event.key === storageKey || event.key === null) cancel();
    };
    const system = matchMedia("(prefers-color-scheme: dark)");
    const systemChanged = () => {
      if (preference === null) cancel();
    };
    window.addEventListener("storage", storageChanged);
    system.addEventListener("change", systemChanged);
    return () => {
      window.removeEventListener("storage", storageChanged);
      system.removeEventListener("change", systemChanged);
      cancel();
    };
  }, []);

  async function toggleTheme(event) {
    const next = (target.current ?? currentTheme()) === "dark" ? "light" : "dark";
    const version = ++revision.current;
    target.current = next;
    active.current?.animation?.cancel();
    active.current?.transition.skipTransition();
    const root = document.documentElement;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.detail ? event.clientX : rect.x + rect.width / 2;
    const y = event.detail ? event.clientY : rect.y + rect.height / 2;
    const origin = `${(x / innerWidth * 100).toFixed(2)}% ${(y / innerHeight * 100).toFixed(2)}%`;
    const apply = () => {
      if (version !== revision.current) return;
      preference = next;
      root.dataset.theme = next;
      try { localStorage.setItem(storageKey, next); } catch { /* Keep this session's choice. */ }
    };
    if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      active.current = null;
      target.current = null;
      delete root.dataset.themeTransition;
      return;
    }
    root.dataset.themeTransition = "";
    const transition = document.startViewTransition(apply);
    const running = { transition, animation: null };
    active.current = running;
    try {
      await transition.ready;
      if (version !== revision.current) return;
      running.animation = root.animate({
        clipPath: [`circle(0% at ${origin})`, `circle(150% at ${origin})`],
      }, {
        duration: 600,
        easing: "cubic-bezier(0.2, 0.7, 0, 1)",
        pseudoElement: "::view-transition-new(root)",
      });
      await running.animation.finished;
      await transition.finished;
    } catch {
      transition.skipTransition();
    } finally {
      if (active.current === running) {
        active.current = null;
        target.current = null;
        delete root.dataset.themeTransition;
      }
    }
  }

  return <button type="button" className="theme-switcher" aria-label={label}
    title={label} onClick={toggleTheme}><Icon name={theme === "dark" ? "moon" : "sun"} /></button>;
}
