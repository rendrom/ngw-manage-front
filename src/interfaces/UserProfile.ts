import { ApiKey } from './ApiKey';

export interface UserProfile {
  company_name: string;
  request_email: string;
  api_keys: ApiKey;
}
