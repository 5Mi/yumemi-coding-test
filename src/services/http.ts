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
}

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SOME_APIURL,
  headers: { 'X-API-KEY	': import.meta.env.VITE_SOME_XAPIKEY, 'Content-Type': 'application/json; charset=UTF-8' },
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
  defaultOptions: IRequestOption = {
    isShowFailMsg: true,
    isThrowError: true,
    timeout: 5000,
    // withCredentials: true,
  };

  request(options: IRequestOption): Promise<AxiosResponse<IResponseData>> {
    const { url, data } = Http.transformParam(options, options.data, options.url || '');
    const requestOptions = { ...this.defaultOptions, ...options, url, data };

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
