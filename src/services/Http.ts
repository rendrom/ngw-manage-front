import { request } from '@/utils/request';

import type CancelablePromise from '@nextgis/cancelable-promise';
import type { RequestOptions } from '@/utils/request';
export class Http {
  request<T = any>(url: string, opt: RequestOptions): CancelablePromise<T> {
    const headers = { ...opt.headers };
    return request(url, { headers, ...opt });
  }

  get<T = any>(url: string, opt?: RequestOptions): CancelablePromise<T> {
    return this.request(url, { ...opt });
  }

  options<T = any>(url: string, opt?: RequestOptions): CancelablePromise<T> {
    return this.request(url, {
      ...opt,
      method: 'OPTIONS',
    });
  }

  post<T = any>(url: string, opt?: RequestOptions): CancelablePromise<T> {
    return this.request(url, {
      ...opt,
      method: 'POST',
    });
  }

  delete<T = any>(url: string, opt?: RequestOptions): CancelablePromise<T> {
    return this.request(url, {
      ...opt,
      method: 'DELETE',
    });
  }

  patch<T = any>(url: string, opt?: RequestOptions): CancelablePromise<T> {
    return this.request(url, {
      ...opt,
      method: 'PUT',
    });
  }
}
