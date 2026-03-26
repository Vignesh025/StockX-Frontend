import { useState, useCallback } from 'react';

/**
 * Simple pagination state hook.
 * @param {number} initialPage
 * @param {number} initialLimit
 */
export function usePagination(initialPage = 1, initialLimit = 20) {
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);

  const nextPage = useCallback(() => setPage((p) => p + 1), []);
  const prevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const goToPage = useCallback((p) => setPage(p), []);
  const reset = useCallback(() => setPage(initialPage), [initialPage]);

  const offset = (page - 1) * limit;

  return { page, limit, offset, nextPage, prevPage, goToPage, reset };
}

export default usePagination;
