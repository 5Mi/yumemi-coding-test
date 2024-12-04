import useRequest, { IReqOption, ISwrOption } from '@/services';

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const createApiHook =
  (defaultReq: IReqOption = {}, defaultSWR: ISwrOption = {}) =>
  (reqOption?: IReqOption, swrOption?: ISwrOption) =>
    useRequest({ ...defaultReq, ...reqOption }, { ...defaultSWR, ...swrOption });

export const usePrefecturesApi = createApiHook({ url: '/api/v1/prefectures', method: Method.GET });

export const usePerYearApi = createApiHook({ url: '/api/v1/population/composition/perYear', method: Method.GET });
