"use client";
import Icon from "./Icon";
export default function Pagination({ currentPage, totalPages, onPage }) {
  if (totalPages <= 1) return null;
  const pages = [...new Set([1, currentPage - 1, currentPage, currentPage + 1, totalPages])].filter(page => page > 0 && page <= totalPages).sort((a,b) => a-b);
  return <nav className="pagination" aria-label="글 목록 페이지">
    <button type="button" className="round-control" aria-label="이전 페이지" disabled={currentPage === 1} onClick={() => onPage(currentPage - 1)}><Icon name="arrow-left" size={20} /></button>
    <div className="pagination-numbers">{pages.map((page,index) => <span key={page}>{index > 0 && page > pages[index-1]+1 ? <span className="pagination-ellipsis" aria-hidden="true">…</span> : null}<button type="button" aria-label={`${page}페이지`} aria-current={page === currentPage ? "page" : undefined} onClick={() => onPage(page)}>{page}</button></span>)}</div>
    <button type="button" className="round-control" aria-label="다음 페이지" disabled={currentPage === totalPages} onClick={() => onPage(currentPage + 1)}><Icon name="arrow-right" size={20} /></button>
    <span className="pagination-counter" aria-live="polite">{currentPage} / {totalPages}</span>
  </nav>;
}
