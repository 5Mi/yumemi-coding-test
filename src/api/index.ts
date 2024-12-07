import useRequest, { IReqOption, ISwrOption } from '@/services';
import { Fecture, PopulationData } from '@/types';
import { type Return } from '@/services/index';
import http from '@/services/http';

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const createApiHook =
  <T>(defaultReq: IReqOption = {}, defaultSWR: ISwrOption = {}) =>
  (reqOption?: IReqOption, swrOption?: ISwrOption): Return<T> =>
    useRequest({ ...defaultReq, ...reqOption }, { ...defaultSWR, ...swrOption });

export const usePrefecturesApi = createApiHook<Fecture[]>({
  url: '/api/v1/prefectures',
  method: Method.GET,
});

export const usePerYearApi = createApiHook<PopulationData>({
  url: '/api/v1/population/composition/perYear',
  method: Method.GET,
});

export const requestPerYear = async (prefCode: number) => {
  const res = await http.request({
    method: Method.GET,
    url: '/api/v1/population/composition/perYear',
    data: { prefCode },
    enableCache: true,
  });
  return (res.data.result as PopulationData).data;
};
