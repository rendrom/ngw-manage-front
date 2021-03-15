import { ElMessageBox as MessageBox } from 'element-plus';
import CancelablePromise from '@nextgis/cancelable-promise';
import store from '@/store';
import { RESET_TOKEN } from '@/constants/store';
import { csrfSafeMethod, getCsrftoken } from './csrftoken';

import { message } from './element';
import { getToken } from './storage';

type HeadersInit = Record<string, string>; // Headers;

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'OPTIONS' | 'DELETE';
  body?: Record<string, any> | string;
  headers?: HeadersInit;
  file?: File;
  token?: string;
}

const handleError = (title: string, error: string | Error): void => {
  const msg = `<strong>${title}</strong> ${
    error instanceof Error ? error.message : error
  }`;
  message.error(msg, {
    duration: 5 * 1000,
    dangerouslyUseHTMLString: true,
  });
};

const serverError = 'Server error';

export function request<T = any>(
  url: string,
  opt: RequestOptions = {},
): CancelablePromise<T> {
  return new CancelablePromise<T>((resolve, reject, onCancel) => {
    const xhr = new XMLHttpRequest();
    const method = opt.method || 'GET';
    xhr.open(method, url, true);
    xhr.onload = () => {
      if ([200, 201, 204].indexOf(xhr.status) === -1) {
        if (xhr.status === 401) {
          MessageBox.confirm(
            'You have been logged out, you can cancel to stay on this page, or log in again',
            'Confirm logout',
            {
              confirmButtonText: 'Re-Login',
              cancelButtonText: 'Cancel',
              type: 'warning',
            },
          ).then(() => {
            store.dispatch(RESET_TOKEN.action).then(() => {
              location.reload();
            });
          });
        } else {
          try {
            const er = JSON.parse(xhr.response);
            const msg = er.detail || er.message;
            handleError(serverError, msg);

            reject(er);
          } catch {
            handleError(serverError, '');
            reject(xhr.response);
          }
        }
      } else {
        resolve(xhr.response ? JSON.parse(xhr.response) : '');
      }
    };
    xhr.onerror = (er) => {
      handleError(serverError, xhr.response);
      reject(er);
    };
    if (opt.headers) {
      for (const key in opt.headers) {
        xhr.setRequestHeader(key, opt.headers[key]);
      }
    }
    xhr.setRequestHeader('Content-type', 'application/json');
    const csrftoken = getCsrftoken();
    if (!csrfSafeMethod(method) && csrftoken) {
      xhr.setRequestHeader('X-CSRFToken', csrftoken);
    }
    const token = getToken();
    if (token) {
      xhr.setRequestHeader('Authorization', 'Token ' + token);
    }

    onCancel(() => {
      xhr.abort();
    });

    let data: FormData | string | null;

    data = opt.body
      ? typeof opt.body === 'string'
        ? opt.body
        : JSON.stringify(opt.body)
      : null;

    if (opt.file) {
      data = new FormData();
      data.append('file', opt.file);
    }
    xhr.send(data);
  });
}
