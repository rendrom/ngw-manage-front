import { UserApi } from '@/services/UserApi';
import { http } from './http';

export const userApi = new UserApi(http);
