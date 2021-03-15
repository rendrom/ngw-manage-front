import { defined } from '@nextgis/utils';

import { Http } from './Http';
import type { DeepPartial } from '@nextgis/utils';
import type { UserLogin } from '@/interfaces/UserLogin';
import type { User } from '@/interfaces/User';
import { RequestOptions } from '../utils/request';

interface Credentials {
  username: string;
  password: string;
}

export class UserApi {
  constructor(private http: Http) {}

  async login(opt: Credentials): Promise<UserLogin> {
    const token = await this.getToken(opt);
    return token;
  }

  async metadata() {
    await this.http.options('/api/me');
  }

  async save(opt: DeepPartial<User>): Promise<User> {
    const { pk, ...body } = opt;
    let user: User;
    if (defined(pk)) {
      user = await this.http.patch(`/api/user/${pk}/`, { body });
    } else {
      user = await this.http.post('/api/user/', { body });
    }
    return user;
  }

  async logout() {
    //
  }

  async getToken(opt: Credentials): Promise<UserLogin> {
    const resp = await this.http.post('/api-token-auth/', { body: opt });
    if (resp.non_field_errors) {
      throw new Error(resp.non_field_errors.join('; '));
    }
    if (resp.detail) {
      throw new Error(resp.detail);
    }
    return resp;
  }

  async currentUser(opt?: RequestOptions): Promise<User> {
    try {
      const resp: User = await this.http.get('/api/me', opt);
      if (!resp.username) {
        throw new Error();
      }
      return resp;
    } catch (er) {
      throw new Error(er);
    }
  }
}
