import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import http, { IRequestOption, IResponseData } from '@/services/http';

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

export interface Return extends SWRResponse {
  response?: IResponseData;

  requestKey?: (string | undefined | Record<string, any>)[] | string | null;
}

export default function useRequest(reqOption: IReqOption, swrOption: ISwrOption): Return {
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

  return { data, error, mutate, isLoading, isValidating, response: data?.data?.result, requestKey };
}
