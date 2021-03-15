import Cookies from 'js-cookie';

export function getCsrftoken(): string | undefined {
  return Cookies.get('csrftoken');
}

export function csrfSafeMethod(method: string): boolean {
  // these HTTP methods do not require CSRF protection
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}
