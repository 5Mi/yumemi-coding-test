import useRequest, { IReqOption, ISwrOption } from '@/services';
import { Fecture, PopulationData } from '@/types';

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const createApiHook =
  <T>(defaultReq: IReqOption = {}, defaultSWR: ISwrOption = {}) =>
  (reqOption?: IReqOption, swrOption?: ISwrOption): { response?: T } =>
    useRequest({ ...defaultReq, ...reqOption }, { ...defaultSWR, ...swrOption });

export const usePrefecturesApi = createApiHook<Fecture[]>({
  url: '/api/v1/prefectures',
  method: Method.GET,
});

export const usePerYearApi = createApiHook<PopulationData>({
  url: '/api/v1/population/composition/perYear',
  method: Method.GET,
});
