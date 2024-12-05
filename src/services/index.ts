import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import http, { IRequestOption } from '@/services/http';

export interface IReqOption extends Partial<IRequestOption> {
  runWhenCall?: boolean;
}

export interface ISwrOption extends Partial<SWRConfiguration> {
  /**
   * @default true
   */
  isImmutable?: boolean;

  /**
   * @default false
   */
  shouldRetryOnError?: boolean;
}

export interface Return<T = unknown> extends SWRResponse {
  response?: T;
  requestKey?: (string | undefined | Record<string, unknown>)[] | string | null;
}

export default function useRequest<T>(reqOption: IReqOption, swrOption: ISwrOption): Return<T> {
  const allReqOption: IReqOption = { runWhenCall: true, ...reqOption };
  // default swrOption
  const allSwrOption = { isImmutable: true, shouldRetryOnError: false, ...swrOption };

  let requestKey = null;

  if (allReqOption.runWhenCall) requestKey = [allReqOption.url, allReqOption.method, allReqOption.data];

  if (allSwrOption.isImmutable) {
    // default isImmutable
    allSwrOption.revalidateIfStale = false;
    allSwrOption.revalidateOnFocus = false;
    allSwrOption.revalidateOnReconnect = false;
  }

  const fetcher = () => http.request({ ...allReqOption });

  const { data, error, mutate, isLoading, isValidating } = useSWR(requestKey, fetcher, { ...allSwrOption });

  return {
    data,
    error,
    mutate,
    isLoading,
    isValidating,
    response: data?.data?.result as T,
    requestKey,
  };
}
