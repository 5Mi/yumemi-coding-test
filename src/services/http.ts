import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios';

export interface IRequestData {
  [key: string]: unknown;
}

export interface IResponseData<T = unknown> {
  message: string;
  result: T;
  [key: string]: unknown;
}

export interface IRequestOption extends Partial<AxiosRequestConfig<IRequestData>> {
  /**
   * @default true
   */
  isShowFailMsg?: boolean;

  /**
   * @default true
   */
  isThrowError?: boolean;

  /**
   * Enable caching for GET requests
   * @default false
   */
  enableCache?: boolean;

  /**
   * Cache expiration time in milliseconds
   * @default 5 * 60 * 1000 (5 minutes)
   */
  cacheDuration?: number;
}

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'X-API-KEY': import.meta.env.VITE_API_XAPIKEY, 'Content-Type': 'application/json; charset=UTF-8' },
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<IRequestOption>) => config,
  (error: AxiosError) => {
    console.error(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response: AxiosResponse<IResponseData, IRequestOption>) => {
    const {
      data: { message },
      config,
    } = response;
    const { isShowFailMsg: isShowFailToast, isThrowError } = config as IRequestOption;

    if (message === null) {
      // backend success
      return response;
    }
    // backend error
    if (isShowFailToast) console.error(message);
    if (isThrowError) throw new Error(`backend error: ${message}`); // throw error (default)
    return response;
  },
  (error: AxiosError<IResponseData, IRequestOption>) => {
    // HTTP error
    const { response, config } = error;
    const { url, isShowFailMsg: isShowFailToast, isThrowError } = config as IRequestOption;

    let errMsg = '';
    let stateMsg: 'error' | 'warning' = 'error'; // 状态码

    if (response) {
      // The request was made and the server responded with a status code not 2XX
      const { status, data } = response as AxiosResponse<IResponseData>;
      errMsg = data.message || `url:${(url || '').toString()},statusCode:${status}`;

      if (status === 401) {
        stateMsg = 'warning';
        // go to login
        // window.location.href = '';
      }
    } else {
      // timeout
      errMsg = 'timeout';
    }

    if (isShowFailToast) console.error(`${stateMsg} - ${errMsg}`);

    return Promise.reject(isThrowError ? new Error(`http error -- ${errMsg}`) : error);
  },
);

class Http {
  private cache: Map<string, { data: AxiosResponse<IResponseData>; timestamp: number }> = new Map();

  defaultOptions: IRequestOption = {
    isShowFailMsg: true,
    isThrowError: true,
    timeout: 5000,
    enableCache: false,
    cacheDuration: 5 * 60 * 1000,
  };

  // Clear expired cache entries
  private clearExpiredCache() {
    const now = Date.now();
    Array.from(this.cache.entries()).forEach(([key, entry]) => {
      if (now - entry.timestamp > this.defaultOptions.cacheDuration!) {
        this.cache.delete(key);
      }
    });
  }

  // Manually clear the entire cache
  clearCache() {
    this.cache.clear();
  }

  // Remove a specific cache entry
  removeCacheEntry(url: string) {
    this.cache.delete(url);
  }

  async request(options: IRequestOption): Promise<AxiosResponse<IResponseData>> {
    // Clear expired cache entries before each request
    this.clearExpiredCache();

    const { url, data } = Http.transformParam(options, options.data, options.url || '');
    const requestOptions = { ...this.defaultOptions, ...options, url, data };

    // Handle caching for GET requests
    if (requestOptions.method === 'GET' && requestOptions.enableCache) {
      const cacheKey = url;
      const cachedResponse = this.cache.get(cacheKey);

      if (cachedResponse) return cachedResponse.data;

      try {
        const response = await instance.request(requestOptions);
        // Store the response in cache
        this.cache.set(cacheKey, {
          data: response,
          timestamp: Date.now(),
        });

        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    }

    // Normal request without caching
    return instance.request(requestOptions);
  }

  // handle params when GET or DELETE
  static transformParam(options: IRequestOption, params: IRequestData | undefined, url: string) {
    if (options.method === 'GET' || options.method === 'DELETE') {
      const paramsStr = new URLSearchParams(params as Record<string, string>).toString();
      const resParamsStr = paramsStr ? `?${paramsStr}` : '';
      return { url: `${url}${resParamsStr}`, data: {} };
    }
    return { url, data: params };
  }
}

const http = new Http();
export default http;
