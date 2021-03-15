import { UserProfile } from './UserProfile';

export interface User {
  pk?: number;
  username: string;
  is_superuser: boolean;
  nextgis_guid: string;
  email: string;
  first_name?: string;
  last_name?: string;
  profile: UserProfile;
}
