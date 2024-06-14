import { useState, useCallback } from 'react';

type AsyncFunction<T, U extends any> = (args: U) => Promise<T>;
type SuccessCallback<T> = (data: T) => void;
type ErrorCallback = (error: Error) => void;

interface Callbacks<T> {
  onSuccess?: SuccessCallback<T>;
  onError?: ErrorCallback;
}

interface UseAsyncResult<T> {
  loading: boolean;
  data: T | null;
  error: Error | null;
}

function useAsync<T, U extends any>(asyncFunction: AsyncFunction<T, U>, initialCallbacks?: Callbacks<T>): [(args: U, propCallbacks?: Callbacks<T>) => Promise<T>, UseAsyncResult<T>] {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (args: U, propCallbacks?: Callbacks<T>): Promise<T> => {
      setLoading(true);
      setError(null);
      try {
        const result = await asyncFunction(args);
        setData(result);
        initialCallbacks?.onSuccess?.(result);
        propCallbacks?.onSuccess?.(result);
        return result;
      } catch (err) {
        setError(err as Error);
        initialCallbacks?.onError?.(err as Error)
        propCallbacks?.onError?.(err as Error)
        return Promise.reject(err);
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction, initialCallbacks]
  );

  const asyncResult: UseAsyncResult<T> = { loading, data, error };

  return [execute, asyncResult];
}

export default useAsync;
