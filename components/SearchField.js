"use client";

import Icon from "./Icon";
export default function SearchField({ query, onSearch }) {
  return <form key={query} className="search-field" role="search" onSubmit={event => { event.preventDefault(); onSearch(String(new FormData(event.currentTarget).get("q") || "").trim()); }}>
    <label className="sr-only" htmlFor="collection-search">검색</label>
    <input id="collection-search" name="q" type="search" defaultValue={query} placeholder="검색" />
    <button type="submit" className="search-submit" aria-label="검색 실행"><Icon name="search" size={18} /></button>
  </form>;
}
