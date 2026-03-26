import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * A simple data-fetching hook.
 * @param {Function} fetchFn - async function that returns data
 * @param {Array} deps - dependency array (re-fetches when deps change)
 * @param {Object} options
 * @param {boolean} options.immediate - fetch on mount (default: true)
 * @param {number} options.refetchInterval - auto-refetch interval in ms (0 = off)
 */
export function useQuery(fetchFn, deps = [], { immediate = true, refetchInterval = 0 } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      if (mountedRef.current) setData(result);
      return result;
    } catch (err) {
      if (mountedRef.current) setError(err?.response?.data?.message || err?.message || 'Request failed');
    } finally {
      if (mountedRef.current) setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (immediate) execute();
  }, [execute, immediate]);

  // Auto-refetch
  useEffect(() => {
    if (!refetchInterval) return;
    const interval = setInterval(() => execute(), refetchInterval);
    return () => clearInterval(interval);
  }, [execute, refetchInterval]);

  return { data, loading, error, refetch: execute };
}

export default useQuery;
